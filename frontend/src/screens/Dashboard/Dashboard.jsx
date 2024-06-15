import { useEffect, useState } from 'react'
import classes from './Dashboard.module.css'
import { useNavigate } from 'react-router-dom'
import apiCall from '../../utils/apiCall'

export default function Dashboard() {
    const navigate = useNavigate()
    const [bookings, setBookings] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        if(!localStorage.getItem('user')){
            navigate('/auth')
        }else{
            setUser(JSON.parse(localStorage.getItem('user')))
            getData()
        }
    }, [navigate])

    async function getData(){
        const userId = JSON.parse(localStorage.getItem('user')).id
        try {
            const resp = await apiCall(`/car/get-bookings/${userId}`, 'GET', null, 'TRUE')
            setBookings(resp)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.dashboard}>
            <p className={classes.title}>Welcome back, Aman</p>
            <div className={classes.bookings}>
                <p>Your bookings</p>
                {bookings.map((booking, index) => (
                    <div key={index} className={classes.booking}>
                        <img src={`/images/cars/${booking.image}`} alt='booking cars' />
                        <div className={classes.bookingDetails}>
                            <p className={classes.bookingTitle}>{booking.title}</p>
                            <p>From: {new Date(booking.start_date).toDateString()}</p>
                            <p>To: {new Date(booking.end_date).toDateString()}</p>
                            <p>Pickup: {booking.pickup}</p>
                            <p>Drop Off: {booking.dropoff}</p>
                            <p>{booking.type} • {booking.transmission} • {booking.seats} Seats • {booking.fuel}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}