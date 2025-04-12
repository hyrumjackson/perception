import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Player } from '../context/gameTypes';

const allNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eli', 'Frankie', 'Grace', 'Holly', 'Isaac', 'Jack', 'Kathy', 'Leo', 'Mia', 'Nina', 'Oscar', 'Penny', 'Quinn', 'Riley', 'Sam', 'Tina', 'Uma', 'Vera', 'Willow', 'Xander', 'Yara', 'Zane'];
const allAvatars = ['🐶', '🐱', '🐸', '🐵', '🦊', '🐯', '🐼', '🐧'];

const PlayerInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setPlayer, setPlayers } = useGame();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('🐶');
    const gameId = location.state?.gameCode || 'UNKNOWN';

    const handleJoinGame = () => {
        if (!name.trim()) return;
    
        const newPlayer: Player = {
            id: crypto.randomUUID(),
            gameId,
            isHost: false,
            name,
            avatarId: avatar,
            score: 0,
            vote: 0,
            hasVoted: false,
        };

        const remainingNames = allNames.filter(n => n !== name);
        const remainingAvatars = allAvatars.filter(a => a !== avatar);

        const totalPlayers = Math.floor(Math.random() * 5) + 4; // 4–8
        const fakeCount = totalPlayers - 1;

        const shuffle = <T,>(array: T[]) => [...array].sort(() => Math.random() - 0.5);

        const shuffledNames = shuffle(remainingNames).slice(0, fakeCount);
        const shuffledAvatars = shuffle(remainingAvatars).slice(0, fakeCount);

        const fakePlayers: Player[] = shuffledNames.map((fakeName, i) => ({
            id: crypto.randomUUID(),
            gameId,
            isHost: false,
            name: fakeName,
            avatarId: shuffledAvatars[i] || '❓',
            score: 0,
            vote: 0,
            hasVoted: false,
        }));

        const hostIndex = Math.floor(Math.random() * fakePlayers.length);
        fakePlayers[hostIndex].isHost = true;
    
        setPlayer(newPlayer);
        setPlayers([newPlayer, ...fakePlayers]);
        navigate('/lobby');
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
            <button onClick={handleJoinGame}>
                Join Game
            </button>
        </div>
    );
};

export default PlayerInfo;