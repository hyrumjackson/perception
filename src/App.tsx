import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TitleScreen from './pages/TitleScreen';
import PlayScreen from './pages/PlayScreen';
import HostInfo from './pages/HostInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleScreen />} />
        <Route path="/play" element={<PlayScreen />} />
        <Route path="/host" element={<HostInfo />} />
      </Routes>
    </Router>
  );
}

export default App;