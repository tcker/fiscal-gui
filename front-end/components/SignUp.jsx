import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Make the signup request to your backend
            const response = await axios.post('http://localhost:8080/api/signup', {
                email: email,
                password: password
            });

            // Check the response status and display appropriate message
            if (response.data.success) {
                setSuccess(true);
                setMessage(response.data.message);
                // Optionally, save the token received from backend for future use
                localStorage.setItem('firebaseToken', response.data.token);
            } else {
                setSuccess(false);
                setMessage(response.data.message);
            }
        } catch (error) {
            setSuccess(false);
            setMessage('Email already in used');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Sign Up</button>
            </form>
            <div>
                {message && (
                    <p style={{ color: success ? 'green' : 'red' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Signup;
