const QuestionInput = ({value, onChange}) => {
    return (
        <div>
            <label>Question</label>
            <input type="text" placeholder="Type your question here" value={value} onChange={onChange} required />
        </div>
    )
}

export default QuestionInput
