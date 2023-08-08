import React from 'react'
import styles from '../pollVoting/PollInfo.module.css'

const Author = ({author}) => {
    return (
        author && (
            <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Author:</span>
                <span>{author}</span>
            </div>
        )
    )
}

export default Author
