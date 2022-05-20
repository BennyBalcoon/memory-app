import React from "react";

import "./App.css";
import Board from "./components/Board";
import { GameProvider } from "./context/GameContext";

const App = () => {
  return (
    <div className="App">
      <GameProvider>
        <Board />
      </GameProvider>
    </div>
  );
};

export default App;
