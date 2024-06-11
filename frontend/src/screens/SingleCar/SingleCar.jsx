import classes from './SingleCar.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiCall from '../../utils/apiCall'

export default function SingleCar(){
    const [carDetails, setCarDetails] = useState()
    const {id} = useParams()

    useEffect(() => {
        getData()
    }, [])

    async function getData(){
        try {
            const resp = await apiCall(`/get-single-car/${id}`, 'GET', null, false)
            setCarDetails(resp)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.car}>
            <img src={`/images/cars/${carDetails?.image}`} alt={carDetails?.title} />
            <div className={classes.carContent}>
                <p className={classes.carTitle}>{carDetails?.title}</p>
                <div className={classes.otherDetails}>
                    <p>Rating: {carDetails?.rating} rated</p>
                    <p>Price: ${carDetails?.price} per day</p>
                    <p>Transmission: {carDetails?.transmission}</p>
                    <p>Seats: {carDetails?.seats}</p>
                    <p>Fuel: {carDetails?.fuel}</p>
                </div>
                <button className='primary-btn'>Book this car</button>
            </div>
        </div>
    )
}