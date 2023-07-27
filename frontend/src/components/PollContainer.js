import React from 'react';
import {Routes, Route} from 'react-router-dom';
import NewPoll from './NewPoll';
import VotePoll from './VotePoll';

const PollContainer = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<NewPoll/>}/>
                <Route path="/polls/:id" element={<VotePoll/>}/>
            </Routes>
        </div>
    );
};

export default PollContainer;