import React, {useContext} from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import MyButton from "../button/myButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)


    const logOut = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }


    return (
        <div className="navbar">
            <MyButton onClick={logOut}>
                Out
            </MyButton>
            <div className='navbar__links'>
                <Link to='/about'>About the site</Link>
                <Link to='/posts'>Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;