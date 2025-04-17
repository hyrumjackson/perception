import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useGame } from '../context/GameContext';
import { promptPool } from '../data/prompts';

const Question = () => {
  const navigate = useNavigate();
  const { game, player, players, setPlayers, setPrompt } = useGame();
  const [selectedVote, setSelectedVote] = useState<number | null>(null);

  const currentPromptId = game?.promptIds[game.currentRound - 1];

  const currentPrompt = useMemo(() => {
    return (
      promptPool.find(p => p.id === currentPromptId) ??
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

  if (!currentPrompt || !game || !player) return <p>Loading prompt...</p>;

  const handleSubmit = () => {
    if (selectedVote === null) return;

    const updatedPlayers = players.map((p) =>
      p.id === player.id
        ? { ...p, vote: selectedVote, hasVoted: true }
        : { ...p, vote: Math.floor(Math.random() * players.length) + 1, hasVoted: true }
    );

    setPlayers(updatedPlayers);
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

// AI Assistance Note:
// I relied on ChatGPT to help structure the voting screen —
// including selecting the current prompt, syncing it with context, generating the rank buttons dynamically,
// and handling submission logic with fallback values for other players. I adjusted the design and flow
// to match the intended gameplay experience.