import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const RoundResults = () => {
  const navigate = useNavigate();
  const { game, players, prompt } = useGame();

  if (!prompt || !game) return <p>Loading results...</p>;

  const maxVote = players.length;

  const grouped: Record<number, typeof players> = {};
  players.forEach((p) => {
    if (!grouped[p.vote]) grouped[p.vote] = [];
    grouped[p.vote].push(p);
  });

  const handleContinue = () => {
    if (game.currentRound < game.roundCount) {
      game.currentRound += 1;
      navigate('/question');
    } else {
      navigate('/final-results');
    }
  };

  return (
    <div className="page">
      <h1>Round {game.currentRound}</h1>
      <p>{prompt.text}</p>

      <div>
        {[...Array(maxVote)].map((_, i) => {
          const voteNum = i + 1;
          const group = grouped[voteNum] || [];
          return (
            <div key={voteNum}>
              <h3>{voteNum}</h3>
              <div>
                {group.map((p) => (
                  <div key={p.id}>
                    <span>{p.avatarId}</span>
                    <div>{p.name}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default RoundResults;