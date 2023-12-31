import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import userService from '../../services/userService'
import {ErrorContext} from '../../contexts/ErrorContext'
import {NotificationContext} from '../../contexts/NotificationContext'
import PasswordField from './PasswordField'
import SubmitButton from '../formElements/SubmitButton'
import styles from './AuthStyles.module.css'
import CustomInput from '../formElements/CustomInput'

const RegisterForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const {setErrorMessage} = useContext(ErrorContext)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const {setNotificationMessage} = useContext(NotificationContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newUser = {username, password, email}
        try {
            await userService.register(newUser)
            setNotificationMessage('Registration successful.')
            navigate('/login')
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Registration failed. Please try again later.')
            }
        }
    }

    const isFormValid = username !== '' && email !== '' && isPasswordValid

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Register</h2>
            <CustomInput
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <PasswordField setPassword={setPassword} onValidationChange={setIsPasswordValid} />
            <CustomInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <SubmitButton type="submit" disabled={!isFormValid}>
                Register
            </SubmitButton>
        </form>
    )
}

export default RegisterForm
