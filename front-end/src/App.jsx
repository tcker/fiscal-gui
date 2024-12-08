import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard'; 
// import AuthComponent from '../components/AuthComponent';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial', padding: '20px' }}>
        <h1>React Firebase Auth</h1>
        <Routes>
          {/* Route for login page */}
          <Route path="/Login" element={<Login />} />
          {/* Route for dashboard page */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
