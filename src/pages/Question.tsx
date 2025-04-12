import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { promptPool } from '../data/prompts';

const Question = () => {
  const navigate = useNavigate();
  const { game, player, players, setPlayers, prompt, setPrompt } = useGame();

  const [selectedVote, setSelectedVote] = useState<number | null>(null);

  const currentPromptId = game?.promptIds[game.currentRound - 1];
  const currentPrompt = promptPool.find(p => p.id === currentPromptId);

  useEffect(() => {
    if (currentPrompt) {
      setPrompt(currentPrompt);
    }
  }, [currentPrompt, setPrompt]);

  if (!prompt || !game || !player) return <p>Loading prompt...</p>;

  const handleSubmit = () => {
    if (selectedVote === null) return;

    const updatedPlayers = players.map((p) => {
      if (p.id === player.id) {
        return { ...p, vote: selectedVote, hasVoted: true };
      } else {
        const randomVote = Math.floor(Math.random() * players.length) + 1;
        return { ...p, vote: randomVote, hasVoted: true };
      }
    });

    setPlayers(updatedPlayers);
    navigate('/waiting');
  };

  return (
    <div className="page">
      <h1>Round {game.currentRound}</h1>
      <p>{prompt.text}</p>
      <p><strong>1</strong> {prompt.minText}</p>
      <p>to</p>
      <p><strong>{players.length}</strong> {prompt.maxText}</p>

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

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Question;