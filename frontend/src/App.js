import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import PollContainer from "./components/PollContainer";

const App = () => {
    return (
        <Router>
            <div>
                <h1>EzPolls</h1>
                <PollContainer/>
            </div>
        </Router>
    );
};

export default App;