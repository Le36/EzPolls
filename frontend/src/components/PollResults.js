import React from 'react';

const PollResults = ({poll}) => {
    return (
        <div>
            <h2>{poll.question}</h2>

            <h3>Voting Restriction: {poll.votingRestriction.replace('_', ' ')}</h3>

            <ul>
                {poll.options.map((option, index) => (
                    <li key={index}>
                        {option.optionText}: {option.voteCount} votes
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PollResults;