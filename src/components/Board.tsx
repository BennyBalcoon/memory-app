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
  const [currentPair, setCurrentPair] = useState<Array<number>>([]);
  const [matchedCardsIndex, setMatchedCardsIndex] = useState<Array<number>>([]);
  const [progress, setProgress] = useState<number>(0);
  const [guesses, setGuesses] = useState<number>(0);
  const [entries, setEntries] = useState(null);
  const { isGameOn, toggleGame } = useGameContext();

  const updateWinnersList = () => {
    setEntries(JSON.parse(localStorage.getItem(WIN_KEY) || "[]"));
  };

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
    const newGuesses: number = guesses + 1;
    const matched: boolean = symbols[newPair[0]] === symbols[newPair[1]];
    setCurrentPair(newPair);
    setGuesses(newGuesses);
    matched && setMatchedCardsIndex([...matchedCardsIndex, ...newPair]);

    setTimeout(() => {
      setCurrentPair([]);
    }, 750);
  };

  const isCardFlipped = (index: number) => {
    return currentPair.includes(index);
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
    setCurrentPair([]);
    setMatchedCardsIndex([]);
    setSymbols(getShuffledSymbols());
  };

  const won: boolean = matchedCardsIndex.length === symbols.length && progress <= 100;

  const lose: boolean = progress >= 100 && matchedCardsIndex.length !== symbols.length;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isGameOn) {
      timer = setInterval(() => {
        setProgress((progress) => progress + 1);
      }, 1000);
    }
    return () => {
      if (progress === 100) {
        console.log("ici");
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
