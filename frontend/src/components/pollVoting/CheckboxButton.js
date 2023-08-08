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
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default CheckboxButton
