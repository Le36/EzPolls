const MultipleChoicesCheckbox = ({checked, onChange}) => {
	return (
		<label>
			Allow multiple choices:
			<input type="checkbox" checked={checked} onChange={onChange} />
		</label>
	)
}

export default MultipleChoicesCheckbox
