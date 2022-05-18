import React from "react";

interface Props {
  bgcolor: string;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  isInProgress: boolean;
  setIsInProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProgressBar = ({ bgcolor, progress, setProgress, isInProgress, setIsInProgress }: Props) => {
  const launchChrono = () => {
    const timer = setInterval(frame, 1000);
    function frame() {
      if (progress > 100) {
        clearInterval(timer);
        setIsInProgress(false);
      } else {
        setIsInProgress(true);
        setProgress(progress++);
      }
      return progress;
    }
  };

  const containerStyles = {
    height: 20,
    width: "90%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    transition: "width 1s ease-in-out",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}></span>
      </div>
      {isInProgress ? (
        <button style={{ cursor: "not-allowed", pointerEvents: "none" }} onClick={launchChrono}>
          Chrono
        </button>
      ) : (
        <button onClick={launchChrono}>Chrono</button>
      )}
    </div>
  );
};

export default ProgressBar;
