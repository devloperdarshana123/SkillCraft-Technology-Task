import React, { useState } from "react";
import "./App.css";

const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(squares) {
  for (let combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: combo };
    }
  }
  if (squares.every(Boolean)) return { winner: "Draw", line: [] };
  return null;
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const result = getWinner(squares);

  function handleClick(i) {
    if (squares[i] || result) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="ttt-bg">
      <div className="ttt-container glass">
        <h1 className="ttt-title">
          <span role="img" aria-label="sparkles">✨</span> Tic Tac Toe <span role="img" aria-label="sparkles">✨</span>
        </h1>
        <div className="ttt-status">
          {result
            ? result.winner === "Draw"
              ? <span>It's a <b>Draw!</b></span>
              : <span>
                  <b>{result.winner}</b> wins!
                  <span className="ttt-trophy" role="img" aria-label="trophy"> 🏆</span>
                </span>
            : <span>
                Next: <b className={xIsNext ? "x" : "o"}>{xIsNext ? "X" : "O"}</b>
              </span>
          }
        </div>
        <div className="ttt-board">
          {squares.map((val, i) => {
            const isWin = result?.line?.includes(i);
            return (
              <button
                key={i}
                className={
                  "ttt-square" +
                  (val === "X" ? " x" : val === "O" ? " o" : "") +
                  (isWin ? " win" : "")
                }
                onClick={() => handleClick(i)}
                disabled={!!val || !!result}
                tabIndex={0}
              >
                {val}
              </button>
            );
          })}
        </div>
        <button className="ttt-restart" onClick={restart}>
          <i className="fa fa-rotate-right"></i> Restart
        </button>
        <div className="ttt-footer">
          <span>
            <i className="fa fa-code"></i> by <a href="https://github.com/" target="_blank" rel="noopener noreferrer">You</a>
          </span>
        </div>
      </div>
    </div>
  );
}