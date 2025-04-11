import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Player } from '../context/gameTypes';

const HostInfo = () => {
    const navigate = useNavigate();
    const { setPlayer } = useGame();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('🐶');
    const gameId = 'BYU25';

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
    
        setPlayer(newPlayer);
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