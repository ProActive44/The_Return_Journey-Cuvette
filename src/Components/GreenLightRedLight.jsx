import React, { useState, useEffect, useCallback } from "react";

const GreenLightRedLight = ({ targetScore, gameDuration }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isGreen, setGreen] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameDuration);

  const getRandomColor = () => {
    return Math.random() < 0.5;
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setGameWon(false);
    setScore(0);
    setTimeLeft(gameDuration);
    setGreen(getRandomColor());
  };

  const changeColor = () => {
    const timeInterval = 1000;
    // Generate a random number between 1 and 2 seconds
    const randomTime = Math.floor(Math.random() * timeInterval * 2) + 1;
    setTimeout(() => {
      setGreen(getRandomColor());
    }, randomTime);
  };

  useEffect(() => {
    if (gameStarted) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        changeColor();

        if (timeLeft === 0) {
          clearInterval(intervalId);
          setGameStarted(false);
          if (score >= targetScore) {
            setGameWon(true);
          } else {
            setGameOver(true);
          }
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gameStarted, timeLeft, score, targetScore]);

  const handleClick = (color) => {
    if (color === "green" && gameStarted) {
      setScore(score + 1);

      if (score === targetScore - 1) {
        // If the user reaches the target score, they win
        setGameWon(true);
        setGameStarted(false);
      } else {
        // If not, change the color for the next click
        changeColor();
      }
    } else if (color === "red" && gameStarted) {
      setGameStarted(false);
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setGameWon(false);
    setScore(0);
    setGreen(false);
  };

  return (
    <div>
      <h1>Green Light Red Light Game</h1>
      {!gameStarted && !gameOver && !gameWon && (
        <button onClick={startGame}>Start Game</button>
      )}
      {gameStarted && !gameOver && !gameWon && (
        <div>
          <div
            className={`box ${isGreen ? "green" : "red"}`}
            onClick={() => handleClick(isGreen ? "green" : "red")}
          >
            {/* changing box is here */}
          </div>
          <p>Time Left: {timeLeft} seconds</p>
          <p>Score: {score}</p>
        </div>
      )}
      {gameOver && (
        <div>
          <p>Game Over!</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
      {gameWon && (
        <div>
          <p>You Win!</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default GreenLightRedLight;
