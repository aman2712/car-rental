import classes from './SingleCar.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiCall from '../../utils/apiCall'
import Message from '../../components/Message/Message'
import { useNavigate } from 'react-router-dom'

export default function SingleCar(){
    const [carDetails, setCarDetails] = useState()
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        pickup: '',
        dropoff: '',
        start_date: '',
        end_date: '',
        preferences: ''
    })
    const [message, setMessage] = useState({success: false, text: ''})
    const [formVisible, setFormVisible] = useState(false)
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getData()
    }, [])

    async function getData(){
        try {
            const resp = await apiCall(`/car/get-single-car/${id}`, 'GET', null, false)
            setCarDetails(resp)
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async () => {
        setMessage({success: false, text: ''})
        const fieldsNotEmpty = Object.values(data).every(value => value !== "");
        if(!fieldsNotEmpty){
            return setMessage({success: false, text: 'All fields are required'})
        }

        let user = localStorage.getItem('user')
        if(!user){
            return setMessage({success: false, text: 'Please login to continue this operation'})
        }else{
            user = JSON.parse(user)
        }

        try {
            await apiCall('/car/reserve', 'POST', {user_id: user.id, car_id: carDetails.id,...data}, true)
            navigate('/dashboard')
        } catch (error) {
            setMessage({success: false, text: error.message});
        }
    }

    return (
        <div>
            <div className={classes.car}>
                <img src={`/images/cars/${carDetails?.image}`} alt={carDetails?.title} />
                <div className={classes.carContent}>
                    <p className={classes.carTitle}>{carDetails?.title}</p>
                    <div className={classes.otherDetails}>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel cupiditate, iste accusamus molestias esse asperiores voluptatum corrupti, beatae neque maiores perspiciatis atque totam libero quos officia recusandae, excepturi eligendi aspernatur!</p>
                        <p>Rating: {carDetails?.rating} rated</p>
                        <p>Price: ${carDetails?.price} per day</p>
                        <p>Transmission: {carDetails?.transmission}</p>
                        <p>Seats: {carDetails?.seats}</p>
                        <p>Fuel: {carDetails?.fuel}</p>
                    </div>
                    <button className='primary-btn' onClick={() => setFormVisible(!formVisible)}>Book this car</button>
                </div>
            </div>
            {formVisible && (
                <div className={classes.reservation}>
                <p className={classes.formTitle}>Reservation Form</p>
                {message.text.length > 0 && <Message success={message.success} text={message.text} />}
                <div className={classes.form}>
                    <div className={classes.inputGroup}>
                        <p>Name</p>
                        <input
                            type='text'
                            placeholder="Enter your name"
                            value={data.name}
                            onChange={(e) => setData({...data, name: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Email</p>
                        <input
                            type='text'
                            placeholder="Enter your email"
                            value={data.email}
                            onChange={(e) => setData({...data, email: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Phone</p>
                        <input
                            type='text'
                            placeholder="Enter your phone"
                            value={data.phone}
                            onChange={(e) => setData({...data, phone: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Pick Up Location</p>
                        <input
                            type='text'
                            placeholder="XX/X Street, YY Block, 00000"
                            value={data.pickup}
                            onChange={(e) => setData({...data, pickup: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Drop Off Location</p>
                        <input
                            type='text'
                            placeholder="XX/X Street, YY Block, 00000"
                            value={data.dropoff}
                            onChange={(e) => setData({...data, dropoff: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Reservation Start Date</p>
                        <input
                            type='text'
                            placeholder="YYYY-MM-DD"
                            value={data.start_date}
                            onChange={(e) => setData({...data, start_date: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Reservation End Date</p>
                        <input
                            type='text'
                            placeholder="YYYY-MM-DD"
                            value={data.end_date}
                            onChange={(e) => setData({...data, end_date: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Preferences</p>
                        <input
                            type='text'
                            placeholder="Enter any special requirements"
                            value={data.preferences}
                            onChange={(e) => setData({...data, preferences: e.target.value})}
                        />
                    </div>
                </div>
                <button className='primary-btn' onClick={onSubmit}>Book Now!</button>
                </div>
            )}
        </div>
    )
}