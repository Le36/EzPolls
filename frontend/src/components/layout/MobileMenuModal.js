import {Link} from 'react-router-dom'
import styles from './MobileMenuModal.module.css'
import {FaTimes} from 'react-icons/fa'
import React from 'react'

const MobileMenuModal = ({onClose, userToken, username, onLogout}) => {
    return (
        <div className={styles.mobileMenuModal}>
            <button className={styles.closeButton} onClick={onClose}>
                <FaTimes />
            </button>

            <div className={styles.modalLinks}>
                <Link to="/" onClick={onClose}>
                    Home
                </Link>
                <Link to="/create" onClick={onClose}>
                    Create
                </Link>
                {!userToken && (
                    <Link to="/login" onClick={onClose}>
                        Login
                    </Link>
                )}
                {!userToken && (
                    <Link to="/register" onClick={onClose}>
                        Register
                    </Link>
                )}
                {userToken && (
                    <Link to={`/users/${username}`} onClick={onClose}>
                        Profile
                    </Link>
                )}
                {userToken && (
                    <Link
                        to="/"
                        onClick={() => {
                            onLogout()
                            onClose()
                        }}
                    >
                        Logout
                    </Link>
                )}
            </div>
        </div>
    )
}

export default MobileMenuModal
