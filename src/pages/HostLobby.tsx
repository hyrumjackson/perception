import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const HostLobby = () => {
    const navigate = useNavigate();
    const { player, players } = useGame();

    return (
        <div className="page">
            <h2>Code</h2>
            <p>{player?.gameId || '...'}</p>
            <h2>Players</h2>
            <ul>
                {players.map((p) => (
                    <li key={p.id}>
                        <span>{p.avatarId}</span>
                        {p.name} {p.isHost && '(Host)'}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/game-settings')}>Start Game</button>
        </div>
    );
};

export default HostLobby;