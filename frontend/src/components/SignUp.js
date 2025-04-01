import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/catalog/api/signup/', { email, password });
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.error || "Sign-up failed!");
        }
    };

    return (
        <div className='signup-container'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Sign Up</button>
            </form>
            <p className="login-link">
            Already have an account? Please log in.. <Link to="/">Login</Link>
                </p>
        </div>
    );
};

export default SignUp;
