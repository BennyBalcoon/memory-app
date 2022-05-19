import React, { useEffect, useState } from "react";
import Button from "./Button";

import "./ProgressBar.css";

interface Props {
  bgcolor: string;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const ProgressBar = ({ bgcolor, progress, setProgress }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false);

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

  return (
    <div className="pb_container">
      <div style={fillerStyles}>
        <span className="pb_content"></span>
      </div>
      <div className="btn_container">
        <Button label={"Start"} onClick={() => setIsActive(true)} />
        <Button label={"Stop"} onClick={() => setIsActive(false)} />
        <Button label={"Reset"} onClick={() => setProgress(0)} />
      </div>
    </div>
  );
};

export default ProgressBar;
