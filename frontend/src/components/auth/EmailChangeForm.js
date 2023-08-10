import {useContext, useState} from 'react'
import userService from '../../services/userService'
import {ErrorContext} from '../../contexts/ErrorContext'
import {NotificationContext} from '../../contexts/NotificationContext'
import {AuthContext} from '../../contexts/AuthContext'
import CustomInput from '../formElements/CustomInput'
import SubmitButton from '../formElements/SubmitButton'
import styles from './AuthStyles.module.css'

const EmailChangeForm = ({username, onEmailChange}) => {
    const [newEmail, setNewEmail] = useState('')
    const {setErrorMessage} = useContext(ErrorContext)
    const {setNotificationMessage} = useContext(NotificationContext)
    const {authHeader} = useContext(AuthContext)

    const handleEmailChange = async (e) => {
        e.preventDefault()
        try {
            const emailObject = {email: newEmail}
            await userService.changeEmail(username, emailObject, authHeader())
            setNotificationMessage('Email changed successfully.')
            onEmailChange(newEmail)
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Failed to fetch user profile. Please try again.')
            }
        }
    }

    return (
        <form onSubmit={handleEmailChange} className={styles.formChange}>
            <CustomInput
                type="email"
                placeholder="New Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
            />
            <SubmitButton type="submit">Change Email</SubmitButton>
        </form>
    )
}

export default EmailChangeForm
