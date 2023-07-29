const QuestionInput = ({value, onChange}) => {
    return (
        <>
            <label>Question:</label>
            <input type="text" value={value} onChange={onChange} required/>
        </>
    );
};

export default QuestionInput;