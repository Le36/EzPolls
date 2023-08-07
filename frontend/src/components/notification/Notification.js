import React, {useContext} from 'react'
import {NotificationContext} from '../../contexts/NotificationContext'

const Notification = () => {
    const {notificationMessage, setNotificationMessage} = useContext(NotificationContext)

    if (!notificationMessage) return null

    return (
        <div className="notification">
            {notificationMessage}
            <button onClick={() => setNotificationMessage(null)}>Dismiss</button>
        </div>
    )
}

export default Notification
