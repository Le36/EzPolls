import styles from './QuestionInput.module.css'
import CustomInput from '../formElements/CustomInput'
import ToolTip from '../common/ToolTip'
import React from 'react'

const QuestionInput = ({value, onChange}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.questionTitle}>
                Question
                <ToolTip tip="The primary prompt for your poll. Be clear and concise to ensure participants understand what you're asking." />
            </h2>
            <CustomInput type="text" placeholder="Type your question here" value={value} onChange={onChange} required />
        </div>
    )
}

export default QuestionInput
