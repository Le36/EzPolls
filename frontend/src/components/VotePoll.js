import React, {useContext, useState} from 'react'
import pollService from '../services/pollService'
import {useNavigate} from 'react-router-dom'
import PollQuestion from './PollQuestion'
import VotingRestriction from './VotingRestriction'
import PollOptions from './PollOptions'
import SubmitButton from './SubmitButton'
import Loading from './Loading'
import {ErrorContext} from '../contexts/ErrorContext'
import usePoll from '../hooks/UsePoll'
import {AuthContext} from '../contexts/AuthContext'
import Author from './Author'
import DeleteButton from './DeleteButton'

const VotePoll = () => {
    const [selectedOptions, setSelectedOptions] = useState([])
    const navigate = useNavigate()
    const {setErrorMessage} = useContext(ErrorContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const poll = usePoll()
    const {authHeader} = useContext(AuthContext)

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

        setIsSubmitting(true)

        const optionsObject = {
            optionTexts: selectedOptions,
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
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!poll) return <Loading />

    return (
        <form onSubmit={handleSubmit}>
            <PollQuestion question={poll.question} />
            <VotingRestriction restriction={poll.votingRestriction} />
            <Author author={poll.author} />
            <PollOptions
                options={poll.options}
                selectedOptions={selectedOptions}
                handleOptionChange={handleOptionChange}
                multipleChoicesAllowed={poll.multipleChoicesAllowed}
            />
            <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Voting...' : 'Vote'}
            </SubmitButton>
            <DeleteButton poll={poll} />
        </form>
    )
}

export default VotePoll
