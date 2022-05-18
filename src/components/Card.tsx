import React from "react";

import "./Card.css";

interface Props {
  symbol: string;
  cardStyle: string;
  index: number;
  onClick: () => void;
}

const HIDDEN_SYMBOL: string = "❓";

export const Card: React.FC<Props> = ({ symbol, cardStyle, index, onClick }) => {
  return (
    <div className={`card ${cardStyle}`} onClick={() => onClick()}>
      <span className="symbol">{cardStyle === "hidden" ? HIDDEN_SYMBOL : symbol}</span>
    </div>
  );
};
