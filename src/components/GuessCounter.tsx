import React from "react";

import "./GuessCounter.css";

interface Props {
  guesses: number;
}

const GuessCounter = ({ guesses }: Props) => {
  return <div className="guesses">Guess(es) : {guesses}</div>;
};

export default GuessCounter;
