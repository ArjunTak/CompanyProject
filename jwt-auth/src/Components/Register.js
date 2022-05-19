import React from "react";
import { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";

const Register = () =>{
   
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

     const handleNameInputChange = (e) => {
         setName(e.target.value)
     }

    const handleUsernameInputChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordInputChange = (e) => {
        setPassword(e.target.value)
    }

    let navi = useNavigate();

    const register = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:5000/api/auth/register", {name, email, password})
        .then((response) =>{
            console.log("response", response)
            localStorage.setItem("login", JSON.stringify({
                userLogin: true,
                token: response.data.access_token
            }))
            setError("");
            setName("");
            setEmail("");
            setPassword("");
            navi("/login");
        })
        .catch(error => setError(error.response.data.message));
    };

    return(
        <div className="form-container">
            <form className="register-form" onSubmit= {register}>
                <h1>Sign Up</h1>
                {error && <p style={{color: "red"}}>{error}</p>}
                <input onChange={handleNameInputChange} value={name} type="text" className="form-field" placeholder="Name" name="name" />
                <br/>
                <br/> 
                <input onChange={handleUsernameInputChange} value={email} type="text" className="form-field" placeholder="Username" name="username" />
                <br/>
                <br/>
                <input onChange={handlePasswordInputChange} value= {password} type="password" className="form-field" placeholder="Password" name="password" />
                <br/>
                <br/>
                <button type="submit">Sign In</button>
                <p>Already have an account, <Link to="/login">Login</Link></p>
            </form>

        </div>
    )
}

export default Register;