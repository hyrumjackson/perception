import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';
import { Player, Game } from '../context/gameTypes';

const PlayerLobby = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { player, players, setPlayers, setGame } = useGame();

  const [status, setStatus] = useState('Waiting for host...');

  useEffect(() => {
    const handlePlayerList = (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers);
    };

    socket.on('player-list', handlePlayerList);

    return () => {
      socket.off('player-list', handlePlayerList);
    };
  }, [setPlayers]);

  useEffect(() => {
    const handleGameStarted = (gameData: Partial<Game>) => {
      setGame({
        id: player?.gameId || 'unknown',
        hostId: gameData.hostId || '',
        playerCount: players.length,
        currentRound: gameData.currentRound || 1,
        roundCount: gameData.roundCount || 5,
        promptGen: gameData.promptGen ?? true,
        status: gameData.status || 'intro',
        promptIds: gameData.promptIds || [],
      });
      setStatus('Starting...');
      setTimeout(() => navigate('/how-to', { state: { fromGame: true } }), 1000);
    };

    socket.on('game-started', handleGameStarted);

    return () => {
      socket.off('game-started', handleGameStarted);
    };
  }, [navigate, player?.gameId, players.length, setGame]);

  const sortedPlayers = [...players].sort((a, b) => {
    if (a.isHost) return -1;
    if (b.isHost) return 1;
    return 0;
  });

  return (
    <div className="page">
      <h2>Code</h2>
      <p>{player?.gameId || '...'}</p>

      <h2>Players</h2>
      <ul>
        {sortedPlayers.map((p) => (
          <li key={p.id}>
            <span>{p.avatarId}</span>
            {p.name} {p.isHost && '(Host)'}
          </li>
        ))}
      </ul>
      <br />
      <p>{status}</p>
    </div>
  );
};

export default PlayerLobby;