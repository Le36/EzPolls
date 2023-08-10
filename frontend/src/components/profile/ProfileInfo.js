import React from 'react'
import styles from './ProfileInfo.module.css'
import ToolTip from '../common/ToolTip'
import Username from './Username'
import Email from './Email'

const ProfileInfo = ({user}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.infoTitle}>
                Your Profile
                <ToolTip tip="This section displays your profile information, including your username and email." />
            </h2>
            <Username username={user.username} />
            <Email email={user.email} />
        </div>
    )
}

export default ProfileInfo
