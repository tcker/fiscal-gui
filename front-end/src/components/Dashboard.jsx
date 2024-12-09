import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleIncExpClick = () => {
    navigate('/incomeAndExpense');
  };

  const handleEmergencyFundClick = () => {
    navigate('/emergencyFund');
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>Select a page to navigate to:</p>
      <button onClick={handleIncExpClick}>Income & Expenses</button>
      <button onClick={handleEmergencyFundClick}>Emergency Fund</button>
    </div>
  );
};

export default Dashboard;
