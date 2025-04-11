import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const PlayerLobby = () => {
    const navigate = useNavigate();
    const { player } = useGame();

    return (
        <div className="page">
            <h2>Code</h2>
            <p>{player?.gameId || '...'}</p>
            <h2>Players</h2>
            <ul>
                {player ? (
                    <li>
                        <span>
                            {player.avatarId}
                        </span>
                        {player.name}
                    </li>
                ) : (
                    <li>Loading player...</li>
                )}
            </ul>
            <button onClick={() => navigate('/game-settings')}>Start Game</button>
        </div>
    );
};

export default PlayerLobby;