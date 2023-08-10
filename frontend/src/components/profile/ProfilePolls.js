import React from 'react'
import {Link} from 'react-router-dom'
import DeleteButton from '../common/DeleteButton'

const ProfilePolls = ({polls, onDeleteSuccess}) => {
    return (
        <div>
            <h2>Your Polls</h2>
            {polls.map((poll) => (
                <div key={poll.id}>
                    <Link to={`/polls/${poll.id}`}>{poll.question}</Link>
                    <DeleteButton poll={poll} onSuccess={() => onDeleteSuccess(poll.id)} />
                </div>
            ))}
        </div>
    )
}

export default ProfilePolls
