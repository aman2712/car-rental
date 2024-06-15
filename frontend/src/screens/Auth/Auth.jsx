import { useState, useEffect } from 'react'
import classes from './Auth.module.css'
import apiCall from '../../utils/apiCall'
import Message from '../../components/Message/Message'
import { useNavigate } from 'react-router-dom'

export default function Auth(){
    const [register, setRegister] = useState(true)
    const [data, setData] = useState({name: '', email: '', password: ''})
    const [message, setMessage] = useState({success: false, text: ''})

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate('/')
        }
    }, [navigate])

    const onSubmit = async () => {
        if(data.email === '' || data.password === ''){
            setMessage({success: false, text: 'All fields are required'})
            return
        }
        if(register && data.name === ''){
            setMessage({success: false, text: 'All fields are required'})
            return
        }
        
        try {
            if(register){
                const resp = await apiCall('/user/register', 'POST', data, false)
                localStorage.setItem('user', JSON.stringify(resp))
            }else{
                const resp = await apiCall('/user/login', 'POST', data, false)
                localStorage.setItem('user', JSON.stringify(resp))
            }
            navigate('/dashboard')
        } catch (error) {
            setMessage({success: false, text: error.message});
        }
    }

    return (
        <div className={classes.auth}>
            <div className={classes.authbox}>
                <p className={classes.authTitle}>{register ? 'Sign Up' : 'Sign In'}</p>
                {message.text.length > 0 && <Message success={message.success} text={message.text} />}
                {register && (
                    <div className={classes.inputGroup}>
                        <p>Name</p>
                        <input
                            type='text'
                            placeholder="Enter your name"
                            value={data.name}
                            onChange={(e) => setData({...data, name: e.target.value})}
                        />
                    </div>
                )}
                <div className={classes.inputGroup}>
                    <p>Email</p>
                    <input
                        type='email'
                        placeholder="Enter your name"
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value})}
                    />
                </div>
                <div className={classes.inputGroup}>
                    <p>Password</p>
                    <input
                        type='password'
                        placeholder="Enter your name"
                        value={data.password}
                        onChange={(e) => setData({...data, password: e.target.value})}
                    />
                </div>
                <button className="primary-btn" onClick={onSubmit}>{register ? 'Sign Up' : 'Sign In'}</button>
                {register ? (
                    <p className={classes.bottomText}>Already have an account? <span onClick={() => setRegister(!register)}>Sign In!</span></p>
                ) : (
                    <p className={classes.bottomText}>Don't have an account? <span onClick={() => setRegister(!register)}>Sign Up!</span></p>
                )}
            </div>
        </div>
    )
}