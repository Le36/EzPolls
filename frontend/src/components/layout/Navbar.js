import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import {FaBars} from 'react-icons/fa'
import styles from './Navbar.module.css'
import MobileMenuModal from './MobileMenuModal'
import {FaSquarePollHorizontal} from 'react-icons/fa6'

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

    if (isMobileMenuOpen) {
        return (
            <MobileMenuModal
                onClose={handleToggleMenu}
                userToken={userToken}
                username={username}
                onLogout={handleLogout}
            />
        )
    }

    return (
        <nav className={styles.nav}>
            <h1 className={styles.title}>
                <Link to="/">
                    <FaSquarePollHorizontal className={styles.icon} />
                    EzPolls
                </Link>
            </h1>

            <div className={styles.menuItems}>
                <button className={styles.burgerButton} onClick={handleToggleMenu}>
                    <FaBars />
                </button>
                <div className={styles.menu}>
                    <Link to="/">Home</Link>
                    <Link to="/create">Create</Link>
                    {!userToken && <Link to="/login">Login</Link>}
                    {!userToken && <Link to="/register">Register</Link>}
                    {userToken && <Link to={`/users/${username}`}>Profile</Link>}
                    {userToken && (
                        <Link to="/" onClick={handleLogout}>
                            Logout
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
