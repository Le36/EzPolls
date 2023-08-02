import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import userService from '../services/userService'
import {AuthContext} from '../contexts/AuthContext'
import {ErrorContext} from '../contexts/ErrorContext'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {login} = useContext(AuthContext)
    const {setErrorMessage} = useContext(ErrorContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const credentials = {username, password}
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
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm
