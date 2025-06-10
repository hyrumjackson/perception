import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';
import { promptPool } from '../data/prompts';
import { Player } from '../context/gameTypes';

const Question = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { game, player, players, setPlayers, setPrompt } = useGame();
  const [selectedVote, setSelectedVote] = useState<number | null>(null);

  const currentPromptId = game?.promptIds[game.currentRound - 1];

  const currentPrompt = useMemo(() => {
    return (
      promptPool.find((p) => p.id === currentPromptId) ??
      (currentPromptId?.startsWith('custom-') && {
        id: currentPromptId,
        text: 'Custom prompt',
        minText: 'Most likely',
        maxText: 'Least likely',
      })
    );
  }, [currentPromptId]);

  useEffect(() => {
    if (currentPrompt) {
      setPrompt(currentPrompt);
    }
  }, [currentPrompt, setPrompt]);

  useEffect(() => {
    const handleAllVoted = (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers);
      navigate('/waiting');
    };

    socket.on('all-voted', handleAllVoted);

    return () => {
      socket.off('all-voted', handleAllVoted);
    };
  }, [navigate, setPlayers]);

  if (!currentPrompt || !game || !player) return <p>Loading prompt...</p>;

  const handleSubmit = () => {
    if (selectedVote === null) return;

    socket.emit('submit-vote', {
      gameCode: player.gameId,
      playerId: player.id,
      vote: selectedVote,
    });

    navigate('/waiting');
  };

  return (
    <div className="page">
      <h1>Round {game.currentRound}</h1>
      <p>{currentPrompt.text}</p>

      <p>
        <strong>1</strong> {currentPrompt.minText}
      </p>
      <p>to</p>
      <p>
        <strong>{players.length}</strong> {currentPrompt.maxText}
      </p>

      <h2>Rank Yourself</h2>
      <div>
        {players.map((_, index) => (
          <label key={index}>
            <input
              type="radio"
              name="ranking"
              value={index + 1}
              checked={selectedVote === index + 1}
              onChange={() => setSelectedVote(index + 1)}
            />
            {index + 1}
          </label>
        ))}
      </div>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Question;