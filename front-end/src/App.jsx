import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Error from "./components/Error"; // Error page if not authenticated
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase auth
import { Toaster } from "react-hot-toast"; // Import Toaster
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track if the user is authenticated
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(user ? true : false); // Set auth state
      setLoading(false); // Stop loading after checking authentication
    });

    return () => unsubscribe(); // Cleanup when component unmounts
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="loader"></div> {/* Custom loader */}
      </div>
    );
  }
  return (
    <Router>
      <Toaster position="top-center" /> {/* Add Toaster component here */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Conditional route rendering based on authentication */}
        <Route
          path="/dashboard"
          element={isAuthenticated === true ? <Dashboard /> : <Navigate to="/error" />}
        />
        
        <Route path="/error" element={<Error />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
