import React, {useEffect, useState} from 'react'
import pollService from '../services/pollService'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import PollQuestion from './PollQuestion'
import VotingRestriction from './VotingRestriction'
import PollOptions from './PollOptions'
import SubmitButton from './SubmitButton'
import Loading from './Loading'

const VotePoll = () => {
	const {id} = useParams()
	const location = useLocation()
	const [poll, setPoll] = useState(location.state?.poll || null)
	const [selectedOption, setSelectedOption] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchPoll = async () => {
			if (!poll) {
				const fetchedPoll = await pollService.getPoll(id)
				setPoll(fetchedPoll)
			}
		}

		fetchPoll()
	}, [id, poll])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (selectedOption == null) {
			alert('Please select an option')
			return
		}

		const updatedPoll = await pollService.votePoll(poll.id, selectedOption)
		setPoll(updatedPoll)
		navigate(`/polls/${id}/results`, {state: {poll}})
	}

	if (!poll) return <Loading />

	return (
		<form onSubmit={handleSubmit}>
			<PollQuestion question={poll.question} />
			<VotingRestriction restriction={poll.votingRestriction} />
			<PollOptions options={poll.options} setSelectedOption={setSelectedOption} />
			<SubmitButton type="submit">Vote</SubmitButton>
		</form>
	)
}

export default VotePoll
