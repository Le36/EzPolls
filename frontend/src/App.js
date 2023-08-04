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
import {NotificationProvider} from './contexts/NotificationContext'
import Notification from './components/Notification'
import UserProfile from './components/UserProfile'

const Providers = ({children}) => (
    <AuthProvider>
        <ErrorProvider>
            <NotificationProvider>{children}</NotificationProvider>
        </ErrorProvider>
    </AuthProvider>
)

const App = () => {
    return (
        <Providers>
            <Router>
                <div>
                    <Navbar />
                    <h1>EzPolls</h1>
                    <ErrorNotification />
                    <Notification />
                    <Routes>
                        <Route path="/" element={<NewPoll />} />
                        <Route path="/polls/:id" element={<VotePoll />} />
                        <Route path="/polls/:id/results" element={<ViewPoll />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/users/:username" element={<UserProfile />} />
                    </Routes>
                </div>
            </Router>
        </Providers>
    )
}

export default App
