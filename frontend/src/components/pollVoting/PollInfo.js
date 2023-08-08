import React, {useState} from 'react'
import VotingRestriction from './VotingRestriction'
import Author from '../profile/Author'
import styles from './PollInfo.module.css'
import ToolTip from '../common/ToolTip'
import {FaChevronDown, FaChevronRight} from 'react-icons/fa'
import Id from './Id'
import InfoItem from './InfoItem'

const PollInfo = ({poll}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpanded = () => {
        setIsExpanded((prevState) => !prevState)
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.infoTitle} ${isExpanded ? styles.expandedTitle : ''}`} onClick={toggleExpanded}>
                Poll Info
                <div>
                    {isExpanded && <ToolTip tip="This section displays detailed information about the poll." />}
                    {isExpanded ? (
                        <FaChevronDown className={styles.arrowIcon} />
                    ) : (
                        <FaChevronRight className={styles.arrowIcon} />
                    )}
                </div>
            </div>
            {isExpanded && (
                <div className={styles.text}>
                    <Id id={poll.id} />
                    <Author author={poll.author} />
                    <VotingRestriction restriction={poll.votingRestriction} />
                    <InfoItem label="Revoting Allowed" value={poll.revotingAllowed} />
                    <InfoItem label="Require reCAPTCHA" value={poll.requireRecaptcha} />
                    <InfoItem label="Multiple Choices Allowed" value={poll.multipleChoicesAllowed} />
                </div>
            )}
        </div>
    )
}

export default PollInfo
