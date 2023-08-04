import {useContext, useState} from 'react'
import userService from '../services/userService'
import {ErrorContext} from '../contexts/ErrorContext'
import {NotificationContext} from '../contexts/NotificationContext'
import {AuthContext} from '../contexts/AuthContext'

const EmailChangeForm = ({username}) => {
    const [newEmail, setNewEmail] = useState('')
    const {setErrorMessage} = useContext(ErrorContext)
    const {setNotificationMessage} = useContext(NotificationContext)
    const {authHeader} = useContext(AuthContext)

    const handleEmailChange = async (e) => {
        e.preventDefault()
        try {
            const emailObject = {email: newEmail}
            const user = await userService.changeEmail(username, emailObject, authHeader())
            setNotificationMessage('Email changed successfully.')
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Failed to fetch user profile. Please try again.')
            }
        }
    }

    return (
        <form onSubmit={handleEmailChange}>
            <input
                type="email"
                placeholder="New email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
            />
            <button type="submit">Change Email</button>
        </form>
    )
}

export default EmailChangeForm
