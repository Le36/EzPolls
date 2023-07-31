import React from 'react'
import {Routes, Route} from 'react-router-dom'
import NewPoll from './NewPoll'
import VotePoll from './VotePoll'
import ViewPoll from './ViewPoll'

const PollContainer = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<NewPoll />} />
                <Route path="/polls/:id" element={<VotePoll />} />
                <Route path="/polls/:id/results" element={<ViewPoll />} />
            </Routes>
        </div>
    )
}

export default PollContainer
