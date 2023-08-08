import {FaCheckSquare, FaSquare} from 'react-icons/fa'
import styles from './CheckboxButton.module.css'

const CheckboxButton = ({id, name, value, checked, onChange, label}) => {
    return (
        <div className={styles.checkboxContainer}>
            <input
                type="checkbox"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={(e) => onChange(e.target.value)}
                className={styles.hiddenInput}
            />
            <label htmlFor={id}>
                {checked ? (
                    <FaCheckSquare className={styles.checkboxIcon} />
                ) : (
                    <FaSquare className={styles.checkboxIcon} />
                )}
                {label}
            </label>
        </div>
    )
}

export default CheckboxButton
