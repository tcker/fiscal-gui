import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnBYIpQ8PyIQ787wTBYD1xy9FSo31VNSU",
  authDomain: "test-java-fiscal.firebaseapp.com",
  databaseURL: "https://test-java-fiscal-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-java-fiscal",
  storageBucket: "test-java-fiscal.firebasestorage.app",
  messagingSenderId: "996027067041",
  appId: "1:996027067041:web:dddd73ba9a1e1dbfb91ee0",
  measurementId: "G-QE50XLGR51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function IncExp() {
  const [income, setIncome] = useState({ category: '', amount: 0 });
  const [expense, setExpense] = useState({ category: '', amount: 0 });
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalFunds, setTotalFunds] = useState(0);
  const [history, setHistory] = useState([]);
  const [warning, setWarning] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(null);

  // Fetch and set current user and Firestore ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userQuery = query(
          collection(db, 'users'),
          where('email', '==', user.email)
        );
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUserId(userDoc.id);
          const data = userDoc.data();
          setTotalIncome(data.totalIncome || 0);
          setTotalExpense(data.totalExpense || 0);
          setHistory(data.history || []);
          setTotalFunds(data.totalFunds || 0);  // Fetch totalFunds from Firestore
        } else {
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, {
            email: user.email,
            totalIncome: 0,
            totalExpense: 0,
            totalFunds: 0,  // Initialize totalFunds
            history: [],
          });
          setUserId(user.uid);
        }
      } else {
        setCurrentUser(null);
        setUserId(null);
        setTotalIncome(0);
        setTotalExpense(0);
        setTotalFunds(0);  // Reset totalFunds
        setHistory([]);
      }
    });
    return unsubscribe;
  }, []);

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    const updateState = type === 'income' ? setIncome : setExpense;
    updateState((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  const updateTotalFunds = async (newIncome, newExpense) => {
    const newTotalFunds = newIncome - newExpense;
    setTotalFunds(newTotalFunds);

    // Update Firestore with new totalFunds
    if (userId) {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        totalFunds: newTotalFunds,
      });
    }
  };

  const handleSubmit = async (type) => {
    if (!currentUser || !userId) {
      setWarning('You must be logged in to submit data.');
      return;
    }

    const entry = {
      type: type === 'income' ? 'Income' : 'Expense',
      category: type === 'income' ? income.category : expense.category,
      amount: type === 'income' ? income.amount : expense.amount,
      date: new Date().toLocaleString(),
    };

    const userRef = doc(db, 'users', userId);

    if (type === 'income') {
      const newTotal = totalIncome + entry.amount;
      setTotalIncome(newTotal);
      await updateDoc(userRef, {
        totalIncome: newTotal,
        history: arrayUnion(entry),
      });
      updateTotalFunds(newTotal, totalExpense);
    } else {
      if (totalIncome < totalExpense + entry.amount) {
        setWarning('Insufficient funds for this expense.');
        return;
      }
      const newTotal = totalExpense + entry.amount;
      setTotalExpense(newTotal);
      await updateDoc(userRef, {
        totalExpense: newTotal,
        history: arrayUnion(entry),
      });
      updateTotalFunds(totalIncome, newTotal);
    }
    setHistory((prev) => [...prev, entry]);
    setWarning('');
  };

  return (
    <div className="flex bg-black text-white min-h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-black p-4">
        <h2 className="text-xl mb-6">Categories</h2>
        <ul className="space-y-4 text-3xl">
          <li>Income</li>
          <ul className="space-y-2 ml-4 font-size-4">
            <li>💼 Business</li>
            <li>💰 Investment</li>
            {/* <li>Gross Pay</li> */}
          </ul>
          <li>Expense</li>
          <ul className="space-y-2 ml-4">
            <li>🛒 Groceries</li>
            <li>🍕 Food</li>
            {/* <li>Rent</li> */}
            {/* <li>Utilities</li> */}
            <li>🚰 Water</li>
            <li>⚡ Meralco Bill</li>
          </ul>
        </ul>
      </div>

      {/* Right Content */}
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold text-center mb-8">Income & Expense Tracker</h1>
        {currentUser ? (
          <p className="text-center text-lg">Logged in as: <strong>{currentUser.email}</strong></p>
        ) : (
          <p className="text-center text-lg">Please log in to track your income and expenses.</p>
        )}

        <div className="space-y-8">
          {/* Income Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Add Income</h2>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={income.category}
              onChange={(e) => handleChange(e, 'income')}
              className="w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg mb-4"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={income.amount}
              onChange={(e) => handleChange(e, 'income')}
              className="w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg mb-4"
            />
            <button
              onClick={() => handleSubmit('income')}
              className="w-full p-4 bg-green-500 text-white rounded-lg"
            >
              Add Income
            </button>
          </div>

          {/* Expense Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={expense.category}
              onChange={(e) => handleChange(e, 'expense')}
              className="w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg mb-4"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={expense.amount}
              onChange={(e) => handleChange(e, 'expense')}
              className="w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg mb-4"
            />
            <button
              onClick={() => handleSubmit('expense')}
              className="w-full p-4 bg-red-500 text-white rounded-lg"
            >
              Add Expense
            </button>
          </div>
          
          {warning && <p className="text-center text-red-500">{warning}</p>}

          {/* Totals */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Totals</h2>
            <p>Total Income: <strong>${totalIncome}</strong></p>
            <p>Total Expense: <strong>${totalExpense}</strong></p>
            <p>Total Funds (Net Worth): <strong>${totalFunds}</strong></p>
          </div>

          {/* History */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">History</h2>
            <ul>
              {history.map((entry, index) => (
                <li key={index} className="mb-4">
                  {entry.date}: <strong>{entry.type}</strong> - {entry.category} - <strong>${entry.amount}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
