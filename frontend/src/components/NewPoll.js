import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import pollService from '../services/pollService';


const NewPoll = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);
    const [restriction, setRestriction] = useState('ONE_VOTE_PER_IP');

    const handleOptionChange = (e, index) => {
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const poll = {
            question,
            options: options.filter(option => option !== ''),
            votingRestriction: restriction,
        };

        const createdPoll = await pollService.createPoll(poll);

        navigate(`/polls/${createdPoll.id}`, {state: {poll: createdPoll}});
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>New Poll</h2>
            <label>Question:</label>
            <input type="text" value={question} onChange={e => setQuestion(e.target.value)} required/>

            <h3>Options</h3>
            {options.map((option, index) => (
                <input key={index} type="text" value={option} onChange={e => handleOptionChange(e, index)}/>
            ))}
            <button type="button" onClick={addOption}>Add Option</button>

            <h3>Voting Restriction</h3>
            <select value={restriction} onChange={e => setRestriction(e.target.value)}>
                <option value="ONE_VOTE_PER_IP">One Vote Per IP</option>
                <option value="ONE_VOTE_PER_USER">One Vote Per User</option>
                <option value="NO_RESTRICTION">No Restriction</option>
            </select>

            <button type="submit">Submit</button>
        </form>
    );
};

export default NewPoll;