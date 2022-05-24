import React, { useState, useEffect } from "react";

import { getShuffledSymbols } from "../symbols";
import { useGameContext } from "../context/GameContext";

import Card from "./Card";
import ProgressBar from "./ProgressBar";
import GuessCounter from "./GuessCounter";
import WinnerInput from "./WinnerInput";
import WinnersList from "./WinnersList";
import Button from "./Button";

import "./Board.css";

const WIN_KEY = "memory-winner";

const Board = () => {
  const [symbols, setSymbols] = useState<Array<string>>(getShuffledSymbols());
  const [cardsFlipped, setCardsFlipped] = useState<Array<number>>([]);
  const [matchedCardsIds, setMatchedCardsIds] = useState<Array<number>>([]);
  const [progress, setProgress] = useState<number>(0);
  const [guesses, setGuesses] = useState<number>(0);
  const [entries, setEntries] = useState(null);
  const { isGameOn, toggleGame } = useGameContext();

  const updateWinnersList = () => {
    setEntries(JSON.parse(localStorage.getItem(WIN_KEY) || "[]"));
  };

  // check index for each card
  // check if each index is in cardsFlipped array
  // check is each index is in matchedCardsIndex array
  // return a string value to style the cards
  const checkCardVisibility = (index: number) => {
    const indexMatched: boolean = matchedCardsIds.includes(index);

    if (cardsFlipped.length < 2) {
      return indexMatched || index === cardsFlipped[0] ? "visible" : "hidden";
    }

    if (cardsFlipped.includes(index)) {
      return indexMatched ? "match" : "mismatch";
    }

    return indexMatched ? "visible" : "hidden";
  };

  const handleCardClick = (index: number) => {
    if (cardsFlipped.length === 2) {
      return;
    }

    if (cardsFlipped.length === 0) {
      setCardsFlipped([index]);
      return;
    }

    handleNewPair(index);
  };

  const handleNewPair = (index: number) => {
    const newPair: Array<number> = [cardsFlipped[0], index];
    const newGuesses: number = guesses + 1;
    const matched: boolean = symbols[newPair[0]] === symbols[newPair[1]];
    setCardsFlipped(newPair);
    setGuesses(newGuesses);
    matched && setMatchedCardsIds([...matchedCardsIds, ...newPair]);

    setTimeout(() => {
      setCardsFlipped([]);
    }, 750);
  };

  const isCardFlipped = (index: number) => {
    return cardsFlipped.includes(index);
  };

  const handleStart = () => {
    toggleGame?.();
  };

  const handleStop = () => {
    toggleGame?.();
  };

  const handleRestart = () => {
    setGuesses(0);
    setProgress(0);
    setCardsFlipped([]);
    setMatchedCardsIds([]);
    setSymbols(getShuffledSymbols());
  };

  const won: boolean = matchedCardsIds.length === symbols.length && progress <= 100;

  const lose: boolean = progress >= 100 && matchedCardsIds.length !== symbols.length;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isGameOn) {
      timer = setInterval(() => {
        setProgress((progress) => progress + 1);
      }, 1000);
    }
    return () => {
      if (progress === 100) {
        clearInterval(timer);
        toggleGame?.();
      }
      if (won) {
        clearInterval(timer);
        toggleGame?.();
      }
      clearInterval(timer);
    };
  }, [progress, isGameOn, toggleGame, won]);

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
            isCardFlipped={isCardFlipped(index)}
            progress={progress}
          />
        ))}
        {entries && <WinnersList winners={entries} />}
        {won && <WinnerInput guesses={guesses} updateWinnersList={updateWinnersList} />}
        {lose && <p>Tu as perdu ! Clique sur Reset et retente ta chance</p>}
      </div>
      <div>
        <ProgressBar progress={progress} />
      </div>
      <div className="btn_container">
        {!isGameOn && <Button label={"Start"} onClick={handleStart} />}
        {isGameOn && progress < 100 && <Button label={"Stop"} onClick={handleStop} />}
        {(!isGameOn || progress >= 100) && <Button label={"Reset"} onClick={handleRestart} />}
      </div>
    </>
  );
};

export default Board;
