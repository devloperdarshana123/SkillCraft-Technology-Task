import React, { useRef, useState } from "react";
import "./App.css";

function formatTime(ms) {
  const centiseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 60000) % 60);
  const hours = Math.floor(ms / 3600000);
  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
    centiseconds.toString().padStart(2, "0"),
  ].join(":");
}

export default function App() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const pause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (running) setLaps([time, ...laps]);
  };

  return (
    <div className="stopwatch-bg">
      <div className="stopwatch-container">
        <h2>
          <i className="fa-solid fa-stopwatch"></i> Stopwatch
        </h2>
        <div className="stopwatch-time">{formatTime(time)}</div>
        <div className="stopwatch-controls">
          {!running ? (
            <button className="start" onClick={start}>
              <i className="fa fa-play"></i> Start
            </button>
          ) : (
            <button className="pause" onClick={pause}>
              <i className="fa fa-pause"></i> Pause
            </button>
          )}
          <button className="lap" onClick={lap} disabled={!running}>
            <i className="fa fa-flag"></i> Lap
          </button>
          <button className="reset" onClick={reset} disabled={time === 0 && laps.length === 0}>
            <i className="fa fa-rotate-left"></i> Reset
          </button>
        </div>
        {laps.length > 0 && (
          <div className="stopwatch-laps">
            <h4>Laps</h4>
            <ul>
              {laps.map((lapTime, i) => (
                <li key={i}>
                  <span>Lap {laps.length - i}</span>
                  <span>{formatTime(lapTime)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}