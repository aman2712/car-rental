import { useState } from 'react'
import classes from './NewListing.module.css'
import Message from '../../components/Message/Message'
import apiCall from '../../utils/apiCall'
import { useNavigate } from 'react-router-dom'

export default function NewListing(){
    const [message, setMessage] = useState({success: false, text: ''})
    const [data, setData] = useState({
        title: '',
        image: '',
        type: '',
        rating: '',
        price: '',
        transmission: '',
        seats: '',
        fuel: ''
    })

    const navigate = useNavigate()

    async function onSubmit(){
        setMessage({success: false, text: ''})
        const fieldsNotEmpty = Object.values(data).every(value => value !== "");
        if(!fieldsNotEmpty){
            return setMessage({success: false, text: 'All fields are required'})
        }

        try {
            await apiCall('/car/add-car', 'POST', data, true)
            navigate('/admin-dashboard')
        } catch (error) {
            setMessage({success: false, text: error.message});
        }
    }
    return (
        <div className={classes.newListing}>
            <p className={classes.title}>Add a new listing</p>
            <div className={classes.newListingForm}>
                {message.text.length > 0 && <Message success={message.success} text={message.text} />}
                <div className={classes.form}>
                    <div className={classes.inputGroup}>
                        <p>Title</p>
                        <input
                            type='text'
                            placeholder="Enter car name"
                            value={data.title}
                            onChange={(e) => setData({...data, title: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Image</p>
                        <input
                            type='text'
                            placeholder="Enter car image path"
                            value={data.image}
                            onChange={(e) => setData({...data, image: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Type</p>
                        <input
                            type='text'
                            placeholder="Enter car type"
                            value={data.type}
                            onChange={(e) => setData({...data, type: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Rating</p>
                        <input
                            type='text'
                            placeholder="Enter car rating"
                            value={data.rating}
                            onChange={(e) => setData({...data, rating: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Price</p>
                        <input
                            type='text'
                            placeholder="Enter per day price"
                            value={data.price}
                            onChange={(e) => setData({...data, price: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Transmission</p>
                        <input
                            type='text'
                            placeholder="Enter car transmission type"
                            value={data.transmission}
                            onChange={(e) => setData({...data, transmission: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Seats</p>
                        <input
                            type='text'
                            placeholder="Enter number of seats"
                            value={data.seats}
                            onChange={(e) => setData({...data, seats: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <p>Fuel</p>
                        <input
                            type='text'
                            placeholder="Enter car fuel type"
                            value={data.fuel}
                            onChange={(e) => setData({...data, fuel: e.target.value})}
                        />
                    </div>
                </div>
                <button className='primary-btn' onClick={onSubmit}>Add It!</button>
            </div>
        </div>
    )
}