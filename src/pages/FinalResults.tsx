import { useNavigate } from 'react-router-dom';

const FinalResults = () => {
    const navigate = useNavigate();

    return (
        <div className="page">
            <h1>Final Score</h1>
            <ol>
                <li>Alice</li>
                <li>Bob</li>
                <li>Charlie</li>
                <li>David</li>
            </ol>
            <button onClick={() => navigate('/end')}>Continue</button>
        </div>
    );
};

export default FinalResults;