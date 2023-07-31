const SubmitButton = ({type, children, isSubmitting}) => {
	return (
		<button type={type} disabled={isSubmitting}>
			{isSubmitting ? 'Submitting...' : children}
		</button>
	)
}

export default SubmitButton
