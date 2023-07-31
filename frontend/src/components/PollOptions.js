const PollOptions = ({options, selectedOptions, handleOptionChange, multipleChoicesAllowed}) => {
    return (
        <div>
            {options.map((option, index) => (
                <div key={index}>
                    <input
                        type={multipleChoicesAllowed ? 'checkbox' : 'radio'}
                        id={option.optionText}
                        name="poll"
                        value={option.optionText}
                        checked={selectedOptions.includes(option.optionText)}
                        onChange={(e) => handleOptionChange(e.target.value)}
                    />
                    <label htmlFor={option.optionText}>{option.optionText}</label>
                </div>
            ))}
        </div>
    )
}

export default PollOptions
