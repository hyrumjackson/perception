import { useNavigate } from 'react-router-dom';

const RoundResults = () => {
    const navigate = useNavigate();

    return (
        <div className="page">
            <h1>Round 1</h1>
            <p>Who is the most likely to survive a zombie apocalypse?</p>
            <ol>
                <li>Alice</li>
                <li>Bob</li>
                <li>Charlie</li>
                <li>David</li>
            </ol>
            <button onClick={() => navigate('/final-results')}>Continue</button>
        </div>
    );
};

export default RoundResults;