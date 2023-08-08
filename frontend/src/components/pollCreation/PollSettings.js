import React from 'react'
import CheckboxSlider from '../formElements/CheckboxSlider'
import styles from './PollSettings.module.css'
import ToolTip from '../common/ToolTip'

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
            <h2 className={styles.settingsTitle}>
                Settings
                <ToolTip tip="Fine-tune the behavior of your poll. Set options like revoting, multiple choices, or add security measures like reCAPTCHA." />
            </h2>
            <div className={styles.checkboxSetting}>
                {restriction !== 'NO_RESTRICTION' && (
                    <CheckboxSlider
                        label="Allow revoting:"
                        checked={revotingAllowed}
                        onChange={(value) => setRevotingAllowed(value)}
                    />
                )}
            </div>
            <div className={styles.checkboxSetting}>
                <CheckboxSlider
                    label="Allow multiple choices:"
                    checked={multipleChoicesAllowed}
                    onChange={(value) => setMultipleChoicesAllowed(value)}
                />
            </div>
            <div className={styles.checkboxSetting}>
                <CheckboxSlider
                    label="Require reCAPTCHA:"
                    checked={requireRecaptcha}
                    onChange={(value) => setRequireRecaptcha(value)}
                />
            </div>
        </div>
    )
}

export default PollSettings
