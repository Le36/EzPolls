import React, {useState} from 'react'
import styles from '../pollVoting/PollInfo.module.css'
import ToolTip from '../common/ToolTip'
import {FaChevronDown, FaChevronRight} from 'react-icons/fa'
import EmailChangeForm from '../auth/EmailChangeForm'

const EmailChange = ({username, handleEmailChange}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpanded = () => {
        setIsExpanded((prevState) => !prevState)
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.infoTitle} ${isExpanded ? styles.expandedTitle : ''}`} onClick={toggleExpanded}>
                Change Email
                <div>
                    {isExpanded && <ToolTip tip="Use this form to change your account email." />}
                    {isExpanded ? (
                        <FaChevronDown className={styles.arrowIcon} />
                    ) : (
                        <FaChevronRight className={styles.arrowIcon} />
                    )}
                </div>
            </div>
            {isExpanded && (
                <div className={styles.text}>
                    <EmailChangeForm username={username} onEmailChange={handleEmailChange} />
                </div>
            )}
        </div>
    )
}

export default EmailChange
