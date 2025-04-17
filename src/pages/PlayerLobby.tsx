import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { generatePromptIds } from '../utils/generatePromptIds';

const PlayerLobby = () => {
  const navigate = useNavigate();
  const { player, players, game, setGame } = useGame();

  const [visiblePlayers, setVisiblePlayers] = useState<string[]>([]);
  const [status, setStatus] = useState('Waiting for host...');

  useEffect(() => {
    if (!player) return;

    if (!game) {
        const host = players.find(p => p.isHost);
        const promptIds = generatePromptIds(5);
      
        setGame({
          id: player.gameId,
          hostId: host?.id || 'unknown',
          playerCount: players.length,
          promptGen: true,
          promptIds,
          roundCount: 5,
          currentRound: 1,
          status: 'intro',
        });
      }

    const host = players.find(p => p.isHost);
    const visible = new Set<string>();

    if (host) visible.add(host.id);
    visible.add(player.id);

    setVisiblePlayers(Array.from(visible));

    const others = players.filter(p => !visible.has(p.id));

    const timeouts: NodeJS.Timeout[] = [];

    others.forEach(p => {
      const delay = Math.random() * 5000;
      const timeout = setTimeout(() => {
        setVisiblePlayers(prev =>
          prev.includes(p.id) ? prev : [...prev, p.id]
        );
      }, delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [player, players, game, setGame]);

  const allPlayersVisible = visiblePlayers.length === players.length;

  useEffect(() => {
    if (!allPlayersVisible) return;

    setStatus('Starting...');
    const timeout = setTimeout(() => {
      navigate('/how-to', { state: { fromGame: true } });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [allPlayersVisible, navigate]);

  const sortedVisible = visiblePlayers
    .map(id => players.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .sort((a, b) => {
      if (a.isHost) return -1;
      if (b.isHost) return 1;
      return 0;
    });

  return (
    <div className="page">
      <h2>Code</h2>
      <p>{player?.gameId || '...'}</p>

      <h2>Players</h2>
      <ul>
        {sortedVisible.map(p => (
          <li key={p.id}>
            <span>{p.avatarId}</span>
            {p.name} {p.isHost && '(Host)'}
          </li>
        ))}
      </ul>
      <br />
      <p>{status}</p>
    </div>
  );
};

export default PlayerLobby;

// AI Assistance Note:
// See note for HostLobby