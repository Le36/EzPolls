import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import userService from '../services/userService'
import {ErrorContext} from '../contexts/ErrorContext'

const RegisterForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const {setErrorMessage} = useContext(ErrorContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newUser = {username, password, email}
        try {
            await userService.register(newUser)
            navigate('/login')
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Registration failed. Please try again later.')
            }
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
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm
