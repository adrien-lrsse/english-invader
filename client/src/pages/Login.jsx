import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Auth from "../components/Auth/Auth";


function Login() {
    return (
        <div className="login">
            <Navbar />
            <Auth />
        </div>
    );
}

export default Login;