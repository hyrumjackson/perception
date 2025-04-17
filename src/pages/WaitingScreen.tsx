import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const Waiting = () => {
  const navigate = useNavigate();
  const { players, player } = useGame();

  const [waitingPlayers, setWaitingPlayers] = useState<string[]>([]);

  useEffect(() => {
    const fakePlayers = players.filter(p => p.id !== player?.id);

    const fakePlayerNames = fakePlayers.map(p => p.name);
    setWaitingPlayers(fakePlayerNames);

    fakePlayers.forEach((p) => {
      const delay = Math.random() * 5000;
      setTimeout(() => {
        setWaitingPlayers(prev => prev.filter(name => name !== p.name));
      }, delay);
    });

    const maxDelay = Math.max(...fakePlayers.map(() => Math.random() * 5000));
    const totalDelay = maxDelay + 300;

    const navigateTimeout = setTimeout(() => {
      navigate('/round-results');
    }, totalDelay);

    return () => clearTimeout(navigateTimeout);
  }, [players, player, navigate]);

  return (
    <div className="page">
      <h2>Waiting for...</h2>
      <ul>
        {waitingPlayers.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Waiting;

// AI Assistance Note:
// I used ChatGPT to help build the useEffect logic for simulating a realistic wait screen,
// including timed removal of fake players and automatic navigation to the results page.
// The timing coordination and cleanup logic was especially helpful to get right.