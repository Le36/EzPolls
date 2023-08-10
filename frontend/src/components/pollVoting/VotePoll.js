import React, {useContext, useEffect, useRef, useState} from 'react'
import pollService from '../../services/pollService'
import {useNavigate} from 'react-router-dom'
import PollQuestion from './PollQuestion'
import PollOptions from './PollOptions'
import SubmitButton from '../formElements/SubmitButton'
import Loading from '../layout/Loading'
import {ErrorContext} from '../../contexts/ErrorContext'
import usePoll from '../../hooks/UsePoll'
import {AuthContext} from '../../contexts/AuthContext'
import DeleteButton from '../common/DeleteButton'
import {NotificationContext} from '../../contexts/NotificationContext'
import NavigateButton from '../layout/NavigateButton'
import ReCaptchaComponent from '../formElements/ReCaptchaComponent'
import styles from './VotePoll.module.css'
import PollInfo from './PollInfo'
import SharePoll from './SharePoll'

const VotePoll = () => {
    const [selectedOptions, setSelectedOptions] = useState([])
    const navigate = useNavigate()
    const {setErrorMessage} = useContext(ErrorContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {poll, userVotes} = usePoll()
    const {authHeader} = useContext(AuthContext)
    const {setNotificationMessage} = useContext(NotificationContext)
    const [recaptchaValue, setRecaptchaValue] = useState(null)
    const captchaRef = useRef(null)

    useEffect(() => {
        if (userVotes) {
            const message = poll.revotingAllowed
                ? 'You have already voted on this poll. You can change your vote.'
                : 'You have already voted on this poll. You cannot change your vote.'
            setNotificationMessage(message)
            setSelectedOptions(userVotes)
        }
    }, [userVotes, setNotificationMessage, poll])

    const handleOptionChange = (optionText) => {
        if (poll.multipleChoicesAllowed) {
            setSelectedOptions(
                selectedOptions.includes(optionText)
                    ? selectedOptions.filter((option) => option !== optionText)
                    : [...selectedOptions, optionText],
            )
        } else {
            setSelectedOptions([optionText])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectedOptions.length === 0) {
            setErrorMessage('Please select an option')
            return
        }

        if (poll.requireRecaptcha && !recaptchaValue) {
            setErrorMessage('Please verify the reCAPTCHA.')
            captchaRef.current.reset()
            return
        }

        setIsSubmitting(true)

        const optionsObject = {
            optionTexts: selectedOptions,
            recaptchaToken: recaptchaValue,
        }

        try {
            await pollService.votePoll(poll.id, optionsObject, authHeader())
            navigate(`/polls/${poll.id}/results`)
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.')
            }
            captchaRef.current.reset()
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!poll) return <Loading />

    const shouldShowCaptcha = poll.requireRecaptcha && (!userVotes || poll.revotingAllowed)

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <PollQuestion question={poll.question} />
            <PollInfo poll={poll} />
            <SharePoll pollId={poll.id} />
            <PollOptions
                options={poll.options}
                selectedOptions={selectedOptions}
                handleOptionChange={handleOptionChange}
                multipleChoicesAllowed={poll.multipleChoicesAllowed}
            />
            {shouldShowCaptcha && <ReCaptchaComponent ref={captchaRef} onCaptchaChange={setRecaptchaValue} />}
            <SubmitButton type="submit" disabled={isSubmitting || (userVotes && !poll.revotingAllowed)}>
                {isSubmitting ? 'Voting...' : 'Vote'}
            </SubmitButton>
            <DeleteButton poll={poll} onSuccess={() => navigate('/')} />
            <NavigateButton to={`/polls/${poll.id}/results`}>Live Results</NavigateButton>
        </form>
    )
}

export default VotePoll
