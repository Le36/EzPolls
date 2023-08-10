import React from 'react'
import {Link} from 'react-router-dom'
import DeleteButton from '../formElements/DeleteButton'
import styles from './ProfilePollItem.module.css'

const ProfilePollItem = ({poll, onDeleteSuccess}) => {
    const truncatedQuestion = poll.question.length > 50 ? `${poll.question.slice(0, 50)}...` : poll.question

    return (
        <div className={styles.pollItem}>
            <Link to={`/polls/${poll.id}`} className={styles.pollLink}>
                {truncatedQuestion}
            </Link>
            <DeleteButton poll={poll} onSuccess={() => onDeleteSuccess(poll.id)} />
        </div>
    )
}

export default ProfilePollItem
