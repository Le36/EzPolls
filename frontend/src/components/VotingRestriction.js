import React from 'react';

const VotingRestriction = ({restriction}) => {
    return <h3>Voting Restriction: {restriction.replace(/_/g, ' ')}</h3>;
};

export default VotingRestriction;