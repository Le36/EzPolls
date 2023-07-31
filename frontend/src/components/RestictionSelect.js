const RestrictionSelect = ({value, onChange}) => {
    return (
        <>
            <h3>Voting Restriction</h3>
            <select value={value} onChange={onChange}>
                <option value="ONE_VOTE_PER_IP">One Vote Per IP</option>
                <option value="ONE_VOTE_PER_USER">One Vote Per User</option>
                <option value="NO_RESTRICTION">No Restriction</option>
            </select>
        </>
    )
}

export default RestrictionSelect
