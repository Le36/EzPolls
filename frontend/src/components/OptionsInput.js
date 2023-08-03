const OptionInputs = ({options, handleOptionChange, addOption, removeOption}) => {
    return (
        <div>
            <h3>Answer Options</h3>
            {options.map((option, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(e, index)}
                        placeholder={`Option ${index + 1}`}
                    />
                    {options.length > 2 && (
                        <button type="button" onClick={() => removeOption(index)}>
                            X
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={addOption}>
                Add Option
            </button>
        </div>
    )
}

export default OptionInputs
