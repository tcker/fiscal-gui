import React, { useState } from 'react';

export default function IncExp() {
  const [income, setIncome] = useState({ category: '', amount: 0.0 });
  const [expense, setExpense] = useState({ category: '', amount: 0.0 });
  const [totalIncome, setTotalIncome] = useState(0.0);
  const [totalExpense, setTotalExpense] = useState(0.0);
  const [history, setHistory] = useState([]);
  const [warning, setWarning] = useState('');

  const handleIncomeChange = (e) => {
    const { name, value } = e.target;
    setIncome({ ...income, [name]: name === 'amount' ? parseFloat(value) : value });
  };

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: name === 'amount' ? parseFloat(value) : value });
  };

  const handleSubmit = (type) => {
    const currentDate = new Date().toLocaleString();
    if (type === 'income') {
      setTotalIncome(totalIncome + income.amount);
      setHistory([...history, { type: 'Income', category: income.category, amount: income.amount, date: currentDate }]);
    } else if (type === 'expense') {
      if (totalExpense + expense.amount > totalIncome) {
        setWarning('Insufficient funds for this expense.');
      } else {
        setTotalExpense(totalExpense + expense.amount);
        setHistory([...history, { type: 'Expense', category: expense.category, amount: expense.amount, date: currentDate }]);
        setWarning('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-4xl mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold text-center mb-10">Income & Expense Tracker</h1>

        <div className="grid grid-cols-2 gap-8">
          {/* Income Section */}
          <div className="p-5 bg-gray-900 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Add Income</h2>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={income.category}
              onChange={handleIncomeChange}
              className="w-full p-2 mb-4 bg-gray-800 text-white rounded-md"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={income.amount}
              onChange={handleIncomeChange}
              className="w-full p-2 mb-4 bg-gray-800 text-white rounded-md"
            />
            <button
              onClick={() => handleSubmit('income')}
              className="w-full bg-green-500 py-2 rounded-md text-white hover:bg-green-700"
            >
              Submit Income
            </button>
          </div>

          {/* Expense Section */}
          <div className="p-5 bg-gray-900 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Add Expense</h2>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={expense.category}
              onChange={handleExpenseChange}
              className="w-full p-2 mb-4 bg-gray-800 text-white rounded-md"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={expense.amount}
              onChange={handleExpenseChange}
              className="w-full p-2 mb-4 bg-gray-800 text-white rounded-md"
            />
            <button
              onClick={() => handleSubmit('expense')}
              className="w-full bg-red-500 py-2 rounded-md text-white hover:bg-red-700"
            >
              Submit Expense
            </button>
          </div>
        </div>

        {warning && (
          <div className="mt-5 bg-red-700 text-center p-3 rounded-lg">
            <p>{warning}</p>
          </div>
        )}

        {/* Totals */}
        <div className="mt-10 p-5 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Summary</h2>
          <p>Total Income: ₱{totalIncome.toFixed(2)}</p>
          <p>Total Expense: ₱{totalExpense.toFixed(2)}</p>
          <p>Net Balance: ₱{(totalIncome - totalExpense).toFixed(2)}</p>
        </div>

        {/* History */}
        <div className="mt-10 p-5 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Transaction History</h2>
          <ul className="space-y-3">
            {history.map((entry, index) => (
              <li key={index} className="p-3 bg-gray-800 rounded-md">
                <strong>{entry.type}:</strong> {entry.category} - ₱{entry.amount.toFixed(2)} 
                <span className="block text-sm text-gray-400">{entry.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
