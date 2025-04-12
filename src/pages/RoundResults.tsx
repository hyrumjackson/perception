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

  const maxPlayersPerVote = Math.max(...Object.values(grouped).map(g => g.length), 0);

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

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {[...Array(maxVote)].map((_, i) => {
            const voteNum = i + 1;
            const group = grouped[voteNum] || [];

            const padded = [...group];
            while (padded.length < maxPlayersPerVote) {
              padded.push(null as any);
            }

            return (
              <div
                key={voteNum}
                style={{
                  display: 'grid',
                  gridTemplateColumns: `80px repeat(${maxPlayersPerVote}, 100px)`,
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{voteNum}</div>
                {padded.map((p, index) =>
                  p ? (
                    <div key={p.id}>
                      <div style={{ fontSize: '1.5rem' }}>{p.avatarId}</div>
                      <div>{p.name}</div>
                    </div>
                  ) : (
                    <div key={`empty-${index}`} />
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={handleContinue} style={{ marginTop: '2rem' }}>
        Continue
      </button>
    </div>
  );
};

export default RoundResults;