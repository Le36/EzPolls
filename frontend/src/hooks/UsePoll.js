import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import pollService from '../services/pollService'
import {ErrorContext} from '../contexts/ErrorContext'

const usePoll = () => {
	const {id} = useParams()
	const [poll, setPoll] = useState(null)
	const {setErrorMessage} = useContext(ErrorContext)

	useEffect(() => {
		const fetchPoll = async () => {
			if (!poll) {
				try {
					const fetchedPoll = await pollService.getPoll(id)
					setPoll(fetchedPoll)
				} catch (error) {
					if (error.response && error.response.data.message) {
						setErrorMessage(error.response.data.message)
					} else {
						setErrorMessage('Failed to fetch poll. Please try again.')
					}
				}
			}
		}

		fetchPoll().then()
	}, [id, poll, setErrorMessage])

	useEffect(() => {
		const eventSource = pollService.subscribeToVotes(id, setPoll)

		return () => {
			eventSource.close()
		}
	}, [id])

	return poll
}

export default usePoll
