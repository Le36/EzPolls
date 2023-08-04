import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext'

const Navbar = () => {
    const {userToken, logout, username} = useContext(AuthContext)

    const handleLogout = () => {
        logout()
        localStorage.removeItem('userToken')
    }

    return (
        <nav>
            <Link to="/">Home</Link>
            {!userToken && <Link to="/login">Login</Link>}
            {!userToken && <Link to="/register">Register</Link>}
            {userToken && <Link to={`/users/${username}`}>Profile</Link>}
            {userToken && <button onClick={handleLogout}>Logout</button>}
        </nav>
    )
}

export default Navbar
