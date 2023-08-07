import React, {useState} from 'react'
import {FaQuestionCircle} from 'react-icons/fa'
import styles from './ToolTip.module.css'

const ToolTip = ({tip}) => {
    const [showTip, setShowTip] = useState(false)

    return (
        <div className={styles.tooltipContainer}>
            <FaQuestionCircle
                className={styles.icon}
                onMouseEnter={() => setShowTip(true)}
                onMouseLeave={() => setShowTip(false)}
            />
            {showTip && <div className={styles.tipText}>{tip}</div>}
        </div>
    )
}

export default ToolTip
