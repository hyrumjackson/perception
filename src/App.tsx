import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TitleScreen from './pages/TitleScreen';
import PlayScreen from './pages/PlayScreen';
import HostInfo from './pages/HostInfo';
import HostLobby from './pages/HostLobby';
import GameSettings from './pages/GameSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleScreen />} />
        <Route path="/play" element={<PlayScreen />} />
        <Route path="/host" element={<HostInfo />} />
        <Route path="/host-lobby" element={<HostLobby />} />
        <Route path="/game-settings" element={<GameSettings />} />
      </Routes>
    </Router>
  );
}

export default App;