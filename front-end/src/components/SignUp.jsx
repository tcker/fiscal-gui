import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';  

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a promise that makes the signup request
        const signupPromise = axios.post('http://localhost:8080/api/signup', {
            email: email,
            password: password
        });

        // Show toast with promise
        toast.promise(
            signupPromise,
            {
                loading: 'Creating your account...',
                success: (response) => {
                    if (response.data.success) {
                        setSuccess(true);
                        setMessage(response.data.message);
                        return <b>Account created successfully!</b>;
                    } else {
                        setSuccess(false);
                        setMessage(response.data.message);
                        return <b>Signup failed: {response.data.message}</b>;
                    }
                },
                error: (error) => {
                    setSuccess(false);
                    setMessage('An error occurred during signup.');
                    return <b>Error: {error.message}</b>;
                }
            }
        );
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="w-full max-w-md p-8 bg-neutral-900 rounded-lg shadow-lg">
                <h2 className="text-center text-3xl font-semibold">Sign Up</h2>
                <p className="mt-2 text-center text-sm text-neutral-400">
                    Create an account to get started.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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
                        Sign Up
                    </button>
                </form>
                {message && (
                    <p
                        className={`mt-4 text-center text-sm ${
                            success ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {message}
                    </p>
                )}
                <p className="mt-6 text-center text-sm text-neutral-400">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-white font-medium underline hover:text-neutral-200"
                    >
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
