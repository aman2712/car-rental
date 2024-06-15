import { useState, useEffect } from 'react'
import classes from './Navbar.module.css'

export default function Navbar({router}){
    const [loggedIn, setLoggedIn] = useState(false)

    const url = window.location.pathname.split('/').pop();

    useEffect(() => {
        if(localStorage.getItem('user')){
            setLoggedIn(true)
        }
    }, [url])

    return (
        <div className={classes.navbar}>
            <p onClick={() => router.navigate('/')}>rentals.</p>
            <div className={classes.navLinks}>
                <p onClick={() => router.navigate('/')}>Home <span></span></p>
                <p onClick={() => router.navigate('/#about')}>About <span></span></p>
                <p onClick={() => router.navigate('/#fleet')}>Fleet <span></span></p>
                <p onClick={() => router.navigate('/#contact')}>Contact <span></span></p>
                <p>Services <span></span></p>
            </div>
            {loggedIn ? (
                <button className='primary-btn' onClick={() => router.navigate('/dashboard')}>Dashboard</button>
            ) : (
                <button className='primary-btn' onClick={() => router.navigate('/auth')}>Sign Up</button>
            )}
        </div>
    )
}