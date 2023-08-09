import styles from './PollQuestion.module.css'
import ToolTip from '../common/ToolTip'
import React from 'react'

const PollQuestion = ({question, isResultsView}) => {
    const defaultTip =
        'This is the main query of the poll. Please read carefully and provide your response accordingly.'
    const resultsTip =
        'This is the main question that users voted on. The question provides context for the vote options and results shown below.'

    return (
        <div className={styles.container}>
            <h2 className={styles.questionTitle}>
                Question
                <ToolTip tip={isResultsView ? resultsTip : defaultTip} />
            </h2>
            <h2 className={styles.question}>{question}</h2>
        </div>
    )
}

export default PollQuestion
