import React, {useEffect, useState} from 'react';
import pollService from '../services/pollService';
import {useLocation, useParams} from "react-router-dom";

const VotePoll = () => {
    const {id} = useParams();
    const location = useLocation();
    const [poll, setPoll] = useState(location.state?.poll || null);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const fetchPoll = async () => {
            if (!poll) {
                const fetchedPoll = await pollService.getPoll(id);
                setPoll(fetchedPoll);
            }
        };

        fetchPoll();
    }, [id, poll]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (selectedOption == null) {
            alert('Please select an option');
            return;
        }

        const updatedPoll = await pollService.votePoll(poll.id, selectedOption);
        setPoll(updatedPoll);
    };

    if (!poll) return null;

    return (
        <form onSubmit={handleSubmit}>
            <h2>{poll.question}</h2>

            <h3>Voting Restriction: {poll.votingRestriction.replace('_', ' ')}</h3>

            {poll.options.map((option, index) => (
                <div key={index}>
                    <input type="radio" id={option.optionText} name="poll" value={option.optionText}
                           onChange={e => setSelectedOption(e.target.value)}/>
                    <label htmlFor={option.optionText}>{option.optionText}</label>
                </div>
            ))}

            <button type="submit">Vote</button>
        </form>
    );
};

export default VotePoll;