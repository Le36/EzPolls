import {useContext, useState} from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import pollService from '../../services/pollService'
import {ErrorContext} from '../../contexts/ErrorContext'
import {NotificationContext} from '../../contexts/NotificationContext'
import styles from './SubmitButton.module.css'

const DeleteButton = ({poll, onSuccess}) => {
    const {username, authHeader} = useContext(AuthContext)
    const {setErrorMessage} = useContext(ErrorContext)
    const {setNotificationMessage} = useContext(NotificationContext)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this poll?')) {
            setIsDeleting(true)
            try {
                await pollService.deletePoll(poll.id, authHeader())
                setNotificationMessage('Poll deleted successfully')
                if (onSuccess) onSuccess()
            } catch (error) {
                if (error.response && error.response.data.message) {
                    setErrorMessage(error.response.data.message)
                } else {
                    setErrorMessage('An unexpected error occurred. Please try again.')
                }
            } finally {
                setIsDeleting(false)
            }
        }
    }

    if (username !== poll.author) {
        return null
    }

    return (
        <button type="button" className={styles.button} onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Poll'}
        </button>
    )
}

export default DeleteButton
