import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const HostLobby = () => {
    const navigate = useNavigate();
    const { player, players } = useGame();

    const [visiblePlayers, setVisiblePlayers] = useState<string[]>([]);

    const allPlayersVisible = visiblePlayers.length === players.length;

    useEffect(() => {
        if (!player) return;

        setVisiblePlayers([player.id]);

        const fakePlayers = players.filter(p => p.id !== player.id);
        const timeouts: NodeJS.Timeout[] = [];

        fakePlayers.forEach(p => {
            const delay = Math.random() * 5000;
            const timeout = setTimeout(() => {
                setVisiblePlayers(prev => [...prev, p.id]);
            }, delay);
            timeouts.push(timeout);
        });

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [player, players]);

    return (
        <div className="page">
            <h2>Code</h2>
            <p>{player?.gameId || '...'}</p>
            <h2>Players</h2>
            <ul>
                {visiblePlayers.map((id) => {
                    const p = players.find(p => p.id === id);
                    if (!p) return null;
                    return (
                        <li key={p.id}>
                            <span>{p.avatarId}</span> {p.name} {p.isHost && '(Host)'}
                        </li>
                    );
                })}
            </ul>
            <button
                onClick={() => navigate('/game-settings')}
                disabled={!allPlayersVisible}
            >
                Start Game
            </button>
        </div>
    );
};

export default HostLobby;

// AI Assistance Note:
// I used ChatGPT to help create the natural, delayed appearance of fake players in the lobby,
// using setTimeout and randomized delays to simulate a real-time join experience.
// This enhanced the immersive feel of the game before starting.