import React, {createContext, useState} from 'react'

export const NotificationContext = createContext(undefined)

export const NotificationProvider = ({children}) => {
    const [notificationMessage, setNotificationMessage] = useState(null)

    return (
        <NotificationContext.Provider value={{notificationMessage, setNotificationMessage}}>
            {children}
        </NotificationContext.Provider>
    )
}
