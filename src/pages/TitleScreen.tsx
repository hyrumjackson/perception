import { useNavigate } from 'react-router-dom';

const TitleScreen = () => {
  const navigate = useNavigate();
  const quote = '“We do not see things as they are, we see them as we are.” — Anaïs Nin';

  return (
    <div className="page" style={{ textAlign: 'center' }}>
      <h1>PERCEPTION</h1>

      <button onClick={() => navigate('/play')}>Play Game</button>
      <br />
      <button onClick={() => navigate('/how-to')}>How to Play</button>

      <blockquote style={{ fontStyle: 'italic', margin: '1rem auto', maxWidth: '500px' }}>
        {quote}
      </blockquote>
    </div>
  );
};

export default TitleScreen;