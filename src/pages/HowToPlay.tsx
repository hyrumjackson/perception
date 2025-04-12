import { useLocation, useNavigate } from 'react-router-dom';

const HowToPlay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromGame = location.state?.fromGame;

  const handleContinue = () => {
    if (fromGame) {
      navigate('/question');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="page" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2>How to Play</h2>
      <p>Welcome to <strong>Perception</strong>!</p>
      <p>This game helps you discover how you see yourself... and how your friends might see themselves too.</p>
      <p>Are you the most shy? The most likely to become rich? The biggest rule-breaker?</p>

      <p>Here’s how it works:</p>
      <ol style={{ textAlign: 'left' }}>
        <li>You’ll receive a prompt like:</li>
      </ol>

      {/* Example question screen */}
      <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
        <h3>Who is the most likely to survive a zombie apocalypse?</h3>
        <p><strong>1</strong> Zombie slayer</p>
        <p>to</p>
        <p><strong>4</strong> Zombie food</p>
        <h4>Rank Yourself:</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <label><input type="radio" name="ranking" disabled /> 1</label>
          <label><input type="radio" name="ranking" disabled /> 2</label>
          <label><input type="radio" name="ranking" disabled /> 3</label>
          <label><input type="radio" name="ranking" disabled /> 4</label>
        </div>
      </div>

      <ol start={2} style={{ textAlign: 'left' }}>
        <li>Rank yourself based on how you think you fit into the group.</li>
        <li>For example: if Johnny is more likely to survive than you, but you’re more likely than Karen and Mason, choose 2.</li>
        <li>Then, you’ll see the results:</li>
      </ol>

      {/* Example results screen */}
      <div style={{ display: 'grid', gridTemplateColumns: '80px 100px 100px 60px', gap: '1rem', justifyContent: 'center', textAlign: 'center', margin: '1rem 0' }}>
        <div><strong>1</strong></div>
        <div>🐼<br />Johnny</div>
        <div></div>
        <div>+1</div>

        <div><strong>2</strong></div>
        <div>🦊<br />You</div>
        <div></div>
        <div>+1</div>

        <div><strong>3</strong></div>
        <div></div>
        <div></div>
        <div></div>

        <div><strong>4</strong></div>
        <div>🐸<br />Karen</div>
        <div>🐵<br />Mason</div>
        <div></div>

      </div>

      <ol start={5} style={{ textAlign: 'left' }}>
        <li>The goal is for everyone to choose a unique ranking — to neatly sort yourselves.</li>
        <li>But it doesn't always work out that way!</li>
        <li>You earn a <strong>+1</strong> if you’re the <em>only</em> person to choose your rank.</li>
      </ol>

      <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>Let's see how well you know yourself.</p>

      <button onClick={handleContinue} style={{ marginTop: '2rem' }}>Continue</button>
    </div>
  );
};

export default HowToPlay;