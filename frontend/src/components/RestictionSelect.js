import styles from './RestrictionSelect.module.css'
import ToolTip from './ToolTip'
import React from 'react'

const RestrictionSelect = ({value, onChange}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.restrictionTitle}>
                Voting Restriction
                <ToolTip tip="Control how participants can vote. Restrict voting based on IP or user account, or set no restrictions at all." />
            </h2>
            <select className={styles.select} value={value} onChange={onChange}>
                <option value="ONE_VOTE_PER_IP">One Vote Per IP</option>
                <option value="ONE_VOTE_PER_USER">One Vote Per User</option>
                <option value="NO_RESTRICTION">No Restriction</option>
            </select>
        </div>
    )
}

export default RestrictionSelect
