import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext'
import {FaBars, FaTimes} from 'react-icons/fa'
import styles from './Navbar.module.css'

const Navbar = () => {
    const {userToken, logout, username} = useContext(AuthContext)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        localStorage.removeItem('userToken')
    }

    const handleToggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <nav className={styles.nav}>
            <button className={styles.burgerButton} onClick={handleToggleMenu}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`${styles.menu} ${isMobileMenuOpen ? styles.open : ''}`}>
                <Link to="/">Home</Link>
                {!userToken && <Link to="/login">Login</Link>}
                {!userToken && <Link to="/register">Register</Link>}
                {userToken && <Link to={`/users/${username}`}>Profile</Link>}
                {userToken && (
                    <Link to="/" onClick={handleLogout}>
                        Logout
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar
