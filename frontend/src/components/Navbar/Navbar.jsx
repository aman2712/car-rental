import { useState, useEffect } from 'react'
import classes from './Navbar.module.css'

export default function Navbar(){
    const [loggedIn, setLoggedIn] = useState(false)

    const url = window.location.pathname.split('/').pop();

    useEffect(() => {
        if(localStorage.getItem('user')){
            setLoggedIn(true)
        }
    }, [url])

    return (
        <div className={classes.navbar}>
            <p>rentals.</p>
            <div className={classes.navLinks}>
                <p>Home <span></span></p>
                <p>About <span></span></p>
                <p>Fleet <span></span></p>
                <p>Contact <span></span></p>
                <p>Services <span></span></p>
            </div>
            {loggedIn ? (
                <button className='primary-btn'>Dashboard</button>
            ) : (
                <button className='primary-btn' onClick={() => window.location = '/auth'}>Sign Up</button>
            )}
        </div>
    )
}