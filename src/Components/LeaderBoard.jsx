import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LeaderBoard = () => {
  const [level, setLevel] = useState("easy");
  const [sortedUsers, setSortedUsers] = useState([]);

  const AllUsers = useSelector((store) => store.AllUsers);
  const store = useSelector((store) => store);
  console.log(store)

  useEffect(() => {
    const filteredAndSortedUsers = AllUsers.filter(
      (user) => user.score !== undefined
    ).sort((a, b) => b.score - a.score);

    setSortedUsers(filteredAndSortedUsers);
  }, [AllUsers]);
  return (
    <Box p={1} w={"300px"} bg={"white"} color={"black"} borderRadius={20}>
      <Text fontWeight={"extrabold"} fontFamily={'heading'}>LEADERBOARD</Text>
      {/* <Flex justify={"space-between"} my={2}>
        <Button>Easy</Button>
        <Button>Medium</Button>
        <Button>Hard</Button>
      </Flex> */}
      {
        sortedUsers && <Text fontWeight={'extrabold'} mt={10}>No users</Text>
      }
      <Box>
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
            >
              <Text>{idx + 1}.</Text>
              <Text>{ele.name}</Text>
              {/* <Text>{ele.email}</Text> */}
              {/* <Text>{ele.number}</Text> */}
              <Text> = </Text>
              <Text>{ele.score}</Text>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

export default LeaderBoard;
