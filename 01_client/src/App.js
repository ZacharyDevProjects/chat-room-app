import React from "react";
import Header from "../src/components/layout/header";
import Footer from "../src/components/layout/footer";
import Chat from "./components/layout/chat";
import LoginPage from "./components/login/loginPage";
import SignInPage from "./components/SignIn/SignInPage";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Header />
      <Chat />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signIn" element={<SignInPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
