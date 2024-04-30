import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory();
    const [username, setusername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegisterClick = async () => {
        if (!username.trim() ||!email.trim() ||!password.trim() ||!confirmPassword.trim()) {
            setError('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/account/register', {
                username,
                password,
                email
            });

            if (response.status === 201) {
                history.push('/login'); // Redirect to the login page
            }
        }
        catch (error) {
            if (error.response.status === 400) {
                setError(error.response.data.detail || "Registration failed");
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    const navigateToLogin = () => {
        history.push('/login'); // navigate to login page
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                value={username}
                onChange={e => setusername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
            />
            <button onClick={handleRegisterClick}>Register</button>
            <button onClick={navigateToLogin}>Already have an account? Log In</button>
        </div>
    );
};

export default Register;
