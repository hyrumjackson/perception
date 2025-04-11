import { useNavigate } from 'react-router-dom';

const HowToPlay = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2>How to Play</h2>
      <p>
        This is where instructions will go to explain the game.
        <br />
        (For now, imagine a cool video or animation here!)
      </p>
      <button onClick={() => navigate('/question')}>Continue</button>
    </div>
  );
};

export default HowToPlay;