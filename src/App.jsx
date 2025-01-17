import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Registration from "./pages/Registration";
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Service";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/verify-email" element={<VerifyEmail />} />;
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<MainPage />} />
        <Route path="/customer-dashboard" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
