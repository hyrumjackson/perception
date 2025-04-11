import { useNavigate } from 'react-router-dom';

const Waiting = () => {
    const navigate = useNavigate();

    return (
        <div className="page">
            <h2>Waiting for...</h2>
            <ul>
                <li>Alice</li>
                <li>Bob</li>
                <li>Charlie</li>
                <li>David</li>
            </ul>
            <button onClick={() => navigate('/round-results')}>Continue</button>
        </div>
    );
};

export default Waiting;