import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EnterCode = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');

    const handleFindGame = () => {
        if (!code.trim()) return;
        navigate('/info', { state: { gameCode: code.toUpperCase() } });
    };

    return (
        <div className="page">
            <h2>Enter Code</h2>
            <input
                type="text"
                placeholder="Game code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <br />
            <br />
            <button onClick={handleFindGame}>Find Game</button>
        </div>
    );
};

export default EnterCode;