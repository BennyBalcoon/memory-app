import React from "react";

import "./ProgressBar.css";
interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: "#2f74c0",
    borderRadius: "inherit",
    transition: "width 1s linear",
  };

  return (
    <div className="pb_container">
      <div style={fillerStyles}>
        <span className="pb_content"></span>
      </div>
    </div>
  );
};

export default ProgressBar;
