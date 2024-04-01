import React from "react";
import Navbar from "../components/Navbar/Navbar";
import '../components/Auth/auth.css';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Signup() {
    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/auth/signup', {
                email: email,
                pseudo: pseudo,
                password: password
            });
            toast.success(response.data.message);
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
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="text" required value={email} onChange={(event) => setEmail(event.target.value)} />
                <label>Pseudo:</label>
                <input type="text" value={pseudo} onChange={(event) => setPseudo(event.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                <button>Submit</button>
                <a href="/signin">Already have an account ?</a>

            </form>
            <Toaster /> 
        </div>
        </div>

        </div>
    );
}

export default Signup;