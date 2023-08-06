import {useEffect, useState} from 'react'
import styles from './PasswordField.module.css'
import CustomInput from './CustomInput'

const PasswordField = ({setPassword, onValidationChange}) => {
    const [enteredPassword, setEnteredPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const hasUpperCase = /[A-Z]/.test(enteredPassword)
    const hasLowerCase = /[a-z]/.test(enteredPassword)
    const hasNumber = /[0-9]/.test(enteredPassword)
    const isLengthValid = enteredPassword.length >= 8
    const passwordsMatch = enteredPassword === confirmPassword

    useEffect(() => {
        const isValid = hasUpperCase && hasLowerCase && hasNumber && isLengthValid && passwordsMatch
        onValidationChange(isValid)
    }, [
        enteredPassword,
        confirmPassword,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        isLengthValid,
        passwordsMatch,
        onValidationChange,
    ])

    const handlePasswordChange = (e) => {
        setEnteredPassword(e.target.value)
        if (passwordsMatch) {
            setPassword(e.target.value)
        }
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        if (enteredPassword === e.target.value) {
            setPassword(e.target.value)
        }
    }

    return (
        <div>
            <CustomInput
                type="password"
                value={enteredPassword}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
            />
            <CustomInput
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm Password"
                required
            />
            <div className={styles.tipBox}>
                <div className={isLengthValid ? styles.valid : styles.invalid}>Minimum 8 characters</div>
                <div className={hasUpperCase ? styles.valid : styles.invalid}>Contains an uppercase character</div>
                <div className={hasLowerCase ? styles.valid : styles.invalid}>Contains a lowercase character</div>
                <div className={hasNumber ? styles.valid : styles.invalid}>Contains a number</div>
                <div className={passwordsMatch ? styles.valid : styles.invalid}>Passwords match</div>
            </div>
        </div>
    )
}

export default PasswordField
