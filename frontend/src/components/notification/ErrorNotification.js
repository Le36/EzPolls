import React, {useContext} from 'react'
import {ErrorContext} from '../../contexts/ErrorContext'
import styles from './ErrorNotification.module.css'
import {FaTimes} from 'react-icons/fa'

const ErrorNotification = () => {
    const {errorMessage, setErrorMessage} = useContext(ErrorContext)

    if (!errorMessage) return null

    return (
        <div className={styles.errorBackdrop}>
            <div className={styles.errorModal}>
                <div className={styles.titleBar}>
                    <span>Error</span>
                    <button className={styles.closeButton} onClick={() => setErrorMessage(null)}>
                        <FaTimes />
                    </button>
                </div>
                <div className={styles.content}>
                    <div className={styles.errorMessage}>{errorMessage}</div>
                    <button className={styles.dismissButton} onClick={() => setErrorMessage(null)}>
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorNotification
