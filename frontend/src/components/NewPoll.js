import React, {useContext, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import pollService from '../services/pollService'
import QuestionInput from './QuestionInput'
import OptionInputs from './OptionsInput'
import RestrictionSelect from './RestictionSelect'
import SubmitButton from './SubmitButton'
import {ErrorContext} from '../contexts/ErrorContext'
import {AuthContext} from '../contexts/AuthContext'
import Checkbox from './Checkbox'
import ReCaptchaComponent from './ReCaptchaComponent'

const NewPoll = () => {
    const navigate = useNavigate()
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(['', ''])
    const [restriction, setRestriction] = useState('ONE_VOTE_PER_IP')
    const [multipleChoicesAllowed, setMultipleChoicesAllowed] = useState(false)
    const [revotingAllowed, setRevotingAllowed] = useState(false)
    const [requireRecaptcha, setRequireRecaptcha] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {setErrorMessage} = useContext(ErrorContext)
    const {authHeader, userToken} = useContext(AuthContext)
    const [recaptchaValue, setRecaptchaValue] = useState(null)
    const captchaRef = useRef(null)

    const handleOptionChange = (e, index) => {
        const newOptions = [...options]
        newOptions[index] = e.target.value
        setOptions(newOptions)
    }

    const addOption = () => {
        setOptions([...options, ''])
    }

    const removeOption = (indexToRemove) => {
        if (options.length > 2) {
            setOptions(options.filter((_, index) => index !== indexToRemove))
        }
    }

    const validateInputs = () => {
        if (question.trim() === '') {
            setErrorMessage('Question cannot be empty')
            return false
        }

        const nonEmptyOptions = options.filter((option) => option.trim() !== '')

        if (nonEmptyOptions.length < 2) {
            setErrorMessage('Provide at least two options')
            return false
        }

        if (new Set(nonEmptyOptions).size !== nonEmptyOptions.length) {
            setErrorMessage('All options must be unique')
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateInputs()) return

        setIsSubmitting(true)

        const poll = {
            question,
            options: options.filter((option) => option !== ''),
            votingRestriction: restriction,
            multipleChoicesAllowed,
            revotingAllowed,
            requireRecaptcha,
        }

        if (!userToken) {
            poll.recaptchaToken = recaptchaValue
        }

        try {
            const createdPoll = await pollService.createPoll(poll, authHeader())
            navigate(`/polls/${createdPoll.id}`, {state: {poll: createdPoll}})
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a Poll</h2>
            Complete the below fields to create your poll.
            <QuestionInput value={question} onChange={(e) => setQuestion(e.target.value)} />
            <OptionInputs
                options={options}
                handleOptionChange={handleOptionChange}
                addOption={addOption}
                removeOption={removeOption}
            />
            <RestrictionSelect value={restriction} onChange={(e) => setRestriction(e.target.value)} />
            {restriction !== 'NO_RESTRICTION' && (
                <Checkbox
                    label="Allow Revoting:"
                    checked={revotingAllowed}
                    onChange={(e) => setRevotingAllowed(e.target.checked)}
                />
            )}
            <Checkbox
                label="Allow multiple choices:"
                checked={multipleChoicesAllowed}
                onChange={(e) => setMultipleChoicesAllowed(e.target.checked)}
            />
            <Checkbox
                label="Require reCAPTCHA on votes"
                checked={requireRecaptcha}
                onChange={(e) => setRequireRecaptcha(e.target.checked)}
            />
            {!userToken && <ReCaptchaComponent ref={captchaRef} onCaptchaChange={setRecaptchaValue} />}
            <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </SubmitButton>
        </form>
    )
}

export default NewPoll
