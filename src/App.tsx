import React, { useState } from "react";
import "./App.css";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

function App() {
  const { width, height } = useWindowSize();
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  const styles: React.CSSProperties = {
    width: "5%",
    padding: "0.5rem",
    textAlign: "center",
    fontFamily: "ui-monospace",
    margin: "0.5rem",
  };

  const handleTimer = (
    hour: number,
    minute: number,
    second: number,
    interval: number
  ) => {
    if (second > 0) {
      setSecond(second - 1);
    } else if (second === 0 && minute > 0) {
      setSecond(59);
      setMinute(minute - 1);
    } else if (second === 0 && minute === 0 && hour > 0) {
      setSecond(59);
      setMinute(59);
      setHour(hour - 1);
    } else if (hour === 0 && minute === 0 && second === 0) {
      setSecond(0);
      setMinute(0);
      setHour(0);
      clearInterval(interval);
      setTimeout(() => {
        setIsStart(false);
      }, 5000);
    }
  };

  React.useEffect(() => {
    console.log(`initializing interval`);
    let interval: number;
    if (isStart) {
      interval = setInterval(() => {
        console.log("interval", interval);
        handleTimer(hour, minute, second, interval);
      }, 1000);
      setIntervalId(interval);
      return () => {
        console.log(`clearing interval`);
        clearInterval(interval);
      };
    }
  }, [isStart, hour, minute, second]);

  const handleStart = () => {
    if (hour <= 0 && minute <= 0 && second <= 0) {
      alert("Invalid Input");
      clearInterval(intervalId);
      return;
    } else {
      setIsStart(true);
    }
  };

  const handleReset = () => {
    setIsStart(false);
    setIsPause(false);
    setHour(0);
    setMinute(0);
    setSecond(0);
  };

  const handlePause = () => {
    setIsPause(true);
    clearInterval(intervalId);
  };
  const handleResume = () => {
    setIsPause(false);
    handleTimer(hour, minute, second, intervalId);
  };
  return (
    <>
      <div>
        <h1>Countdown timer</h1>
        {!isStart && (
          <div className="timer-input">
            <input
              onChange={(e) => setHour(Number(e.target.value))}
              value={hour}
              style={styles}
              type="text"
              placeholder="HH"
            />
            <input
              onChange={(e) => setMinute(Number(e.target.value))}
              value={minute}
              style={styles}
              type="text"
              placeholder="MM"
            />
            <input
              onChange={(e) => setSecond(Number(e.target.value))}
              value={second}
              style={styles}
              type="text"
              placeholder="SS"
            />
            <button onClick={() => handleStart()}>Start</button>
          </div>
        )}

        {isStart && (
          <>
            <div className="timer-show">
              <span style={{ padding: "0.5rem" }}>
                {hour < 10 ? `0${hour}` : hour}
              </span>
              :
              <span style={{ padding: "0.5rem" }}>
                {minute < 10 ? `0${minute}` : minute}
              </span>
              :
              <span style={{ padding: "0.5rem" }}>
                {second < 10 ? `0${second}` : second}
              </span>
              {!isPause && (
                <button
                  onClick={handlePause}
                  style={{ border: "solid", marginRight: "0.5rem" }}
                >
                  Pause
                </button>
              )}
              {isPause && (
                <button
                  onClick={handleResume}
                  style={{ border: "solid", marginRight: "0.5rem" }}
                >
                  Resume
                </button>
              )}
              <button onClick={handleReset} style={{ border: "solid" }}>
                Reset
              </button>
            </div>
            {isStart && hour === 0 && minute === 0 && second === 0 && (
              <Confetti width={width} height={height} tweenDuration={5000} />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
