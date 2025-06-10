import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';
import { Player } from '../context/gameTypes';

const HostLobby = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { player, players, setPlayers } = useGame();

  useEffect(() => {
    if (!player) return;

    const handlePlayerList = (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers);
    };

    socket.on('player-list', handlePlayerList);

    return () => {
      socket.off('player-list', handlePlayerList);
    };
  }, [player, setPlayers, socket]);

  const handleStartGame = () => {
    navigate('/game-settings');
  };

  return (
    <div className="page">
      <h2>Code</h2>
      <p>{player?.gameId || '...'}</p>

      <h2>Players</h2>
      <ul>
        {players.map((p) => (
          <li key={p.id}>
            <span>{p.avatarId}</span> {p.name} {p.isHost && '(Host)'}
          </li>
        ))}
      </ul>

      <button onClick={handleStartGame} disabled={players.length < 2}>
        Start Game
      </button>
    </div>
  );
};

export default HostLobby;