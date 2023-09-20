import React from "react";
import GreenLightRedLight from "../Components/GreenLightRedLight";
import LeaderBoard from "../Components/LeaderBoard";
import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Home = () => {
  const level = useSelector((store) => {
    return store.currUser.level;
  });
  
  let targetScore = level === "easy" ? 10 : level === "medium" ? 15 : 25;
//   let targetScore = level === "easy" ? 2 : level === "medium" ? 15 : 25;  //code for testing
  let gameDuration = 40;

  return (
    <Flex justify={"space-around"} my={10} wrap={'wrap'}>
      <GreenLightRedLight
        targetScore={targetScore}
        gameDuration={gameDuration}
        w={"50%"}
      />
      <LeaderBoard />
    </Flex>
  );
};

export default Home;
