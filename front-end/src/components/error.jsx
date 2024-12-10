import React from 'react';

const Error = () => {
  return (
    <div style={styles.container}>
      <div style={styles.errorContainer}>
        <h2 style={styles.header}>Error: You need to be logged in to access the Dashboard</h2>
        <p style={styles.message}>Please log in to continue.</p>
        <button style={styles.loginButton} onClick={() => window.location.href = '/login'}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#000000',  
    color: '#FFFFFF',
    padding: '20px',
  },
  errorContainer: {
    textAlign: 'center',
    backgroundColor: '#1F1F1F', 
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', 
    maxWidth: '400px',
    width: '100%',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#E74C3C',  
    marginBottom: '10px',
  },
  message: {
    fontSize: '18px',
    color: '#BDC3C7', 
    marginBottom: '20px',
  },
  loginButton: {
    padding: '12px 20px',
    backgroundColor: '#3498DB', 
    color: '#FFF',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',  
  },
};

export default Error;
