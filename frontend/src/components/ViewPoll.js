import React from 'react'
import PollQuestion from './PollQuestion'
import VotingRestriction from './VotingRestriction'
import ResultsList from './ResultsList'
import Loading from './Loading'
import usePoll from '../hooks/UsePoll'
import Author from './Author'

const ViewPoll = () => {
    const poll = usePoll(true)

    if (!poll) return <Loading />

    return (
        <div>
            <PollQuestion question={poll.question} />
            <VotingRestriction restriction={poll.votingRestriction} />
            <Author author={poll.author} />
            <ResultsList options={poll.options} />
        </div>
    )
}

export default ViewPoll
