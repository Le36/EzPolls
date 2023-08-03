import {useContext, useState} from 'react'
import {AuthContext} from '../contexts/AuthContext'
import pollService from '../services/pollService'
import {ErrorContext} from '../contexts/ErrorContext'
import {useNavigate} from 'react-router-dom'
import {NotificationContext} from '../contexts/NotificationContext'

const DeleteButton = ({poll}) => {
    const {username, authHeader} = useContext(AuthContext)
    const {setErrorMessage} = useContext(ErrorContext)
    const {setNotificationMessage} = useContext(NotificationContext)
    const [isDeleting, setIsDeleting] = useState(false)
    const navigate = useNavigate()

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await pollService.deletePoll(poll.id, authHeader())
            setNotificationMessage('Poll deleted successfully')
            navigate(`/`)
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

    if (username !== poll.author) {
        return null
    }

    return (
        <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Poll'}
        </button>
    )
}

export default DeleteButton
