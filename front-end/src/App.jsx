import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/SignUp";
import Dashboard from "../components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for the Signup page */}
        <Route path="/signup" element={<Signup />} />
        
        {/* Route for the Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* You can set the default route (e.g., redirect to login if no route matches) */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
