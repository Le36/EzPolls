import {createContext, useEffect, useState} from 'react'
import jwt_decode from 'jwt-decode'

export const AuthContext = createContext(undefined)

export const AuthProvider = ({children}) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || null)
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (userToken) {
            const decoded = jwt_decode(userToken)
            setUsername(decoded.username)

            const currentTime = Date.now() / 1000
            if (decoded.exp < currentTime) {
                logout()
            }
        }
    }, [userToken])

    const login = (token) => {
        localStorage.setItem('userToken', token)
        setUserToken(token)
    }

    const logout = () => {
        localStorage.removeItem('userToken')
        setUserToken(null)
        setUsername('')
    }

    const authHeader = () => {
        return userToken ? {Authorization: `Bearer ${userToken}`} : {}
    }

    return (
        <AuthContext.Provider value={{username, userToken, login, logout, authHeader}}>{children}</AuthContext.Provider>
    )
}
