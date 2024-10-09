import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./pages/userhome";
import VerifierHome from "./pages/verifierHome";
import Login from "./pages/login";
import SignupForm from "./pages/signup";
import { AppProvider } from "./context/UserContext";
import VerifyEmail from "./pages/verifyEmail";
import ForgotPassword from "./pages/forgotPass";
import ResetPass from "./pages/resetPass";
import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./pages/adminHome";
import { useContext } from "react"; 
import { AppContext } from "./context/UserContext";

const Main = () => {
  const { user } = useContext(AppContext);
  const role = user ? user.role : 0;

  const getHomePage = () => {
    switch (role) {
      case 1:
        return <VerifierHome />;
      case 0:
        return <UserHome />;
      case 2:
        return <Dashboard />;
      default:
        return <UserHome />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={getHomePage()} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignupForm />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgotPass" element={<ForgotPassword />} />
        <Route path="/resetPass/:token" element={<ResetPass />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <div className="App">
      <AppProvider>
        <ChakraProvider>
          <Main /> {/* Main component that uses context */}
        </ChakraProvider>
      </AppProvider>
    </div>
  );
};

export default App;
