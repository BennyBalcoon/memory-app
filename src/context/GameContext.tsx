import React, { useState, ReactNode, useContext } from "react";

interface IGameContext {
  isGameOn: boolean;
  toggleGame?: () => void;
}

const defaultGameState = {
  isGameOn: false,
};

const GameContext = React.createContext<IGameContext>(defaultGameState);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [isGameOn, setIsGameOn] = useState(defaultGameState.isGameOn);

  const toggleGame = () => {
    setIsGameOn(!isGameOn);
  };

  return <GameContext.Provider value={{ isGameOn, toggleGame }}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
