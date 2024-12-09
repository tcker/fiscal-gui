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
  const [totalFunds, setTotalFunds] = useState(0);  // Added state for totalFunds
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
    <div className="container">
      <h1>Income & Expense Tracker</h1>
      {currentUser ? (  
        <p>Logged in as: {currentUser.email}</p>
      ) : (
        <p>Please log in to track your income and expenses.</p>
      )}
      <div>
        <h2>Add Income</h2>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={income.category}
          onChange={(e) => handleChange(e, 'income')}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={income.amount}
          onChange={(e) => handleChange(e, 'income')}
        />
        <button onClick={() => handleSubmit('income')}>Add Income</button>
      </div>
      <div>
        <h2>Add Expense</h2>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={expense.category}
          onChange={(e) => handleChange(e, 'expense')}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={(e) => handleChange(e, 'expense')}
        />
        <button onClick={() => handleSubmit('expense')}>Add Expense</button>
      </div>
      {warning && <p style={{ color: 'red' }}>{warning}</p>}
      <h2>History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.date}: {entry.type} - {entry.category} - ${entry.amount}
          </li>
        ))}
      </ul>
      <h2>Totals</h2>
      <p>Total Income: ${totalIncome}</p>
      <p>Total Expense: ${totalExpense}</p>
      <p>Total Funds (Net Worth): ${totalFunds}</p>
    </div>
  );
}
