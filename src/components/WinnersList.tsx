import React from "react";

import "./WinnersList.css";

interface Props {
  winners: [{ id: number; guesses: number; date: string; winner: string }];
}

const WinnersList = ({ winners }: Props) => {
  return (
    <table className="winners_table">
      <tbody>
        {winners.map(({ id, guesses, date, winner }) => (
          <tr key={id}>
            <td className="date">{date}</td>
            <td className="guesses">{guesses}</td>
            <td className="winner">{winner}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WinnersList;
