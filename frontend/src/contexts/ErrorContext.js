import React, {createContext, useState} from 'react'

export const ErrorContext = createContext(undefined)

export const ErrorProvider = ({children}) => {
    const [errorMessage, setErrorMessage] = useState(null)

    return <ErrorContext.Provider value={{errorMessage, setErrorMessage}}>{children}</ErrorContext.Provider>
}
