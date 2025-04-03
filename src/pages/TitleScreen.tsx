import { useNavigate } from 'react-router-dom';

const TitleScreen = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Perception</h1>
      <button onClick={() => navigate('/host')}>Host Game</button>
      <button onClick={() => navigate('/join')}>Join Game</button>
    </div>
  );
};

export default TitleScreen;