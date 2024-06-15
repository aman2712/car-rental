import { useEffect, useState } from 'react'
import classes from './AdminDashboard.module.css'
import { useNavigate } from 'react-router-dom'
import apiCall from '../../utils/apiCall'

export default function AdminDashboard(){
    const [cars, setCars] = useState([])
    const [bookings, setBookings] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem('user')){
            navigate('/auth')
        }else{
            getCars()
        }
    }, [navigate])

    async function getCars(){
        try {
            const resp = await apiCall('/car/get-cars', 'GET', null, false)
            setCars(resp)
            const resp2 = await apiCall(`/car/get-all-bookings`, 'GET', null, 'TRUE')
            setBookings(resp2)
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCar(id){
        try {
            await apiCall(`/car/delete-car/${id}`, 'DELETE', null, true)
            getCars()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.dashboard}>
            <div className={classes.titleSection}>
                <p className={classes.title}>Admin Dashboard</p>
                <button className='primary-btn' onClick={() => navigate('/new-listing')}>Add new listing</button>
            </div>
            <div className={classes.fleetCars}>
                    {cars.map(car => (
                        <div className={classes.fleetCar} key={car.id}>
                        <img src={`/images/cars/${car.image}`} alt='Hector' />
                        <p>{car.title}</p>
                        <button className='primary-btn danger' onClick={() => deleteCar(car.id)}>Delete</button>
                        </div>
                    ))}
            </div>
            <p className={classes.title}>Bookings Made</p>
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
    )
}