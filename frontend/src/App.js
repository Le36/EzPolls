import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import PollContainer from './components/PollContainer'
import {ErrorProvider} from './contexts/ErrorContext'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
    return (
        <ErrorProvider>
            <Router>
                <div>
                    <h1>EzPolls</h1>
                    <ErrorNotification />
                    <PollContainer />
                </div>
            </Router>
        </ErrorProvider>
    )
}

export default App
