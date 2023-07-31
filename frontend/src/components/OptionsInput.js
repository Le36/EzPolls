const OptionInputs = ({options, handleOptionChange, addOption}) => {
    return (
        <div>
            <h3>Options</h3>
            {options.map((option, index) => (
                <input key={index} type="text" value={option} onChange={(e) => handleOptionChange(e, index)} />
            ))}
            <button type="button" onClick={addOption}>
                Add Option
            </button>
        </div>
    )
}

export default OptionInputs
