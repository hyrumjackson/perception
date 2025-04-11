import { useNavigate } from 'react-router-dom';

const GameSettings = () => {
    const navigate = useNavigate();

    return (
        <div className="page">
            <h2>Number of Rounds</h2>
            <div>
                <label><input type="radio" name="rounds" />5</label>
                <label><input type="radio" name="rounds" />10</label>
                <label><input type="radio" name="rounds" />15</label>
                <label><input type="radio" name="rounds" />20</label>
            </div>
            <h2>Prompts</h2>
            <div>
                <label><input type="radio" name="promptType" />Auto-generated</label><br />
                <label><input type="radio" name="promptType" />Custom</label>
            </div>
            <button onClick={() => navigate('/how-to-play')}>Start Game</button>
        </div>
    );
};

export default GameSettings;