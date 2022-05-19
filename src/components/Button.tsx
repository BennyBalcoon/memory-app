import React from "react";

import "./Button.css";

interface Props {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: Props) => {
  return (
    <div className="restart">
      <button className="btn-restart" onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default Button;
