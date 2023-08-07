import styles from './CustomInput.module.css'

const CustomInput = ({inputType = 'text', ...rest}) => {
    return (
        <div className={styles.container}>
            <input type={inputType} className={styles.inputField} {...rest} />
        </div>
    )
}

export default CustomInput
