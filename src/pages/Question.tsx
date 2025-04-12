import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { promptPool } from '../data/prompts';

const Question = () => {
    const navigate = useNavigate();
    const { game, prompt, setPrompt } = useGame();

    const currentPromptId = game?.promptIds[game.currentRound - 1];
    const currentPrompt = promptPool.find(p => p.id === currentPromptId);

    useEffect(() => {
        if (currentPrompt) {
        setPrompt(currentPrompt);
        }
    }, [currentPrompt, setPrompt]);

    if (!prompt) return <p>Loading prompt...</p>;

    return (
        <div className="page">
            <h1>Round 1</h1>
            <p>{prompt.text}</p>
            <p><strong>1</strong> {prompt.minText}</p>
            <p>to</p>
            <p><strong>4</strong> {prompt.maxText}</p>
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