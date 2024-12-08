import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";  // Modular imports
import { initializeApp } from "firebase/app";  // Modular imports
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook

// Your Firebase configuration
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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Initialize the useNavigate hook for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);  // Get the Firebase authentication instance

    try {
      // Firebase Authentication login using signInWithEmailAndPassword
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // Send the email, password, and ID token in the request body to the backend
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Ensure the content type is JSON
        },
        body: JSON.stringify({
          email,
          password,  // Optionally send password, based on your backend's needs
          idToken,   // Send the Firebase ID token as part of the JSON body
        }),
      });

      const data = await response.json();
      console.log("Response from backend:", data);  // Log the response from the backend

      if (data.message === "Login successful!") {
        console.log("Login successful. Navigating to dashboard...");
        setMessage("Login successful");
        navigate("/dashboard");  // Directly navigate to the dashboard here
      } else {
        setError("Login failed.");
      }
    } catch (err) {
      setError("Failed to login. Please try again.");
      console.error("Error during login:", err);  // Log the error
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
