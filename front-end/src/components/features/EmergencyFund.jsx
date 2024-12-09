import React, { useState } from 'react';

export default function EmergencyFund() {
  const [monthlyExpense, setMonthlyExpense] = useState('');
  const [monthsToCover, setMonthsToCover] = useState('');
  const [totalFund, setTotalFund] = useState(null);

  const calculateFund = () => {
    const expense = parseFloat(monthlyExpense);
    const months = parseInt(monthsToCover);
    if (!isNaN(expense) && !isNaN(months)) {
      setTotalFund(expense * months);
    } else {
      alert('Please enter valid inputs.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Emergency Fund Calculator</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-lg">Monthly Expense (₱):</label>
          <input
            type="number"
            step="0.01"
            value={monthlyExpense}
            onChange={(e) => setMonthlyExpense(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white w-72"
          />
        </div>
        <div>
          <label className="block text-lg">Months to Cover:</label>
          <input
            type="number"
            value={monthsToCover}
            onChange={(e) => setMonthsToCover(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white w-72"
          />
        </div>
        <button
          onClick={calculateFund}
          className="bg-green-600 px-4 py-2 rounded text-white font-semibold hover:bg-green-500"
        >
          Calculate Total
        </button>
      </div>
      {totalFund !== null && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Total Emergency Fund Needed:</h2>
          <p className="text-xl mt-2">₱{totalFund.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
