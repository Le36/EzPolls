import React, {useState} from 'react'
import styles from './CheckboxSlider.module.css'

const CheckboxSlider = ({label, checked: propChecked, onChange}) => {
    const [checked, setChecked] = useState(propChecked)
    const [sliderActive, setSliderActive] = useState(propChecked)

    const handleClick = () => {
        setSliderActive(!sliderActive)

        setTimeout(() => {
            setChecked(!checked)
            onChange()
        }, 300)
    }

    return (
        <div className={styles.container}>
            <span className={styles.label}>{label}</span>
            <div className={styles.checkboxButton} onClick={handleClick}>
                <div className={checked ? styles.sliderActive : styles.slider}></div>
            </div>
        </div>
    )
}

export default CheckboxSlider
