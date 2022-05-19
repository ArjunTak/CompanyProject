import React from "react";
import { useNavigate } from "react-router-dom";



const Logout = () =>{

   let nav = useNavigate()

    const handleLogout = (e) =>{
        e.preventDefault();
        localStorage.removeItem("login");
        nav("/login");
    } 

    return(
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout;