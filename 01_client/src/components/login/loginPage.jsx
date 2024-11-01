import {
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Input,
  Box,
  Container,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  const [mailInput, setmailInput] = useState("");

  const handlemailInputChange = (e) => setmailInput(e.target.value);

  const mailIsError = mailInput === "";

  const [passwordInput, setpasswordInput] = useState("");

  const handlepasswordInputChange = (e) => setpasswordInput(e.target.value);

  const passwordIsError = passwordInput === "";

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      flexDirection={"column"}
    >
      <Container bgColor={"white"} centerContent>
        <Heading marginY={"2rem"}>Login</Heading>
        <Link to="/SignIn">Aller à la page de login</Link>
        <FormControl isInvalid={mailIsError} maxW={"20rem"}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={mailInput}
            onChange={handlemailInputChange}
            maxW={"20rem"}
            height="2.4rem"
            fontSize={"16px"}
          />
          {!mailIsError ? (
            <FormHelperText></FormHelperText>
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={passwordIsError} maxW={"20rem"}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              value={passwordInput}
              onChange={handlepasswordInputChange}
              maxW={"20rem"}
              height="2.4rem"
              fontSize={"16px"}
            />
            <InputRightElement height={"2.4rem"} width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {!passwordIsError ? (
            <FormHelperText></FormHelperText>
          ) : (
            <FormErrorMessage>password is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button
          color={"grey"}
          bgColor={"#d1cdcd"}
          borderRadius={"20px"}
          marginY={"2rem"}
          width={"21rem"}
        >
          Login
        </Button>
      </Container>
    </Box>
  );
};

export default LoginPage;
