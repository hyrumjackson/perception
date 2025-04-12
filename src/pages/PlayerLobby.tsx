import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const PlayerLobby = () => {
  const navigate = useNavigate();
  const { player, players } = useGame();

  const [visiblePlayers, setVisiblePlayers] = useState<string[]>([]);
  const [status, setStatus] = useState('Waiting for host...');

  useEffect(() => {
    if (!player) return;

    // Always show host and current player immediately
    const host = players.find(p => p.isHost);
    const visible = new Set<string>();

    if (host) visible.add(host.id);
    visible.add(player.id);

    setVisiblePlayers(Array.from(visible));

    // Reveal other players (not host or current player)
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
  }, [player, players]);

  const allPlayersVisible = visiblePlayers.length === players.length;

  useEffect(() => {
    if (!allPlayersVisible) return;

    setStatus('Starting...');
    const timeout = setTimeout(() => {
      navigate('/how-to-play');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [allPlayersVisible, navigate]);

  // Host always comes first, followed by others in reveal order
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
            <span style={{ marginRight: '0.5rem' }}>{p.avatarId}</span>
            {p.name} {p.isHost && '(Host)'}
          </li>
        ))}
      </ul>

      <p>{status}</p>
    </div>
  );
};

export default PlayerLobby;