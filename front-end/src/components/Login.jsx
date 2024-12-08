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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        {error && (
          <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
        )}
        {message && (
          <p className="mt-4 text-sm text-green-500 text-center">{message}</p>
        )}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
