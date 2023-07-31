import React from 'react'
import PollQuestion from './PollQuestion'
import VotingRestriction from './VotingRestriction'
import ResultsList from './ResultsList'
import Loading from './Loading'
import usePoll from '../hooks/UsePoll'

const ViewPoll = () => {
    const poll = usePoll(true)

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
