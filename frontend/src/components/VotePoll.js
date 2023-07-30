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
	const [selectedOptions, setSelectedOptions] = useState([])
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
			alert('Please select an option')
			return
		}

		const optionsObject = {
			optionTexts: selectedOptions,
		}

		const updatedPoll = await pollService.votePoll(poll.id, optionsObject)
		setPoll(updatedPoll)
		navigate(`/polls/${id}/results`, {state: {poll}})
	}

	if (!poll) return <Loading />

	return (
		<form onSubmit={handleSubmit}>
			<PollQuestion question={poll.question} />
			<VotingRestriction restriction={poll.votingRestriction} />
			<PollOptions
				options={poll.options}
				selectedOptions={selectedOptions}
				handleOptionChange={handleOptionChange}
				multipleChoicesAllowed={poll.multipleChoicesAllowed}
			/>
			<SubmitButton type="submit">Vote</SubmitButton>
		</form>
	)
}

export default VotePoll
