import React from 'react'
import PollQuestion from '../pollVoting/PollQuestion'
import VotingRestriction from '../pollVoting/VotingRestriction'
import ResultsList from './ResultsList'
import Loading from '../layout/Loading'
import usePoll from '../../hooks/UsePoll'
import Author from '../profile/Author'
import DeleteButton from '../common/DeleteButton'
import NavigateButton from '../layout/NavigateButton'
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
