import React from 'react'
import {useNavigate} from 'react-router-dom'
import styles from '../formElements/SubmitButton.module.css'

const NavigateButton = ({to, children}) => {
    const navigate = useNavigate()

    const handleClick = (event) => {
        event.preventDefault()
        navigate(to)
    }

    return (
        <button className={styles.button} type="button" onClick={handleClick}>
            {children}
        </button>
    )
}

export default NavigateButton
