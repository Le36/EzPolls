import React from 'react'
import styles from './PollInfo.module.css'

const VotingRestriction = ({restriction}) => {
    const formattedRestriction = restriction
        .replace(/_/g, ' ')
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ')

    return (
        <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Voting Restriction:</span>
            <span>{formattedRestriction}</span>
        </div>
    )
}

export default VotingRestriction
