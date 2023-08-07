import styles from './CustomInput.module.css'
import {FaEye, FaEyeSlash, FaTimes} from 'react-icons/fa'
import {useState} from 'react'

const CustomInput = ({type = 'text', onRemove, showRemove = false, ...rest}) => {
    const [inputType, setInputType] = useState(type)

    const toggleVisibility = () => {
        setInputType(inputType === 'password' ? 'text' : 'password')
    }

    return (
        <div className={styles.container}>
            <input type={inputType} className={styles.inputField} {...rest} />
            {type === 'password' && (
                <button type="button" className={styles.toggleVisibility} onClick={toggleVisibility}>
                    {inputType === 'password' ? <FaEye /> : <FaEyeSlash />}
                </button>
            )}
            {showRemove && (
                <button type="button" className={styles.removeButton} onClick={onRemove}>
                    <FaTimes />
                </button>
            )}
        </div>
    )
}

export default CustomInput
