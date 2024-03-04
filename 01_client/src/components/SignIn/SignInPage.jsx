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
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  const [showConfirmation, setshowConfirmation] = React.useState(false);

  const handleClickConfirmation = () => setshowConfirmation(!showConfirmation);

  const [mailInput, setmailInput] = useState("");

  const handlemailInputChange = (e) => setmailInput(e.target.value);

  const mailRegex = /^[^\s@]+@[a-zA-Z]+(\.[a-z]{2,})$/;

  const mailIsError = mailRegex.test(mailInput) === false || mailInput === "";

  const [passwordInput, setpasswordInput] = useState("");

  const handlepasswordInputChange = (e) => setpasswordInput(e.target.value);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/;

  const passwordIsError =
    passwordRegex.test(passwordInput) === false || passwordInput === "";

  const [passwordConfirmationInput, setpasswordConfirmationInput] =
    useState("");

  const handlepasswordConfirmationInputChange = (e) =>
    setpasswordConfirmationInput(e.target.value);

  const passwordConfirmationIsError =
    passwordConfirmationInput !== passwordInput ||
    passwordConfirmationInput === "";

  function buttonClicked() {
    if (!mailIsError && !passwordIsError && !passwordConfirmationIsError) {
        navigate("/");
    }
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      flexDirection={"column"}
    >
      <Container bgColor={"white"} centerContent>
        <Heading marginY={"2rem"}>Sign in</Heading>
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
            <FormHelperText>tout est bon dans le cochon</FormHelperText>
          ) : (
            <FormErrorMessage>password is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={passwordConfirmationIsError} maxW={"20rem"}>
          <FormLabel>Password confiramtion</FormLabel>
          <InputGroup>
            <Input
              type={showConfirmation ? "text" : "password"}
              value={passwordConfirmationInput}
              onChange={handlepasswordConfirmationInputChange}
              maxW={"20rem"}
              height="2.4rem"
              fontSize={"16px"}
            />
            <InputRightElement height={"2.4rem"} width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClickConfirmation}>
                {showConfirmation ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {!passwordConfirmationIsError ? (
            <FormHelperText></FormHelperText>
          ) : (
            <FormErrorMessage>password does not correspond</FormErrorMessage>
          )}
        </FormControl>
        <Button
          color={"grey"}
          bgColor={"#d1cdcd"}
          borderRadius={"20px"}
          marginY={"2rem"}
          width={"21rem"}
          onClick={buttonClicked}
        >
          Sign in
        </Button>
      </Container>
    </Box>
  );
}

export default SignInPage;
