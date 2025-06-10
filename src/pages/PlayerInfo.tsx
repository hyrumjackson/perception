import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';
import { Player } from '../context/gameTypes';

const allAvatars = ['🐶', '🐱', '🐸', '🐵', '🦊', '🐯', '🐼', '🐧'];

const PlayerInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useSocket();
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

    setPlayer(newPlayer);

    socket.emit('join-game', { player: newPlayer, gameCode: gameId }, (response: { success: boolean; message?: string }) => {
      if (response.success) {
        navigate('/lobby');
      } else {
        alert(response.message || 'Failed to join game');
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
      <button onClick={handleJoinGame}>Join Game</button>
    </div>
  );
};

export default PlayerInfo;