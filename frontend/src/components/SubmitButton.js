const SubmitButton = ({type, disabled, children}) => {
    return (
        <button type={type} disabled={disabled}>
            {children}
        </button>
    )
}

export default SubmitButton
