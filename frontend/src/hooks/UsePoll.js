import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import pollService from '../services/pollService'
import {ErrorContext} from '../contexts/ErrorContext'
import {AuthContext} from '../contexts/AuthContext'

const usePoll = () => {
    const {id} = useParams()
    const [poll, setPoll] = useState(null)
    const [userVotes, setUserVotes] = useState(null)
    const {setErrorMessage} = useContext(ErrorContext)
    const {authHeader} = useContext(AuthContext)

    useEffect(() => {
        const fetchPoll = async () => {
            if (!poll) {
                try {
                    const fetchedPollAndVotes = await pollService.getPoll(id, authHeader())
                    setPoll(fetchedPollAndVotes.poll)
                    setUserVotes(fetchedPollAndVotes.userVotes)
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
    }, [authHeader, id, poll, setErrorMessage])

    useEffect(() => {
        const eventSource = pollService.subscribeToVotes(id, setPoll)

        return () => {
            eventSource.close()
        }
    }, [id])

    return {poll, userVotes}
}

export default usePoll
