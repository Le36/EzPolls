import React, {useContext, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import userService from '../services/userService'
import {AuthContext} from '../contexts/AuthContext'
import {ErrorContext} from '../contexts/ErrorContext'
import ReCaptchaComponent from './ReCaptchaComponent'
import CustomInput from './CustomInput'
import SubmitButton from './SubmitButton'
import styles from './FormStyles.module.css'

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
        <form onSubmit={handleSubmit} className={styles.form}>
            <CustomInput
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <CustomInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <ReCaptchaComponent ref={recaptchaRef} onCaptchaChange={setRecaptchaValue} />
            <SubmitButton type="submit">Login</SubmitButton>
        </form>
    )
}

export default LoginForm
