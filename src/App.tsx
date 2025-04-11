import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TitleScreen from './pages/TitleScreen';
import PlayScreen from './pages/PlayScreen';
import HostInfo from './pages/HostInfo';
import HostLobby from './pages/HostLobby';
import GameSettings from './pages/GameSettings';
import HowToPlay from './pages/HowToPlay';
import EnterCode from './pages/EnterCode';
import PlayerInfo from './pages/PlayerInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleScreen />} />
        <Route path="/play" element={<PlayScreen />} />
        <Route path="/code" element={<EnterCode />} />
        <Route path="/host" element={<HostInfo />} />
        <Route path="/info" element={<PlayerInfo />} />
        <Route path="/host-lobby" element={<HostLobby />} />
        <Route path="/game-settings" element={<GameSettings />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
      </Routes>
    </Router>
  );
}

export default App;