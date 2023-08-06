import React, {useRef, useImperativeHandle} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import styles from './ReCaptchaComponent.module.css'

const ReCaptchaComponent = React.forwardRef((props, ref) => {
    const recaptchaRef = useRef(null)

    const handleCaptchaChange = (value) => {
        if (props.onCaptchaChange) props.onCaptchaChange(value)
    }

    const resetCaptcha = () => {
        if (recaptchaRef.current) {
            recaptchaRef.current.reset()
        }
    }

    useImperativeHandle(ref, () => ({
        reset: resetCaptcha,
    }))

    return (
        <div className={styles.container}>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LevqYUnAAAAAFFG9SrmT5hy-OUKEkZFZDVjDKzP"
                onChange={handleCaptchaChange}
                theme="dark"
                size="compact"
            />
        </div>
    )
})

export default ReCaptchaComponent
