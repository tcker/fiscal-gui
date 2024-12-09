import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth
// import { toast } from 'react-hot-toast'; // Import toast for notifications

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Use null to indicate loading state
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const auth = getAuth();

    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);  // User is authenticated
        // toast.success('Successfully logged in!');  // Show success toast
      } else {
        setIsAuthenticated(false); // User is not authenticated
        navigate('/error');  // Redirect to /error if not authenticated
      }
      setLoading(false);  // Set loading to false once the check is done
    });

    // Cleanup listener when the component is unmounted
    return () => unsubscribe();
  }, [navigate]); // Include navigate as a dependency

  // If still loading, show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If authenticated, render the Dashboard
  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>You're successfully logged in!</p>
    </div>
  );
};

export default Dashboard;
