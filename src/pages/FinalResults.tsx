import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const FinalResults = () => {
  const navigate = useNavigate();
  const { players } = useGame();

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="page">
      <h1>Final Scores</h1>
      <ol>
        {sortedPlayers.map((p) => (
          <li key={p.id}>
            <span>{p.avatarId}</span>
            {p.name} — {p.score} point{p.score !== 1 ? 's' : ''}
          </li>
        ))}
      </ol>

      <button onClick={() => navigate('/end')}>Continue</button>
    </div>
  );
};

export default FinalResults;

// AI Assistance Note:
// I used ChatGPT to help with sorting players by score in descending order,
// including making sure the original array wasn't messed up and formatting the point text properly.