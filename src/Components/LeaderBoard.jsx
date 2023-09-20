import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LeaderBoard = () => {
  const [level, setLevel] = useState("easy");
  const [sortedUsers, setSortedUsers] = useState([]);

  const AllUsers = useSelector((store) => store.AllUsers);

  useEffect(() => {
    const filteredAndSortedUsers = AllUsers.filter(
      (user) => user.score !== 0
    ).sort((a, b) => b.score - a.score);

    setSortedUsers(filteredAndSortedUsers);
  }, [AllUsers]);
  return (
    <Box
      p={1}
      w={"300px"}
      bg={"white"}
      color={"black"}
      borderRadius={20}
      minH={"400px"}
      //   bg={"linear-gradient(to right, #ff0000, #00ff00)"}
    >
      <Text my={3} fontWeight={"extrabold"} fontFamily={"heading"}>
        LEADERBOARD
      </Text>
      {/* <Flex justify={"space-between"} my={2}>
        <Button>Easy</Button>
        <Button>Medium</Button>
        <Button>Hard</Button>
      </Flex> */}
      <Stack gap={1}>
        <Flex
          p={1}
          bg={"white"}
          color={"black"}
          borderRadius={10}
          fontWeight={"bold"}
          justify={"space-between"}
          //   boxShadow={
          //     "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
          //   }
          cursor={"pointer"}
        >
          <Text>{"No"}</Text>
          <Text>Name</Text>
          <Text>Maxpoints</Text>
        </Flex>
        {sortedUsers?.map((ele, idx) => {
          return (
            <Flex
              key={idx}
              p={1}
              bg={"white"}
              color={"black"}
              borderRadius={10}
              fontWeight={"bold"}
              justify={"space-between"}
              boxShadow={
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
              }
              cursor={"pointer"}
            >
              <Text>{idx + 1}.</Text>
              <Text>{ele.name}</Text>
              <Text> = {ele.score}</Text>
            </Flex>
          );
        })}
      </Stack>
    </Box>
  );
};

export default LeaderBoard;
