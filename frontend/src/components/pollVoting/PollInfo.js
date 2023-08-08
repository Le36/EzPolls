import React, {useState} from 'react'
import VotingRestriction from './VotingRestriction'
import Author from '../profile/Author'
import styles from './PollInfo.module.css'
import ToolTip from '../common/ToolTip'
import {FaChevronDown, FaChevronRight} from 'react-icons/fa'

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
                    <VotingRestriction restriction={poll.votingRestriction} />
                    <Author author={poll.author} />
                </div>
            )}
        </div>
    )
}

export default PollInfo
