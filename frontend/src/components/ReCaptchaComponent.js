import React, {useRef, useImperativeHandle} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

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
        <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LevqYUnAAAAAFFG9SrmT5hy-OUKEkZFZDVjDKzP"
            onChange={handleCaptchaChange}
        />
    )
})

export default ReCaptchaComponent
