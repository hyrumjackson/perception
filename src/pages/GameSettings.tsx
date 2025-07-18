import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';
import { Game } from '../context/gameTypes';
import { promptPool } from '../data/prompts';

const GameSettings = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { player, setGame } = useGame();

  const [roundCount, setRoundCount] = useState<number | null>(null);
  const [promptGen, setPromptGen] = useState<boolean | null>(null);

  const handleStartGame = () => {
    if (roundCount === null || promptGen === null || !player) return;

    let promptIds: string[] = [];

    if (promptGen) {
      const shuffledPrompts = [...promptPool].sort(() => Math.random() - 0.5);
      promptIds = shuffledPrompts.slice(0, roundCount).map((p) => p.id);
    } else {
      promptIds = Array.from({ length: roundCount }, (_, i) => `custom-${i + 1}`);
    }

    const newGame: Game = {
      id: player.gameId,
      hostId: player.id,
      playerCount: 1,
      promptGen,
      roundCount,
      currentRound: 1,
      status: 'intro',
      promptIds,
    };

    setGame(newGame);

    socket.emit('start-game', {
      gameCode: player.gameId,
      promptIds,
      promptGen,
      roundCount,
      currentRound: 1,
      status: 'intro',
      hostId: player.id,
    });

    navigate('/how-to', { state: { fromGame: true } });
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