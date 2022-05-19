import React from "react";
import { Link } from "react-router-dom"
import HomeComponent from "./HomeComponent";
import Logout from "./Logout";

const Home = () => {
    const isLoginTrue = JSON.parse(localStorage.getItem("login"));

    const userNotLogin = () => (
        <>
        <h1> User Not Logged In</h1>
        <h3> Don't have an account, <Link to="/register"> Register </Link></h3>
        <h3> Already have an account, <Link to="/login">Login</Link></h3>
        </>

    )

    return(
        <div>
         {isLoginTrue && isLoginTrue.userLogin ? (
             <>
            
             <HomeComponent/>
             <br/>
             <Logout />
             </>
            
             
         ) : (
             <>{userNotLogin()}</>
         )}
        </div>
    )
}

export default Home;