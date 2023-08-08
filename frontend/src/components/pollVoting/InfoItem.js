import React from 'react'
import styles from './PollInfo.module.css'

const InfoItem = ({label, value}) => {
    return (
        <div className={styles.infoItem}>
            <span className={styles.infoLabel}>{label}:</span>
            <span>{value ? 'Yes' : 'No'}</span>
        </div>
    )
}

export default InfoItem
