import { useNavigate } from 'react-router-dom';

const TitleScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>PERCEPTION</h1>
      <button onClick={() => navigate('/host')}>Host Game</button>
      <br />
      <button onClick={() => navigate('/code')}>Join Game</button>
    </div>
  );
};

export default TitleScreen;