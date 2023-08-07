import React from 'react'
import CheckboxSlider from './CheckboxSlider'
import styles from './PollSettings.module.css'

const PollSettings = ({
    restriction,
    revotingAllowed,
    setRevotingAllowed,
    multipleChoicesAllowed,
    setMultipleChoicesAllowed,
    requireRecaptcha,
    setRequireRecaptcha,
}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.settingsTitle}>Settings</h2>
            <div className={styles.checkboxSetting}>
                {restriction !== 'NO_RESTRICTION' && (
                    <CheckboxSlider label="Allow Revoting:" checked={revotingAllowed} onChange={setRevotingAllowed} />
                )}
            </div>
            <div className={styles.checkboxSetting}>
                <CheckboxSlider
                    label="Allow multiple choices:"
                    checked={multipleChoicesAllowed}
                    onChange={setMultipleChoicesAllowed}
                />
            </div>
            <div className={styles.checkboxSetting}>
                <CheckboxSlider label="Require reCAPTCHA:" checked={requireRecaptcha} onChange={setRequireRecaptcha} />
            </div>
        </div>
    )
}

export default PollSettings
