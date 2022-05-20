import React, { useEffect, useState } from "react";
import Button from "./Button";

import "./ProgressBar.css";
import { useGameContext } from "../context/GameContext";

interface Props {
  bgcolor: string;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  handleRestart: () => void;
}

const ProgressBar = ({ bgcolor, progress, setProgress, handleRestart }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { isGameOn, toggleGame } = useGameContext();
  console.log("first render", isGameOn);

  const handleStart = () => {
    toggleGame?.();
    setIsActive(true);
  };

  const handleStop = () => {
    toggleGame?.();
    setIsActive(false);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isActive) {
      timer = setInterval(() => {
        setProgress((progress) => progress + 1);
      }, 1000);
    }
    return () => {
      if (progress >= 99) {
        clearInterval(timer);
        setIsActive(false);
      }
      clearInterval(timer);
    };
  });

  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    transition: "width 1s ease-in-out",
  };

  console.log(progress);

  return (
    <div className="pb_container">
      <div style={fillerStyles}>
        <span className="pb_content"></span>
      </div>
      <div className="btn_container">
        {!isGameOn && <Button label={"Start"} onClick={handleStart} />}

        {progress < 100 && <Button label={"Stop"} onClick={handleStop} />}
        {(!isGameOn || progress >= 100) && <Button label={"Reset"} onClick={handleRestart} />}
      </div>
    </div>
  );
};

export default ProgressBar;
