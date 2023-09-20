import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { initialLoad, newUser } from "../Redux/action";

const Registration = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    level: "easy",
  });
  const AllUsers = useSelector((store) => store.AllUsers);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSave = () => {
    if (
      user &&
      user?.name !== "" &&
      user?.email !== "" &&
      user?.number !== ""
    ) {
      let ifPresent = AllUsers.find((ele) => ele.email === user.email);
      if (!ifPresent) {
        dispatch(newUser(user));
        onClose();
      } else {
        toast({
          title: "User Already Present",
          status: "info",
          duration: 5000,
          position: "bottom-left",
          isClosable: true,
        });
      }
      setUser({
        name: "",
        email: "",
        number: "",
        level: "easy",
      });
    } else {
      toast({
        title: "Fill All The Details",
        status: "error",
        duration: 5000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    initialLoad(dispatch);
    onOpen();
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
        closeOnOverlayClick={false}
        size={{ base: "xs", sm: "sm", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                placeholder="Mobile number"
                type="number"
                name="number"
                value={user.number}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Difficulty Level</FormLabel>
              <Select
                placeholder="Select difficulty level"
                name="level"
                value={user.level}
                onChange={handleChange}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </FormControl>
            <Text
              color={"red"}
              fontFamily={"cursive"}
              fontSize={"x-small"}
              fontWeight={"bold"}
              mt={2}
            >
              You need to have an account in order to play this game, (PS: dummy
              will do)
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            {/* <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Registration;
