import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';
import { Player } from '../context/gameTypes';

const RoundResults = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { game, players, setPlayers, prompt, player, setGame } = useGame();

  const [showPoints, setShowPoints] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowPoints(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleRoundData = ({
      updatedPlayers,
      currentRound,
      isGameOver,
      hostId,
      promptIds,
      promptGen,
      roundCount,
      status,
    }: {
      updatedPlayers: Player[];
      currentRound: number;
      isGameOver: boolean;
      hostId: string;
      promptIds: string[];
      promptGen: boolean;
      roundCount: number;
      status: string;
    }) => {
      setPlayers(updatedPlayers);
      setGame({
        id: game?.id || 'unknown',
        hostId,
        currentRound,
        roundCount,
        promptGen,
        promptIds,
        status,
        playerCount: updatedPlayers.length,
      });

      if (isGameOver) {
        navigate('/final-results');
      } else {
        navigate('/question');
      }
    };

    socket.on('round-data', handleRoundData);
    
    return () => {
      socket.off('round-data', handleRoundData);
    };

  }, [game?.id, navigate, setGame, setPlayers, socket]);

  if (!prompt || !game) return <p>Loading results...</p>;

  const maxVote = players.length;

  const grouped: Record<number, typeof players> = {};
  players.forEach((p) => {
    if (!grouped[p.vote]) grouped[p.vote] = [];
    grouped[p.vote].push(p);
  });

  const voteCounts: Record<number, number> = {};
  players.forEach((p) => {
    voteCounts[p.vote] = (voteCounts[p.vote] || 0) + 1;
  });

  const uniqueVoters = new Set(
    players.filter((p) => voteCounts[p.vote] === 1).map((p) => p.id)
  );

  const maxPlayersPerVote = Math.max(
    ...Object.values(grouped).map((g) => g.length),
    0
  );

  const handleContinue = () => {
    if (player?.isHost) {
      socket.emit('next-round', { gameCode: player.gameId });
    }
  };

  return (
    <div className="page">
      <h1>Round {game.currentRound}</h1>
      <p>{prompt.text}</p>

      <div className="results-grid">
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
              className="results-row"
              style={{
                gridTemplateColumns: `80px repeat(${maxPlayersPerVote}, 100px) 60px`,
              }}
            >
              <div className="results-number">{voteNum}</div>

              {padded.map((p, index) =>
                p ? (
                  <div key={p.id} className="results-cell">
                    <div className="avatar">{p.avatarId}</div>
                    <div>{p.name}</div>
                  </div>
                ) : (
                  <div key={`empty-${index}`} className="results-cell" />
                )
              )}

              <div className="results-score">
                {showPoints &&
                  padded.map((p, idx) =>
                    p && uniqueVoters.has(p.id) ? (
                      <div key={p.id}>+1</div>
                    ) : (
                      <div key={idx}>&nbsp;</div>
                    )
                  )}
              </div>
            </div>
          );
        })}
      </div>
      <br />
      {player?.isHost && (
        <button onClick={handleContinue}>
          Continue
        </button>
      )}
    </div>
  );
};

export default RoundResults;