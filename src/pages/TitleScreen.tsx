import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TitleScreen = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState<string | null>(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    
    const fetchQuote = async () => {
      try {
        const res = await fetch('https://api.api-ninjas.com/v1/quotes', {
          headers: {
            'X-Api-Key': process.env.REACT_APP_API_NINJAS_KEY!
          }
        });

        const data = await res.json();
        if (data.length > 0) {
          setQuote(`"${data[0].quote}" — ${data[0].author}`);
        } else {
          setQuote('“We do not see things as they are, we see them as we are.” — Anaïs Nin');
        }
      } catch (err) {
        console.error('Quote fetch error:', err);
        setQuote('“We do not see things as they are, we see them as we are.” — Anaïs Nin');
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="page" style={{ textAlign: 'center' }}>
      <h1>PERCEPTION</h1>

      <button onClick={() => navigate('/play')}>Play Game</button>
      <br />
      <button onClick={() => navigate('/how-to')}>How to Play</button>

      
      {quote && (
        <blockquote style={{ fontStyle: 'italic', margin: '1rem auto', maxWidth: '500px' }}>
          {quote}
        </blockquote>
      )}
    </div>
  );
};

export default TitleScreen;

// AI Assistance Note:
// I used ChatGPT to help structure the useEffect for this API call,
// including managing the fetch flow, error fallback, and ensuring it only runs once.