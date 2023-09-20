import { Box, Button, Text, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Registration from "./Registration";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrUserScore } from "../Redux/action";

const GreenLightRedLight = ({ targetScore, gameDuration }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isGreen, setGreen] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameDuration);

  const dispatch = useDispatch();
  const toast = useToast();
  const currUser = useSelector((store) => store.currUser);

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
  function calculateScore(number, maxNumber = 40) {
    // number is within the range [0, maxNumber]
    const numberInRange = Math.min(Math.max(number, 0), maxNumber);
    // The score range [1, 100]
    const score = (1 - numberInRange / maxNumber) * 99 + 1;
  
    return Math.round(score);
  }
  const endGame = (newScore) => {
    console.log("newScore", newScore)
    popToast();
    let TrueScore = calculateScore(newScore);
    let updatedUser = { ...currUser, score: TrueScore };
    dispatch(saveCurrUserScore(updatedUser));
  };
  const popToast = () => {
    toast({
      title: gameWon ? "Congratulations" : "Try Again",
      status: gameWon ? "success" : "error",
      duration: 4000,
      isClosable: true,
      position: "bottom-left",
    });
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
          endGame(score);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gameStarted, timeLeft, score, targetScore]);

  const handleClick = (color) => {
    if (color === "green" && gameStarted) {
      let newScore = score + 1;
      setScore(newScore);

      if (score === targetScore - 1) {
        // If the user reaches the target score, they win
        setGameWon(true);
        setGameStarted(false);
        endGame(newScore);
      } else {
        // If not, change the color for the next click
        changeColor();
      }
    } else if (color === "red" && gameStarted) {
      endGame(score);
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
    <Box mb={10}>
      <h1 className="Title">Green Light Red Light Game</h1>
      <Registration />
      {!gameStarted && !gameOver && !gameWon && (
        <Button onClick={startGame}>Start Game</Button>
      )}
      {gameStarted && !gameOver && !gameWon && (
        <div>
          <div
            className={`box ${isGreen ? "green" : "red"}`}
            onClick={() => handleClick(isGreen ? "green" : "red")}
          >
            {/* changing box is here */}
            Click here
          </div>
          <p>Time Left: {timeLeft} seconds</p>
          <p>Score: {score}</p>
        </div>
      )}
      {gameOver && (
        <Box my={10}>
          <Text my={5}>Game Over!</Text>
          <Button onClick={restartGame}>Play Again</Button>
        </Box>
      )}
      {gameWon && (
        <Box my={10}>
          <Text my={5}>You Win!</Text>
          <Button onClick={restartGame}>Play Again</Button>
        </Box>
      )}
    </Box>
  );
};

export default GreenLightRedLight;
