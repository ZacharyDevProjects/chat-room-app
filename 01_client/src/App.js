import React from "react";
import Header from "../src/components/layout/header";
import Footer from "../src/components/layout/footer";
import Chat from "../src/components/chat/chat";
import LoginPage from "../src/components/login/loginPage";
import { Route, Router } from "react-router-dom";

// const App = () => {
//   return (
//     <>
//       <Header />
//       <Chat />
//       <Footer />
//     </>
//   );
// };

const App = () => {
  return (
    <>
      <Router>
        <Route>
          <LoginPage />
        </Route>
      </Router>
    </>
  );
};
export default App;
