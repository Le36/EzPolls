import React, {useState, useRef} from 'react'
import styles from './SharePoll.module.css'
import ToolTip from '../common/ToolTip'

const SharePoll = ({pollId}) => {
    const [isCopied, setIsCopied] = useState(false)
    const inputRef = useRef(null)

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/polls/${pollId}`)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy link:', err)
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.copyTitle}>
                Share Poll
                <ToolTip tip={"Click 'Copy' to share this poll with others. They can vote and see the results!"} />
            </h2>
            <div className={styles.copyContainer}>
                <input
                    ref={inputRef}
                    value={`${window.location.origin}/polls/${pollId}`}
                    readOnly
                    className={styles.input}
                />
                <button type="button" onClick={handleCopyClick} className={styles.copyButton}>
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </div>
    )
}

export default SharePoll
