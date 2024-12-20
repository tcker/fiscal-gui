import React, { useState } from 'react';

export default function EmergencyFund() {
  const [monthlyExpense, setMonthlyExpense] = useState('');
  const [monthsToCover, setMonthsToCover] = useState('');
  const [totalFund, setTotalFund] = useState(null);
  const [goalAmount, setGoalAmount] = useState('');
  const [goalProgress, setGoalProgress] = useState(null);

  const calculateFund = () => {
    const expense = parseFloat(monthlyExpense);
    const months = parseInt(monthsToCover);
    if (!isNaN(expense) && !isNaN(months)) {
      setTotalFund(expense * months);
    } else {
      alert('Please enter valid inputs.');
    }
  };

  const calculateProgress = () => {
    const goal = parseFloat(goalAmount);
    if (!isNaN(goal) && totalFund !== null) {
      const progress = (totalFund / goal) * 100;
      setGoalProgress(progress);
    } else {
      alert('Please enter a valid goal amount and calculate the emergency fund first.');
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

      {/* Goal Plan Section */}
      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-lg">Set Your Financial Goal (₱):</label>
          <input
            type="number"
            step="0.01"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white w-72"
          />
        </div>
        <button
          onClick={calculateProgress}
          className="bg-blue-600 px-4 py-2 rounded text-white font-semibold hover:bg-blue-500"
        >
          Calculate Progress
        </button>

        {/* Progress Bar and Display */}
        {goalProgress !== null && (
          <div className="mt-4 w-72">
            <h2 className="text-xl">Progress Towards Goal:</h2>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                    {goalProgress.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-full bg-gray-300 rounded-full">
                  <div
                    className="bg-teal-600 text-xs leading-none py-1 text-center text-white rounded-full"
                    style={{ width: `${goalProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
