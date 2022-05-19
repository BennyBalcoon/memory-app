import React, { useState } from "react";
import { getShuffledSymbols } from "../symbols";
import Card from "./Card";
import ProgressBar from "./ProgressBar";

import "./Board.css";
import GuessCounter from "./GuessCounter";

const Board = () => {
  const [symbols, setSymbols] = useState(getShuffledSymbols());

  const [currentPair, setCurrentPair] = useState<Array<number>>([]);
  const [matchedCardsIndex, setMatchedCardsIndex] = useState<Array<number>>([]);

  const [progress, setProgress] = useState<number>(0);

  const [guesses, setGuesses] = useState<number>(0);

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
    const newGuesses = guesses + 1;
    const matched = symbols[newPair[0]] === symbols[newPair[1]];
    setCurrentPair(newPair);
    setGuesses(newGuesses);
    matched && setMatchedCardsIndex([...matchedCardsIndex, ...newPair]);

    setTimeout(() => {
      setCurrentPair([]);
    }, 750);
  };

  const handleRestart = () => {
    setGuesses(0);
    setProgress(0);
    setCurrentPair([]);
    setMatchedCardsIndex([]);
    setSymbols(getShuffledSymbols());
  };

  const won: boolean = matchedCardsIndex.length === symbols.length && progress <= 100;
  const lose: boolean = progress >= 100 && matchedCardsIndex.length !== symbols.length;

  if (won) {
    alert("won!!!");
  }

  return (
    <>
      <div className="board">
        <GuessCounter guesses={guesses} />
        {symbols.map((symbol, index) => (
          <Card
            key={index}
            symbol={symbol}
            cardStyle={checkCardVisibility(index)}
            index={index}
            onClick={() => handleCardClick(index)}
          />
        ))}
        {won && <p>bravo!!!</p>}
        {lose && <p>loseeeeer !!!!</p>}
      </div>
      <div>
        <ProgressBar bgcolor="blue" progress={progress} setProgress={setProgress} />
        {progress}
      </div>
    </>
  );
};

export default Board;
