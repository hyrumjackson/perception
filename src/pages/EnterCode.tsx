import { useNavigate } from 'react-router-dom';

const EnterCode = () => {
    const navigate = useNavigate();

    return (
        <div className="page">
            <h2>Enter Code</h2>
            <input type="text" placeholder="Game code" />
            <br />
            <button onClick={() => navigate('/info')}>Find Game</button>
        </div>
    );
};

export default EnterCode;