import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
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

  const currUser = useSelector((store) => store.currUser);
  const dispatch = useDispatch();
  const toast = useToast();

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

  function calculatePercentageScore(score, timeLeft, gameDuration) {
    const maxTimeLimits = 35; // added some margin 0f 5s
    // Ensure timeLeft is within the valid range (0 to maxTimeLimit)
    const validTimeLeft = Math.min(Math.max(timeLeft, 0), maxTimeLimits);

    const percentageScore =
      (score / gameDuration) * (validTimeLeft / maxTimeLimits) * 100;

    // Ensure the percentage score is within the range [0, 100]
    return Math.round(Math.min(Math.max(percentageScore, 0), 100));
  }

  const endGame = () => {
    if (score >= targetScore) {
      setGameWon(true);
      popToast(true);
    } else {
      setGameOver(true);
      popToast(false);
    }
    let TrueScore = calculatePercentageScore(score, timeLeft, gameDuration);
    let updatedUser = { ...currUser, score: TrueScore };
    dispatch(saveCurrUserScore(updatedUser));

    setGameStarted(false);
  };

  const popToast = (win) => {
    toast({
      title: win ? "Congratulations" : "Try Again",
      status: win ? "success" : "error",
      duration: 4000,
      isClosable: true,
      position: "bottom-left",
    });
  };

  useEffect(() => {
    if (gameStarted) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        
        if (timeLeft <= 0 || score >= targetScore) {
          clearInterval(intervalId);
          endGame();
        } else {
          changeColor();
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gameStarted, timeLeft, score, targetScore]);

  const handleClick = (color) => {
    if (color === "green" && gameStarted) {
      setScore((prevScore) => prevScore + 1);
    } else if (color === "red" && gameStarted) {
      endGame();
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
      <Box textAlign={"left"} fontWeight={"extrabold"} ml={{ md: "-50px" }}>
        <Text
          bg={"white"}
          display={"inline"}
          color={"black"}
          px={4}
          py={1}
          borderRadius={10}
          textTransform={"capitalize"}
        >
          {currUser.level}
        </Text>
      </Box>
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
            {isGreen ? "Click here" : "Stop"}
          </div>
          <p>Time Left : {timeLeft} seconds</p>
          <Flex gap={10} justify={"center"} my={1}>
            <p>Score : {score}</p>
            <p>Target : {targetScore}</p>
          </Flex>
        </div>
      )}
      {gameOver && (
        <Box my={10}>
          <Text my={5} color={"red"}>
            Game Over!
          </Text>
          <Text>Your Score : {score}</Text>
          <Button onClick={restartGame}>Play Again</Button>
        </Box>
      )}
      {gameWon && (
        <Box my={10}>
          <Text my={5} color={"yellow"}>
            Winner !!!
          </Text>
          <Button onClick={restartGame}>Play Again</Button>
        </Box>
      )}
    </Box>
  );
};

export default GreenLightRedLight;
