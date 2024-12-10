import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [history, setHistory] = useState([]);
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [userEmail, setUserEmail] = useState('');

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    // Get current user
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      setUserEmail(user.email); // Set user email for display

      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", uid);

      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setUserData(userData); // Set user data from Firestore

          // Get income, expense, and totalFunds from user's data
          setIncome(userData.totalIncome || 0);
          setExpense(userData.totalExpense || 0);
          setTotalFunds(userData.totalFunds || 0); // Fetch totalFunds from Firestore

          // Calculate total balance (totalFunds can be more accurate for the dashboard)
          setTotalBalance(userData.totalFunds || 0);

          // Get the history array directly from user data
          const userHistory = userData.history || []; // Assuming history is an array
          setHistory(userHistory);
        }
      }).catch(error => {
        console.error("Error fetching user data: ", error);
      });
    }
  }, [auth, db]);

  const handleIncExpClick = () => {
    navigate('/incomeAndExpense');
  };

  const handleEmergencyFundClick = () => {
    navigate('/emergencyFund');
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  // Get the last 3 history items
  const recentHistory = history.slice(-3);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#111",
        color: "#fff",
        height: "100vh",
        width: "100%",
        padding: "10px",
      }}
    >
      {/* Sidebar */}
      <div style={{ width: "300px", marginRight: "30px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* User Email Display */}
          {userEmail && (
            <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>
              Logged in as: {userEmail}
            </div>
          )}

          <button
            onClick={handleIncExpClick}
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "10px",
              border: "1px solid #333",
              borderRadius: "10px",
              textAlign: "left",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Income and Expense
          </button>
          <button
            onClick={handleEmergencyFundClick}
            style={{
              color: "#fff",
              padding: "10px",
              border: "1px solid #333",
              borderRadius: "10px",
              textAlign: "left",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Emergency Fund
          </button>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            style={{
              backgroundColor: "#f44336",
              color: "#fff",
              padding: "10px",
              border: "1px solid #333",
              borderRadius: "10px",
              textAlign: "left",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Dashboard */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Dashboard Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {/* Total Balance */}
          <div
            style={{
              backgroundColor: "#000",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
              Total Funds
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#4CAF50" }}>
              ${totalFunds.toFixed(2)}
            </div>
          </div>

          {/* Income */}
          <div
            style={{
              backgroundColor: "#000",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
              Income
            </div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#4CAF50" }}>
              ${income.toFixed(2)}
            </div>
          </div>

          {/* Expense */}
          <div
            style={{
              backgroundColor: "#000",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
              Expense
            </div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#FF0000" }}>
              ${expense.toFixed(2)}
            </div>
          </div>

          {/* History */}
          <div
            style={{
              backgroundColor: "#000",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
              History
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recentHistory.length > 0 ? (
                recentHistory.map((item, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <div style={{ fontWeight: "bold" }}>Date: {item.date}</div>
                    <div>Type: {item.type}</div>
                    <div>Amount: ${item.amount}</div>
                    <div>Description: {item.description}</div>
                  </div>
                ))
              ) : (
                <div>No history found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
