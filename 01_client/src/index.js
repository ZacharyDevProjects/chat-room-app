import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraBaseProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({});

createRoot(document.getElementById("root")).render(
  <ChakraBaseProvider theme={theme}>
    <App />
  </ChakraBaseProvider>
);
