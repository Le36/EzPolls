import React from 'react'
import PollQuestion from './PollQuestion'
import VotingRestriction from './VotingRestriction'
import ResultsList from './ResultsList'
import Loading from './Loading'
import usePoll from '../hooks/UsePoll'
import Author from './Author'
import DeleteButton from './DeleteButton'
import NavigateButton from './NavigateButton'
import {useNavigate} from 'react-router-dom'

const ViewPoll = () => {
    const {poll} = usePoll(true)
    const navigate = useNavigate()

    if (!poll) return <Loading />

    return (
        <div>
            <PollQuestion question={poll.question} />
            <VotingRestriction restriction={poll.votingRestriction} />
            <Author author={poll.author} />
            <ResultsList options={poll.options} />
            <DeleteButton poll={poll} onSuccess={() => navigate('/')} />
            <NavigateButton to={`/polls/${poll.id}`}>Back to Voting</NavigateButton>
        </div>
    )
}

export default ViewPoll
