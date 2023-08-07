import React, {useContext} from 'react'
import {ErrorContext} from '../../contexts/ErrorContext'

const ErrorNotification = () => {
    const {errorMessage, setErrorMessage} = useContext(ErrorContext)

    if (!errorMessage) return null

    return (
        <div className="error-notification">
            {errorMessage}
            <button onClick={() => setErrorMessage(null)}>Dismiss</button>
        </div>
    )
}

export default ErrorNotification
