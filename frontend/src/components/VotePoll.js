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
    };

    if (!poll) return null;

    return (
        <form onSubmit={handleSubmit}>
            <h2>{poll.question}</h2>

            {poll.options.map((option, index) => (
                <div key={index}>
                    <input type="radio" id={option} name="poll" value={index}
                           onChange={() => setSelectedOption(index)}/>
                    <label htmlFor={option}>{option}</label>
                </div>
            ))}

            <button type="submit">Vote</button>
        </form>
    );
};

export default VotePoll;