import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';
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

const allAvatars = ['🐶', '🐱', '🐸', '🐵', '🦊', '🐯', '🐼', '🐧'];

const HostInfo = () => {
  const navigate = useNavigate();
  const socket = useSocket();
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

    setPlayer(newPlayer);

    socket.emit('create-game', { player: newPlayer, gameCode: gameId }, (response: { success: boolean }) => {
      if (response.success) {
        navigate('/host-lobby');
      } else {
        alert('Error creating game. Try again.');
      }
    });

    socket.on('player-list', (players: Player[]) => {
      setPlayers(players);
    });
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
        {allAvatars.map((icon, i) => (
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
      <br />
      <button onClick={handleCreateGame}>Create Game</button>
    </div>
  );
};

export default HostInfo;