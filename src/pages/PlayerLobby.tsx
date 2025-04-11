import { useNavigate } from 'react-router-dom';

const PlayerLobby = () => {
    const navigate = useNavigate();

    return (
        <div className="page">
            <h2>Code</h2>
            <p>BYU25</p>
            <h2>Players</h2>
            <ul>
                <li>Alice</li>
                <li>Bob</li>
                <li>Charlie</li>
                <li>David</li>
            </ul>
            <button onClick={() => navigate('/game-settings')}>Start Game</button>
        </div>
    );
};

export default PlayerLobby;