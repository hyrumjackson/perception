import { useNavigate } from 'react-router-dom';

const TitleScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Perception</h1>
      <button onClick={() => navigate('/play')}>Play Game</button>
      <br />
      <button onClick={() => navigate('/how-to')}>How to Play</button>
    </div>
  );
};

export default TitleScreen;