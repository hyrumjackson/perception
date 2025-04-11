import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Game } from '../context/gameTypes';

const GameSettings = () => {
    const navigate = useNavigate();
    const { player, setGame } = useGame();

    const [roundCount, setRoundCount] = useState<number | null>(null);
    const [promptGen, setPromptGen] = useState<boolean | null>(null);

    const handleStartGame = () => {
        if (roundCount === null || promptGen === null || !player) return;
    
        const newGame: Game = {
            id: player.gameId,
            hostId: player.id,
            playerCount: 1, // for now, we just have the host
            promptGen,
            roundCount,
            currentRound: 1,
            status: 'intro',
        };

    setGame(newGame);
    navigate('/how-to-play');
};

    return (
        <div className="page">
            <h2>Number of Rounds</h2>
            <div>
                {[5, 10, 15, 20].map((num) => (
                    <label key={num}>
                        <input
                            type="radio"
                            name="rounds"
                            checked={roundCount === num}
                            onChange={() => setRoundCount(num)}
                        />
                        {num}
                    </label>
                ))}
            </div>
            <h2>Prompts</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        name="promptType"
                        checked={promptGen === true}
                        onChange={() => setPromptGen(true)}
                    />
                    Auto-generated
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="promptType"
                        checked={promptGen === false}
                        onChange={() => setPromptGen(false)}
                    />
                    Custom
                </label>
            </div>
            <button onClick={handleStartGame} style={{ marginTop: '2rem' }}>
                Start Game
            </button>
        </div>
    );
};

export default GameSettings;