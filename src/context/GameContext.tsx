import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Player, Game } from './gameTypes';

interface GameContextType {
  game: Game | null;
  setGame: (game: Game) => void;
  player: Player | null;
  setPlayer: (player: Player) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  return (
    <GameContext.Provider value={{ game, setGame, player, setPlayer }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};