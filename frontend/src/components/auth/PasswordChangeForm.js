import {useContext, useState} from 'react'
import userService from '../../services/userService'
import {ErrorContext} from '../../contexts/ErrorContext'
import {NotificationContext} from '../../contexts/NotificationContext'
import {AuthContext} from '../../contexts/AuthContext'
import SubmitButton from '../formElements/SubmitButton'
import PasswordField from './PasswordField'
import CustomInputIcon from '../formElements/CustomInputIcon'

const PasswordChangeForm = ({username}) => {
    const [passwordChange, setPasswordChange] = useState({oldPassword: '', newPassword: ''})
    const {setErrorMessage} = useContext(ErrorContext)
    const {setNotificationMessage} = useContext(NotificationContext)
    const {authHeader} = useContext(AuthContext)
    const [isPasswordValid, setIsPasswordValid] = useState(false)

    const handlePasswordChange = async (e) => {
        e.preventDefault()
        try {
            await userService.changePassword(username, passwordChange, authHeader())
            setNotificationMessage('Password changed successfully.')
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Failed to fetch user profile. Please try again.')
            }
        }
    }

    return (
        <form onSubmit={handlePasswordChange}>
            <CustomInputIcon
                type="password"
                placeholder="Old password"
                value={passwordChange.oldPassword}
                onChange={(e) => setPasswordChange((prev) => ({...prev, oldPassword: e.target.value}))}
            />
            <PasswordField
                setPassword={(newPassword) => setPasswordChange((prev) => ({...prev, newPassword}))}
                onValidationChange={setIsPasswordValid}
            />
            <SubmitButton type="submit" disabled={!isPasswordValid}>
                Change Password
            </SubmitButton>
        </form>
    )
}

export default PasswordChangeForm
