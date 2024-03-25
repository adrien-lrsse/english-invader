import React from "react";
import Navbar from "../components/Navbar/Navbar";
import '../components/Auth/auth.css';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/auth/signin', {
                mail: email,
                password: password
            });
            localStorage.setItem('token', response.data.accessToken);
            window.location.href = '/';
            } catch (error) {
                console.error(error);
                toast.error(error.response.data.message);
            }
        }

    return ( 
        <div className="login">
            <Navbar />
            <div className="container-auth">

            <div className="auth">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label>Mail:</label>
                    <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} required />
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                    <button>Submit</button>
                    <a href="/signup">You don't have an account ?</a>
                </form>
                <Toaster />
            </div>
            </div>
        </div>
    );
}

export default Signin;