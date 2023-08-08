import React from 'react'
import styles from './PollInfo.module.css'

const Id = ({id}) => {
    return (
        <div className={styles.infoItem}>
            <span className={styles.infoLabel}>ID:</span>
            <span>{id}</span>
        </div>
    )
}

export default Id
