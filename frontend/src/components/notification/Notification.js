import React, {useContext} from 'react'
import {NotificationContext} from '../../contexts/NotificationContext'
import styles from './Notification.module.css'
import {FaTimes} from 'react-icons/fa'

const Notification = () => {
    const {notificationMessage, setNotificationMessage} = useContext(NotificationContext)

    if (!notificationMessage) return null

    return (
        <div className={styles.notificationBackdrop}>
            <div className={styles.notificationModal}>
                <div className={styles.titleBar}>
                    <span>Notification</span>
                    <button className={styles.closeButton} onClick={() => setNotificationMessage(null)}>
                        <FaTimes />
                    </button>
                </div>
                <div className={styles.content}>
                    <div className={styles.notificationMessage}>{notificationMessage}</div>
                    <button className={styles.dismissButton} onClick={() => setNotificationMessage(null)}>
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Notification
