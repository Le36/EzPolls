import React, {useState} from 'react'
import styles from '../pollVoting/PollInfo.module.css'
import ToolTip from '../common/ToolTip'
import {FaChevronDown, FaChevronRight} from 'react-icons/fa'
import PasswordChangeForm from '../auth/PasswordChangeForm'

const PasswordChange = ({username}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpanded = () => {
        setIsExpanded((prevState) => !prevState)
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.infoTitle} ${isExpanded ? styles.expandedTitle : ''}`} onClick={toggleExpanded}>
                Change Password
                <div>
                    {isExpanded && <ToolTip tip="Use this form to change your account password." />}
                    {isExpanded ? (
                        <FaChevronDown className={styles.arrowIcon} />
                    ) : (
                        <FaChevronRight className={styles.arrowIcon} />
                    )}
                </div>
            </div>
            {isExpanded && (
                <div className={styles.text}>
                    <PasswordChangeForm username={username} />
                </div>
            )}
        </div>
    )
}

export default PasswordChange
