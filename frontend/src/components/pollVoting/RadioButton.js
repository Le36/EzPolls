import {FaDotCircle, FaCircle} from 'react-icons/fa'
import styles from './RadioButton.module.css'

const RadioButton = ({id, name, value, checked, onChange, label}) => {
    return (
        <div className={styles.radioContainer}>
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={(e) => onChange(e.target.value)}
                className={styles.hiddenInput}
            />
            <label htmlFor={id}>
                {checked ? <FaDotCircle className={styles.radioIcon} /> : <FaCircle className={styles.radioIcon} />}
                {label}
            </label>
        </div>
    )
}

export default RadioButton
