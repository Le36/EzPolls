import React from 'react'
import ProfilePollItem from './ProfilePollItem'
import styles from './ProfilePolls.module.css'
import ToolTip from '../common/ToolTip'

const ProfilePolls = ({polls, onDeleteSuccess}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.pollsTitle}>
                Your Polls
                <ToolTip tip="This section displays the list of polls you've created. Click on a poll to view its details, or delete button to remove the poll from the server." />
            </h2>
            {polls.map((poll) => (
                <ProfilePollItem key={poll.id} poll={poll} onDeleteSuccess={onDeleteSuccess} />
            ))}
        </div>
    )
}

export default ProfilePolls
