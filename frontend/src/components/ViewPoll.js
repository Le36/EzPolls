import React, {useState, useEffect} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import pollService from '../services/pollService'
import PollQuestion from './PollQuestion'
import VotingRestriction from './VotingRestriction'
import ResultsList from './ResultsList'
import Loading from './Loading'

const ViewPoll = () => {
	const {id} = useParams()
	const location = useLocation()
	const [poll, setPoll] = useState(location.state?.poll || null)

	useEffect(() => {
		const fetchPoll = async () => {
			if (!poll) {
				const fetchedPoll = await pollService.getPoll(id)
				setPoll(fetchedPoll)
			}
		}

		fetchPoll()
	}, [id, poll])

	useEffect(() => {
		const eventSource = pollService.subscribeToVotes(id, setPoll)

		return () => {
			eventSource.close()
		}
	}, [id])

	if (!poll) return <Loading />

	return (
		<div>
			<PollQuestion question={poll.question} />
			<VotingRestriction restriction={poll.votingRestriction} />
			<ResultsList options={poll.options} />
		</div>
	)
}

export default ViewPoll
