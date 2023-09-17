import React, { useState, useEffect, useRef } from "react";

const GreenLightRedLight = ({ targetScore, gameDuration }) => {
  const [isGameRunning, setGameRunning] = useState(false);
  const [isGreen, setIsGreen] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameDuration);

  const gameTimer = useRef(null);
  const gameDurationTimer = useRef(null);

  const toggleColor = () => {
    setIsGreen((prevIsGreen) => !prevIsGreen);
  };

  const updateTimeLeft = () => {
    if (timeLeft > 0) {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    } else {
      endGame();
    }
  };

  const handleBoxClick = () => {
    if (isGameRunning) {
      if (isGreen) {
        setScore((prevScore) => prevScore + 1);
        if (score + 1 === targetScore) {
          endGame(true);
        }
      } else {
        endGame();
      }
    }
  };

  const startGame = () => {
    setGameRunning(true);
    gameTimer.current = setInterval(toggleColor, 1000);
    gameDurationTimer.current = setInterval(updateTimeLeft, 1000);

    return () => {
      clearInterval(gameTimer.current);
      clearInterval(gameDurationTimer.current);
    };
  };

  const endGame = (isWin = false) => {
    clearInterval(gameTimer.current);
    clearInterval(gameDurationTimer.current);
    setGameRunning(false);
    if (isWin) {
      alert("You Win!");
    } else {
      alert("Game Over!");
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(gameTimer.current);
      clearInterval(gameDurationTimer.current);
    };
  }, []);

  return (
    <div>
      {!isGameRunning ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <div
          className={`box ${isGreen ? "green" : "red"}`}
          onClick={handleBoxClick}
        ></div>
      )}
      <p className="border">Score: {score}</p>
      <p>Time Left: {timeLeft} seconds</p>
    </div>
  );
};

export default GreenLightRedLight;
