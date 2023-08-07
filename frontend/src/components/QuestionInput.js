import styles from './QuestionInput.module.css'
import CustomInput from './CustomInput'

const QuestionInput = ({value, onChange}) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.questionTitle}>Question</h3>
            <CustomInput type="text" placeholder="Type your question here" value={value} onChange={onChange} required />
        </div>
    )
}

export default QuestionInput
