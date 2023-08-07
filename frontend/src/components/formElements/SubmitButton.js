import styles from './SubmitButton.module.css'

const SubmitButton = ({type, disabled, children}) => {
    return (
        <button className={styles.button} type={type} disabled={disabled}>
            {children}
        </button>
    )
}

export default SubmitButton
