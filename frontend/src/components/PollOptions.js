const PollOptions = ({options, setSelectedOption}) => {
	return (
		<div>
			{options.map((option, index) => (
				<div key={index}>
					<input
						type="radio"
						id={option.optionText}
						name="poll"
						value={option.optionText}
						onChange={(e) => setSelectedOption(e.target.value)}
					/>
					<label htmlFor={option.optionText}>{option.optionText}</label>
				</div>
			))}
		</div>
	)
}

export default PollOptions
