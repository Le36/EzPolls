import {createContext, useState} from 'react'

export const AuthContext = createContext(undefined)

export const AuthProvider = ({children}) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || null)

    const login = (token) => {
        localStorage.setItem('userToken', token)
        setUserToken(token)
    }

    const logout = () => {
        localStorage.removeItem('userToken')
        setUserToken(null)
    }

    const authHeader = () => {
        return userToken ? {Authorization: `Bearer ${userToken}`} : {}
    }

    return <AuthContext.Provider value={{userToken, login, logout, authHeader}}>{children}</AuthContext.Provider>
}
