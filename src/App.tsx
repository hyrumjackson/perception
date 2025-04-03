import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TitleScreen from './pages/TitleScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleScreen />} />
      </Routes>
    </Router>
  );
}

export default App;