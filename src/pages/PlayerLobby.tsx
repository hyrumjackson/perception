import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const PlayerLobby = () => {
    const navigate = useNavigate();
    const { player, players } = useGame();

    const sortedPlayers = [...players].sort((a, b) => {
        if (a.isHost) return -1;
        if (b.isHost) return 1;
        if (a.id === player?.id) return -1;
        if (b.id === player?.id) return 1;
        return 0;
      });

    return (
        <div className="page">
            <h2>Code</h2>
            <p>{player?.gameId || '...'}</p>
            <h2>Players</h2>
            <ul>
                {sortedPlayers.map((p) => (
                    <li key={p.id}>
                        <span>{p.avatarId}</span>
                        {p.name} {p.isHost && '(Host)'}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/how-to-play')}>Start Game</button>
        </div>
    );
};

export default PlayerLobby;