import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';
import { Player } from '../context/gameTypes';

const Waiting = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { players, player, setPlayers } = useGame();

  const [waitingPlayers, setWaitingPlayers] = useState<string[]>([]);

  useEffect(() => {
    const updateWaitingList = (playerList: Player[]) => {
      setPlayers(playerList);
      const stillWaiting = playerList.filter((p) => !p.hasVoted && p.id !== player?.id);
      setWaitingPlayers(stillWaiting.map((p) => p.name));
    };

    const handleAllVoted = (playerList: Player[]) => {
      setPlayers(playerList);
      navigate('/round-results');
    };

    socket.on('player-voted', updateWaitingList);
    socket.on('all-voted', handleAllVoted);

    updateWaitingList(players);

    return () => {
      socket.off('player-voted', updateWaitingList);
      socket.off('all-voted', handleAllVoted);
    };
  }, [player, players, setPlayers, socket, navigate]);

  return (
    <div className="page">
      <h2>Waiting for...</h2>
      <ul>
        {waitingPlayers.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Waiting;