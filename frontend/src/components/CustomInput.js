import styles from './CustomInput.module.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {useState} from 'react'

const CustomInput = ({type = 'text', ...rest}) => {
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
        </div>
    )
}

export default CustomInput
