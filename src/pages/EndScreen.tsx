import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { generatePromptIds } from '../utils/generatePromptIds';

const EndScreen = () => {
  const navigate = useNavigate();
  const { game, players, setGame, setPlayer, setPlayers, setPrompt } = useGame();

  const handleEndGame = () => {
    setGame(null as any);
    setPlayer(null as any);
    setPlayers([]);
    setPrompt(null as any);
    navigate('/');
  };

  const handlePlayAgain = () => {
    if (!game) return;

    const resetPlayers = players.map(p => ({
      ...p,
      score: 0,
      vote: 0,
      hasVoted: false,
    }));

    const newPromptIds = generatePromptIds(game.roundCount, game.promptIds);

    const newGame = {
      ...game,
      currentRound: 1,
      promptIds: newPromptIds,
      status: 'intro',
    };

    setGame(newGame);
    setPlayers(resetPlayers);
    setPrompt(null as any);

    navigate('/question');
  };

  return (
    <div className="page">
      <h1>Thanks for Playing</h1>
      <button onClick={handlePlayAgain}>Play Again</button>
      <br />
      <button onClick={handleEndGame}>End Game</button>
    </div>
  );
};

export default EndScreen;