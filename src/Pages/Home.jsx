import React from "react";
import GreenLightRedLight from "../Components/GreenLightRedLight";
import LeaderBoard from "../Components/LeaderBoard";
import { Box, Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <Flex>
      <GreenLightRedLight targetScore={10} gameDuration={40} />
      <LeaderBoard />
    </Flex>
  );
};

export default Home;
