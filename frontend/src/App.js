import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {ErrorProvider} from './contexts/ErrorContext'
import ErrorNotification from './components/ErrorNotification'
import {AuthProvider} from './contexts/AuthContext'
import Navbar from './components/Navbar'
import NewPoll from './components/NewPoll'
import VotePoll from './components/VotePoll'
import ViewPoll from './components/ViewPoll'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const App = () => {
    return (
        <AuthProvider>
            <ErrorProvider>
                <Router>
                    <div>
                        <Navbar />
                        <h1>EzPolls</h1>
                        <ErrorNotification />
                        <Routes>
                            <Route path="/" element={<NewPoll />} />
                            <Route path="/polls/:id" element={<VotePoll />} />
                            <Route path="/polls/:id/results" element={<ViewPoll />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/register" element={<RegisterForm />} />
                        </Routes>
                    </div>
                </Router>
            </ErrorProvider>
        </AuthProvider>
    )
}

export default App
