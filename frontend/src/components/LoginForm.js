import React, {useContext, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import userService from '../services/userService'
import {AuthContext} from '../contexts/AuthContext'
import {ErrorContext} from '../contexts/ErrorContext'
import ReCaptchaComponent from './ReCaptchaComponent'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {login} = useContext(AuthContext)
    const {setErrorMessage} = useContext(ErrorContext)
    const [recaptchaValue, setRecaptchaValue] = useState(null)
    const recaptchaRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!recaptchaValue) {
            setErrorMessage('Please verify the reCAPTCHA.')
            recaptchaRef.current.reset()
            return
        }
        const credentials = {username, password, recaptcha: recaptchaValue}
        try {
            const jwt = await userService.login(credentials)
            login(jwt)
            navigate('/')
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Login failed. Please check your credentials and try again.')
            }
            setRecaptchaValue(null)
            recaptchaRef.current.reset()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <ReCaptchaComponent ref={recaptchaRef} onCaptchaChange={setRecaptchaValue} />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm
