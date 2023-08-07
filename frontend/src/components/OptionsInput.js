import CustomInput from './CustomInput'

const OptionInputs = ({options, handleOptionChange, addOption, removeOption}) => {
    return (
        <div>
            <h3>Answer Options</h3>
            {options.map((option, index) => (
                <div key={index}>
                    <CustomInput
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(e, index)}
                        placeholder={`Option ${index + 1}`}
                        onRemove={() => removeOption(index)}
                        showRemove={options.length > 2}
                    />
                </div>
            ))}
            <button type="button" onClick={addOption}>
                Add Option
            </button>
        </div>
    )
}

export default OptionInputs
