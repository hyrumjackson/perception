import { useLocation, useNavigate } from 'react-router-dom';

const HowToPlay = () => {
  const navigate = useNavigate();
  const fromGame = useLocation().state?.fromGame;

  const handleContinue = () => {
    navigate(fromGame ? '/question' : '/');
  };

  return (
    <div className="page" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '1rem' }}>How to Play</h1>
      <p><strong>Perception</strong> is a game about how you see yourself — and how your friends might see themselves too.</p>
      <p>Are you the shyest? The funniest? The most likely to take over the world?</p>

      <hr style={{ margin: '2rem auto', width: '60%' }} />

      <h2 style={{ marginBottom: '0.5rem' }}>How it Works</h2>
      <ol style={{ textAlign: 'left', lineHeight: '1.6' }}>
        <li>You’ll be given a prompt like:</li>
      </ol>

      {/* Example Question UI */}
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '1.25rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        margin: '1rem 0'
      }}>
        <h3 style={{ marginTop: 0 }}>Who is the most likely to survive a zombie apocalypse?</h3>
        <p><strong>1</strong> Zombie slayer</p>
        <p>to</p>
        <p><strong>4</strong> Zombie food</p>
        <h4 style={{ marginTop: '1.25rem' }}>Rank Yourself:</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {[1, 2, 3, 4].map(num => (
            <label key={num}>
              <input type="radio" name="example" disabled /> {num}
            </label>
          ))}
        </div>
      </div>

      <ol start={2} style={{ textAlign: 'left', lineHeight: '1.6' }}>
        <li>Choose your rank based on how you think you compare to the group.</li>
        <li>Example: if you think Johnny would survive longer than you, but you’d beat Karen and Mason, choose <strong>2</strong>.</li>
        <li>After voting, you'll see the results:</li>
      </ol>

      <div style={{
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '1.25rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        margin: '1rem 0',
        marginTop: '2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '80px 100px 100px 60px',
          rowGap: '1rem',
          gridAutoRows: '40px',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><strong>1</strong></div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>🐼<br />Johnny</div>
          <div></div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'green', fontWeight: 'bold' }}>+1</div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><strong>2</strong></div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>🦊<br />You</div>
          <div></div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'green', fontWeight: 'bold' }}>+1</div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><strong>3</strong></div>
          <div></div>
          <div></div>
          <div></div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><strong>4</strong></div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>🐸<br />Karen</div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>🐵<br />Mason</div>
          <div></div>
        </div>
      </div>

      <ol start={5} style={{ textAlign: 'left', lineHeight: '1.6', marginTop: '2rem' }}>
        <li>The goal is for everyone to pick a unique rank — forming a perfect sort. But hey, life’s messy. So are the results.</li>
        <li>If you’re the <em>only one</em> to pick your number, you earn a <strong>+1</strong>.</li>
      </ol>

      <p style={{ fontWeight: 'bold', marginTop: '2rem' }}>
        Let's see how well you know yourself.
      </p>

      <button onClick={handleContinue} className="continue-button">
        Continue
      </button>
    </div>
  );
};

export default HowToPlay;