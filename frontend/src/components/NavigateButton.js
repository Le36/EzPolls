import React from 'react'
import {useNavigate} from 'react-router-dom'

const NavigateButton = ({to, children}) => {
    const navigate = useNavigate()

    const handleClick = (event) => {
        event.preventDefault()
        navigate(to)
    }

    return (
        <button type="button" onClick={handleClick}>
            {children}
        </button>
    )
}

export default NavigateButton
