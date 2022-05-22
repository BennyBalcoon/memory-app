import React, { useState } from "react";

const WIN_KEY = "memory-winner";
const WIN_MAX = 3;

interface Props {
  guesses: number;
  updateWinnersList: (arg0: []) => void;
}

const WinnerInput = ({ guesses, updateWinnersList }: Props) => {
  const [winner, setWinner] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleWinnerSubmit: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setWinner(event.target.value);
  };

  const storeWinner = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newWinner = {
      guesses: guesses,
      winner: winner,
      date: new Date().toLocaleDateString(),
      id: Date.now(),
    };

    const entries = JSON.parse(localStorage.getItem(WIN_KEY) || "[]");

    entries.push(newWinner);

    entries.sort((a: any, b: any) => {
      return a.guesses - b.guesses;
    });

    if (entries.length > WIN_MAX) {
      entries.splice(WIN_MAX, entries.length);
    }

    localStorage.setItem(WIN_KEY, JSON.stringify(entries));
    updateWinnersList(entries);
    setIsActive(false);
  };

  return (
    <>
      {isActive ? (
        <form className="highScoreInput" onSubmit={storeWinner}>
          <p>
            <label>
              Bravo ! Entre ton prénom :
              <input type="text" autoComplete="given-name" onChange={handleWinnerSubmit} value={winner} />
            </label>
            <button type="submit">J’ai gagné !</button>
          </p>
        </form>
      ) : null}
    </>
  );
};

export default WinnerInput;
