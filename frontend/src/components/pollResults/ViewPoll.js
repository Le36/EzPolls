import React from 'react'
import PollQuestion from '../pollVoting/PollQuestion'
import ResultsList from './ResultsList'
import Loading from '../layout/Loading'
import usePoll from '../../hooks/UsePoll'
import DeleteButton from '../formElements/DeleteButton'
import NavigateButton from '../layout/NavigateButton'
import {useNavigate} from 'react-router-dom'
import styles from './ViewPoll.module.css'
import {CiStreamOn} from 'react-icons/ci'

const ViewPoll = () => {
    const {poll} = usePoll(true)
    const navigate = useNavigate()

    if (!poll) return <Loading />

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                <CiStreamOn className={styles.icon} />
                Live Results
            </h2>
            <PollQuestion question={poll.question} isResultsView={true} />
            <ResultsList options={poll.options} />
            <DeleteButton poll={poll} onSuccess={() => navigate('/')} />
            <NavigateButton to={`/polls/${poll.id}`}>Back to Voting</NavigateButton>
        </div>
    )
}

export default ViewPoll
