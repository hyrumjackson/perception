import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';
import { generatePromptIds } from '../utils/generatePromptIds';
import { Player } from '../context/gameTypes';

const EndScreen = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { game, player, players, setGame, setPlayer, setPlayers, setPrompt } = useGame();

  useEffect(() => {
    const handleRestart = ({
      updatedPlayers,
      promptIds,
    }: {
      updatedPlayers: Player[];
      promptIds: string[];
    }) => {
      if (game) {
        setGame({
          ...game,
          currentRound: 1,
          promptIds,
          status: 'intro',
        });
        setPlayers(updatedPlayers);
        setPrompt(null as any);
        navigate('/question');
      }
    };

    const handleResetAll = () => {
      setGame(null as any);
      setPlayer(null as any);
      setPlayers([]);
      setPrompt(null as any);
      navigate('/');
    };

    socket.on('restart-game', handleRestart);
    socket.on('end-game', handleResetAll);

    return () => {
      socket.off('restart-game', handleRestart);
      socket.off('end-game', handleResetAll);
    };
  }, [game, navigate, setGame, setPlayer, setPlayers, setPrompt, socket]);

  const handlePlayAgain = () => {
    if (!player?.isHost || !game) return;

    const resetPlayers = players.map((p) => ({
      ...p,
      score: 0,
      vote: 0,
      hasVoted: false,
    }));

    const newPromptIds = generatePromptIds(game.roundCount, game.promptIds);

    socket.emit('restart-game', {
      gameCode: player.gameId,
      updatedPlayers: resetPlayers,
      promptIds: newPromptIds,
    });
  };

  const handleEndGame = () => {
    if (!player?.isHost) return;
    socket.emit('end-game', { gameCode: player.gameId });
  };

  return (
    <div className="page">
      <h1>Thanks for Playing</h1>
      {player?.isHost ? (
        <>
          <button onClick={handlePlayAgain}>Play Again</button>
          <br />
          <button onClick={handleEndGame}>End Game</button>
        </>
      ) : (
        <p>Waiting for host...</p>
      )}
    </div>
  );
};

export default EndScreen;