import { useNavigate } from 'react-router-dom';

const Question = () => {
    const navigate = useNavigate();

    return (
        <div className="page">
            <h1>Round 1</h1>
            <p>Who is the most likely to survive a zombie apocalypse?</p>
            <p><strong>1</strong> Zombie slayer</p>
            <p>to</p>
            <p><strong>4</strong> Zombie food</p>
            <h2>Rank Yourself</h2>
            <div>
                <label><input type="radio" name="ranking" />1</label>
                <label><input type="radio" name="ranking" />2</label>
                <label><input type="radio" name="ranking" />3</label>
                <label><input type="radio" name="ranking" />4</label>
            </div>
            <button onClick={() => navigate('/waiting')}>Submit</button>
        </div>
    );
};

export default Question;