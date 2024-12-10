import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebase'; // Make sure to initialize firebase properly in this file
import fiscaWhite from '../assets/images/LOGO.png';
import fiscalLogo from '../assets/images/FISCAL_LOGO.png';
import gcashDark from '../assets/images/GCASH_DARK_MODE.png';
import seabankDark from '../assets/images/SEABANK_DARK_MODE.png';
import unionDark from '../assets/images/UNION_BANK_DARK_MODE.png';
import bpiDark from '../assets/images/BPI_DARK_MODE.png';
import landbankDark from '../assets/images/LANDBANK_DARK_MODE.png';

const LandingPage = () => {
  const [userCount, setUserCount] = useState(0);
  const navigate = useNavigate();
  
  // Fetch total users from Firestore
  useEffect(() => {
    const fetchUserCount = async () => {
      const db = getFirestore(firebaseApp);
      const usersRef = collection(db, 'users'); // Assuming 'users' is the collection where users are saved
      const snapshot = await getDocs(usersRef);
      setUserCount(snapshot.size); // Get the size of the snapshot to know the number of users
    };

    fetchUserCount();
  }, []);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Your data to us</h1>
      <div style={styles.security}>Security</div>
      <div style={styles.about}>About Us</div>
      <button
        style={styles.signUpButton}
        onClick={handleSignUp}
      >
        Sign Up
      </button>
      <button
        style={styles.getStartedButton}
        onClick={handleGetStarted}
      >
        Get Started
      </button>
      <button
        style={styles.loginButton}
        onClick={handleLogin}
      >
        Login
      </button>
      <div style={styles.time}>
        Time and flexibility are on your side
        <br />
        Manage your finance with your app
        <br />
        You own limitless possibilities
      </div>
      <div style={styles.total}>Total count of registered users</div>
      <div style={styles.review}>Review</div>
      <div style={styles.num1}>1.2k</div> {/* Displaying the user count */}
      <div style={styles.num2}>500</div>
      <div style={styles.take}>
        Take control of your
        <br />
        finances. Track, budget, and
        <br />
        save with ease
      </div>
      <div style={styles.trusted}>Trusted By:</div>
      <img src={fiscaWhite} alt="Logo" style={styles.image} />
      <img src={gcashDark} alt="Logo" style={styles.gcash} />
      <img src={seabankDark} alt="Logo" style={styles.seabank} />
      <img src={unionDark} alt="Logo" style={styles.union} />
      <img src={bpiDark} alt="Logo" style={styles.bpi} />
      <img src={landbankDark} alt="Logo" style={styles.landbank} />
      <img src={fiscalLogo} alt="Logo" style={styles.logo} />
    </div>
  );
};

const styles = {
  container: {  
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontFamily: "'Reddit Sans', sans-serif",
    textAlign: 'left',
    paddingTop: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    fontSize: '18px',
    fontWeight: 'lighter',
    margin: 0,
    paddingLeft: '530px',
    top: '300px',
  },
  security: {
    fontSize: '18px',
    fontWeight: 'lighter',
    position: 'absolute',
    top: '20px',
    left: '745px',
  },
  about: {
    fontSize: '18px',
    fontWeight: 'lighter',
    position: 'absolute',
    top: '19px',
    left: '910px',
  },
  time: {
    fontSize: '24px',
    fontWeight: 'lighter',
    position: 'absolute',
    top: '150px',
    right: '75px',
  },
  total: {
    fontSize: '24px',
    fontWeight: 'lighter',
    position: 'absolute',
    top: '350px',
    right: '130px',
  },
  review: {
    fontSize: '24px',
    fontWeight: 'lighter',
    position: 'absolute',
    top: '500px',
    right: '375px',
  },
  num1: {
    fontSize: '72px',
    fontWeight: 'bold',
    position: 'absolute',
    top: '250px',
    right: '328px',
  },
  num2: {
    fontSize: '72px',
    fontWeight: 'bold',
    position: 'absolute',
    top: '410px',
    right: '340px',
  },  
  take: {
    fontSize: '48px',
    fontWeight: 'bold',
    position: 'absolute',
    top: '200px',
    left: '100px',
  },
  getStartedButton: {
    width: '285px',
    height: '50px',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '8px',
    fontFamily: "'Reddit Sans', sans-serif",
    fontSize: '18px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    top: '450px',
    left: '100px',
  },
  loginButton: {
    width: '90px',
    height: '40px',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '4px',
    fontFamily: "'Reddit Sans', sans-serif",
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    left: '1290px',
  },
  signUpButton: {
    width: '90px',
    height: '40px',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '4px',
    fontFamily: "'Reddit Sans', sans-serif",
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    position: 'absolute',
    top: '19px',
    left: '1400px',
  },
  trusted: {
    fontSize: '22px',
    fontWeight: 'lighter',
    position: 'absolute',
    top: '550px',
    left: '100px',
  },
  image: {
    width: '155px',
    height: '100px',
    position: 'absolute',
    top: '20px',
    left: '50px',
  },
  gcash: {
    width: '192px',
    height: '90px',
    position: 'absolute',
    bottom: '25px',
    left: '90px',
  },
  seabank: {
    width: '200px',
    height: '53px',
    position: 'absolute',
    bottom: '40px',
    left: '385px',
  },
  union: {
    width: '225px',
    height: '42px',
    position: 'absolute',
    bottom: '50px',
    left: '650px',
  },
  bpi: {
    width: '130px',
    height: '43px',
    position: 'absolute',
    bottom: '45px',
    right: '425px',
  },
  landbank: {
    width: '250px',
    height: '45px',
    position: 'absolute',
    bottom: '45px',
    right: '100px',
  },
  logo: {
    width: '800px',
    height: '800px',
    position: 'absolute',
    right: '220px',
  },
};

export default LandingPage;
