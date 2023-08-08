import styles from './PollQuestion.module.css'
import ToolTip from '../common/ToolTip'
import React from 'react'

const PollQuestion = ({question}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.questionTitle}>
                Question
                <ToolTip tip="This is the main query of the poll. Please read carefully and provide your response accordingly." />
            </h2>
            <h2 className={styles.question}>{question}</h2>
        </div>
    )
}

export default PollQuestion
