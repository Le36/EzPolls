const RevotingAllowedCheckbox = ({checked, onChange}) => {
    return (
        <label>
            Allow revoting:
            <input type="checkbox" checked={checked} onChange={onChange} />
        </label>
    )
}

export default RevotingAllowedCheckbox
