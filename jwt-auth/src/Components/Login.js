import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () =>{
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleUsernameInputChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordInputChange = (e) => {
        setPassword(e.target.value)
    }

    let navigate = useNavigate();

    const login = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:5000/api/auth/login", {email, password})
        .then((response) =>{
            console.log("response", response)
            localStorage.setItem("login", JSON.stringify({
                userLogin: true,
                token: response.data.access_token,
            }))
            setError("");
            setEmail("");
            setPassword("");
            navigate("/");
        })
        .catch(error => setError(error.response.data.message));
    };

    return(
        <div className="form-container">
            <form className="login-form" onSubmit= {login}>
                <h1>Login</h1>
                {error && <p style={{color: "red"}}>{error}</p>}
                <input onChange={handleUsernameInputChange} value={email} type="text" className="form-field" placeholder="Username" name="username" />
                <br/>
                <br/>
                <input onChange={handlePasswordInputChange} value= {password} type="password" className="form-field" placeholder="Password" name="password" />
                <br/>
                <br/>
                <button type="submit">Login</button>
                <p> Don't have account, <Link to="/register">Sign In</Link></p>
            </form>

        </div>
    )
}

export default Login;