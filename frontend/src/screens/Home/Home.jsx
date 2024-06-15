import { useEffect, useState } from 'react'
import classes from './Home.module.css'
import apiCall from '../../utils/apiCall.js'
import { useNavigate } from 'react-router-dom'

export default function Home(){
    const [cars, setCars] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const navigate = useNavigate()

    async function getData(){
        try {
            const resp = await apiCall('/car/get-cars', 'GET', null, false)
            setCars(resp)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.home}>
            {/* banner section */}
            <div className={classes.banner}>
                <div className={classes.bannerContent}>
                    <p className={classes.bannerTitle}>The <span>finest</span> car rental in city</p>
                    <p className={classes.bannerDesc}>Lorem ipsum dolor sit amet adipisicing elit. Architecto animi veniam vero atque alias magnam</p>
                    <button className='primary-btn'>Explore Fleet</button>
                </div>
                <div className={classes.bannerImg}>
                    <img src='/images/banner-img.jpg' alt='Banner | car rentals' />
                </div>
            </div>
            {/* about section */}
            <div className={classes.section} id='about'>
                <img src='/images/about-bg.jpg' alt='About background' />
                <div className={classes.sectionContent}>
                    <div className={classes.topTitle}>
                        <p>About Us</p>
                        <span></span>
                    </div>
                    <p className={classes.sectionTitle}>We provide <span>convenient</span> and <span>affordable</span> car rentals</p>
                    <p className={classes.sectionDesc}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam voluptatum voluptates accusantium laudantium. Officiis aut, quod earum reiciendis enim saepe ut a. Corrupti reprehenderit laborum optio velit porro hic eius?</p>
                    <button className='primary-btn'>Learn more</button>
                </div>
            </div>
            {/* fleet */}
            <div className={classes.fleet} id='fleet'>
                <div className={classes.topTitle}>
                    <p>Fleet</p>
                    <span></span>
                </div>
                <p className={classes.sectionTitle}>Explore our <span>amazing</span> fleet</p>
                <div className={classes.fleetCars}>
                    {cars.map(car => (
                        <div className={classes.fleetCar} key={car.id} onClick={() => navigate(`/fleet/${car.id}`)}>
                        <img src={`/images/cars/${car.image}`} alt='Hector' />
                        <p>{car.title}</p>
                    </div>
                    ))}
                </div>
            </div>
            {/* contact */}
            <div className={`${classes.section} ${classes.contact}`} id='contact'>
                <div className={classes.sectionContent}>
                    <div className={classes.topTitle}>
                        <p>Contact Us</p>
                        <span></span>
                    </div>
                    <p className={classes.sectionTitle}>Get all your <span>queries</span> easily resolved with us</p>
                    <p className={classes.sectionDesc}>+91 3478237423 • rentalspvt@gmail.com</p>
                    <div className={classes.contactForm}>
                        <div className={classes.inputGroup}>
                            <p>Name</p>
                            <input type='text' placeholder='Enter your name..' />
                        </div>
                        <div className={classes.inputGroup}>
                            <p>Email</p>
                            <input type='text' placeholder='Enter your email..' />
                        </div>
                        <div className={classes.inputGroup}>
                            <p>Message</p>
                            <input type='text' placeholder='Enter your message..' />
                        </div>
                        <button className='primary-btn'>Send Message</button>
                    </div>
                </div>
                <img src='/images/contact-bg.jpg' alt='About background' />
            </div>
        </div>
    )
}