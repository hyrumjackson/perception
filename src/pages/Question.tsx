import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { promptPool } from '../data/prompts';

const Question = () => {
    const navigate = useNavigate();
    const { game, players, prompt, setPrompt } = useGame();

    const currentPromptId = game?.promptIds[game.currentRound - 1];
    const currentPrompt = promptPool.find(p => p.id === currentPromptId);

    useEffect(() => {
        if (currentPrompt) {
        setPrompt(currentPrompt);
        }
    }, [currentPrompt, setPrompt]);

    if (!prompt || !game) return <p>Loading prompt...</p>;

    return (
        <div className="page">
            <h1>Round {game.currentRound}</h1>
            <p>{prompt.text}</p>
            <p><strong>1</strong> {prompt.minText}</p>
            <p>to</p>
            <p><strong>{players.length}</strong> {prompt.maxText}</p>
            <h2>Rank Yourself</h2>
            <div>
                {players.map((_, index) => (
                    <label key={index}>
                        <input type="radio" name="ranking" value={index + 1} />
                        {index + 1}
                    </label>
                ))}
            </div>
            <button onClick={() => navigate('/waiting')}>Submit</button>
        </div>
    );
};

export default Question;