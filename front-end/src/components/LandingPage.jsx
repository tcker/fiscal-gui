import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
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
      <div style={styles.num1}>1.2k</div>
      <div style={styles.num2}>500</div>
      <div style={styles.take}>
        Take control of your
        <br />
        finances. Track, budget, and
        <br />
        save with ease
      </div>
      <div style={styles.trusted}>Trusted By:</div>
      <img src="FISCAL LOGO DARK MODE.png" alt="Logo" style={styles.image} />
      <img src="GCASH DARK MODE.png" alt="Logo" style={styles.gcash} />
      <img src="SEABANK DARK MODE.png" alt="Logo" style={styles.seabank} />
      <img src="UNION BANK DARK MODE.png" alt="Logo" style={styles.union} />
      <img src="BPI DARK MODE.png" alt="Logo" style={styles.bpi} />
      <img src="LANDBANK DARK MODE.png" alt="Logo" style={styles.landbank} />
      <img src="FISCAL LOGO.png" alt="Logo" style={styles.logo} />
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
  // },
  // login: {
  //   fontSize: '18px',
  //   fontWeight: 'lighter',
  //   position: 'absolute',
  //   top: '200px',
  //   left: '1320px',
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
    width: '285px', // Slightly larger for Get Started button
    height: '50px',
    backgroundColor: 'white', // Red background for Get Started
    color: 'black',
    borderRadius: '8px', // More rounded corners for visual contrast
    fontFamily: "'Reddit Sans', sans-serif",
    fontSize: '18px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    top: '450px',  // Position for the "Get Started" button
    left: '100px',
  },
  loginButton: {
    width: '90px',
    height: '40px',
    backgroundColor: 'white', // Green background for Login
    color: 'black',
    borderRadius: '4px', // Rounded corners
    fontFamily: "'Reddit Sans', sans-serif",
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    top: '20px', // Position it below Sign Up button
    left: '1290px',
  },
  signUpButton: {
    width: '90px',
    height: '40px',
    backgroundColor: 'white', // Green background for Sign Up
    color: 'black',
    borderRadius: '4px',
    fontFamily: "'Reddit Sans', sans-serif",
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    position: 'absolute',
    top: '19px',
    left: '1400px', // Positioned beside the Login button
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
    width: '600px',
    height: '1220px',
    position: 'absolute',
    bottom: '45px',
    right: '350px',
  },
};

export default LandingPage;
