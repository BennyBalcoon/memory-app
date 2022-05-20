import React from "react";

import "./Card.css";
import { useGameContext } from "../context/GameContext";

interface Props {
  symbol: string;
  cardStyle: string;
  index: number;
  onClick: () => void;
  isCardFlipped: boolean;
  progress: number;
}

const HIDDEN_SYMBOL: string = "❓";

const Card: React.FC<Props> = ({ symbol, cardStyle, index, onClick, isCardFlipped, progress }) => {
  const { isGameOn } = useGameContext();

  const handleClick = () => {
    !isCardFlipped && isGameOn && progress < 100 && onClick();
  };
  return (
    <div className={`card ${cardStyle}`} onClick={handleClick}>
      <span className="symbol">{cardStyle === "hidden" ? HIDDEN_SYMBOL : symbol}</span>
    </div>
  );
};

export default Card;
