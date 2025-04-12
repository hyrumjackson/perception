import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const RoundResults = () => {
  const navigate = useNavigate();
  const { game, players, setPlayers, prompt } = useGame();

  if (!prompt || !game) return <p>Loading results...</p>;

  const maxVote = players.length;

  const grouped: Record<number, typeof players> = {};
  players.forEach((p) => {
    if (!grouped[p.vote]) grouped[p.vote] = [];
    grouped[p.vote].push(p);
  });

  const handleContinue = () => {
    const voteCounts: Record<number, number> = {};
    players.forEach(p => {
      voteCounts[p.vote] = (voteCounts[p.vote] || 0) + 1;
    });

    const updatedPlayers = players.map(p => {
      const isUnique = voteCounts[p.vote] === 1;
      return {
        ...p,
        score: isUnique ? p.score + 1 : p.score,
        vote: 0,
        hasVoted: false
      };
    });
  
    setPlayers(updatedPlayers);
  
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