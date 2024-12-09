import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";  // Modular imports
import { initializeApp } from "firebase/app";  // Modular imports
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook
import { toast } from "react-hot-toast"; // Import toast for notifications

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

      // Check if the response contains the 'success' key and if it's true
      if (data.success) {
        console.log("Login successful. Navigating to dashboard...");
        setMessage(data.message);  // Set the response message (e.g., "Login successful!")
        toast.success("Successfully logged in!");  // Display success toast
        navigate("/dashboard");  // Redirect to the dashboard page
      } else {
        setError(data.message);  // If 'success' is false, show the error message from the backend
        toast.error(data.message);  // Display error toast
      }
    } catch (err) {
      setError("Failed to login. Please try again.");
      toast.error("Failed to login. Please try again.");  // Show error toast
      console.error("Error during login:", err);  // Log the error in case of any failure
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 bg-neutral-900 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-semibold">Log In</h2>
        <p className="mt-2 text-center text-sm text-neutral-400">
          Enter your credentials to continue.
        </p>
        <form onSubmit={handleLogin} className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-300"
            > 
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:ring focus:ring-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:ring focus:ring-white"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200 focus:outline-none focus:ring focus:ring-neutral-700 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        {error && (
          <p className="mt-4 text-sm text-center text-red-500">{error}</p>
        )}
        {message && (
          <p className="mt-4 text-sm text-center text-green-500">{message}</p>
        )}
        <p className="mt-6 text-center text-sm text-neutral-400">
          Don’t have an account yet?{" "}
          <a
            href="/signup"
            className="text-white font-medium underline hover:text-neutral-200"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
