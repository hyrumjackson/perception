import { useNavigate } from 'react-router-dom';

const EndScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Thanks for Playing</h1>
      <button onClick={() => navigate('/question')}>Play Again</button>
      <br />
      <button onClick={() => navigate('/')}>End Game</button>
    </div>
  );
};

export default EndScreen;