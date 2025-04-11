import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Player } from '../context/gameTypes';

const generateGameCode = () => {
    const letters = Array.from({ length: 3 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
  
    const number = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, '0');
  
    return `${letters}${number}`;
};

const HostInfo = () => {
    const navigate = useNavigate();
    const { setPlayer, setPlayers } = useGame();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('🐶');
    const [gameId] = useState(generateGameCode());

    const handleCreateGame = () => {
        if (!name.trim()) return;
    
        const newPlayer: Player = {
            id: crypto.randomUUID(),
            gameId,
            isHost: true,
            name,
            avatarId: avatar,
            score: 0,
            vote: 0,
            hasVoted: false,
        };

        const fakeNames = ['Alice', 'Bob', 'Charlie'];
        const fakeAvatars = ['🐵', '🐱', '🐸'];

        const fakePlayers: Player[] = fakeNames.map((name, i) => ({
            id: crypto.randomUUID(),
            gameId,
            isHost: false,
            name,
            avatarId: fakeAvatars[i],
            score: 0,
            vote: 0,
            hasVoted: false,
        }));
    
        setPlayer(newPlayer);
        setPlayers([newPlayer, ...fakePlayers]);
        navigate('/host-lobby');
      };

    return (
        <div className="page">
            <h2>Enter Name</h2>
            <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
            <h2>Select Avatar</h2>
            <div>
                {['🐶', '🐱', '🐸', '🐵', '🦊', '🐯', '🐼', '🐧'].map((icon, i) => (
                <label key={i}>
                    <input
                    type="radio"
                    name="avatar"
                    value={icon}
                    checked={avatar === icon}
                    onChange={() => setAvatar(icon)}
                    />
                    <span>{icon}</span>
                </label>
                ))}
            </div>
            <button onClick={handleCreateGame}>
                Create Game
            </button>
        </div>
    );
};

export default HostInfo;