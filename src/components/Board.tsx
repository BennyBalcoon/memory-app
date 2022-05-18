import React, { useState } from "react";
import { getShuffledSymbols } from "../symbols";
import { Card } from "./Card";

import "./Board.css";

interface Props {
  setGuesses: React.Dispatch<React.SetStateAction<number>>;
}

const Board = ({ setGuesses }: Props) => {
  const [symbols, setSymbols] = useState(getShuffledSymbols());

  const [currentPair, setCurrentPair] = useState<Array<number>>([]);
  const [matchedCardsIndex, setMatchedCardsIndex] = useState<Array<number>>([]);

  // check if a pair of cards matches, and return a string value to style the cards
  const checkCardVisibility = (index: number) => {
    const indexMatched: boolean = matchedCardsIndex.includes(index);

    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? "visible" : "hidden";
    }

    if (currentPair.includes(index)) {
      return indexMatched ? "match" : "mismatch";
    }

    return indexMatched ? "visible" : "hidden";
  };

  const handleCardClick = (index: number) => {
    if (currentPair.length === 2) {
      return;
    }

    if (currentPair.length === 0) {
      setCurrentPair([index]);
      return;
    }

    const newPair: Array<number> = [currentPair[0], index];
    const matched = symbols[newPair[0]] === symbols[newPair[1]];
    setCurrentPair(newPair);
    matched && setMatchedCardsIndex([...matchedCardsIndex, ...newPair]);

    setTimeout(() => {
      setCurrentPair([]);
    }, 750);
  };

  const handleRestart = () => {
    setCurrentPair([]);
    setMatchedCardsIndex([]);
    setSymbols(getShuffledSymbols());
  };

  return (
    <>
      <div className="board">
        {symbols.map((symbol, index) => (
          <Card
            key={index}
            symbol={symbol}
            cardStyle={checkCardVisibility(index)}
            index={index}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <div className="restart">
        <button className="btn-restart" onClick={handleRestart}>
          Restart
        </button>
      </div>
    </>
  );
};

export default Board;
