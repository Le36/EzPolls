import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {ErrorProvider} from './contexts/ErrorContext'
import ErrorNotification from './components/notification/ErrorNotification'
import {AuthProvider} from './contexts/AuthContext'
import Navbar from './components/layout/Navbar'
import NewPoll from './components/pollCreation/NewPoll'
import VotePoll from './components/pollVoting/VotePoll'
import ViewPoll from './components/pollResults/ViewPoll'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import {NotificationProvider} from './contexts/NotificationContext'
import Notification from './components/notification/Notification'
import UserProfile from './components/profile/UserProfile'
import styles from './App.module.css'
import Home from './components/home/Home'
import Footer from './components/layout/Footer'
import Loading from './components/layout/Loading'
import NavbarSlot from './components/layout/NavbarSlot'

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
                <div className={styles.gridContainer}>
                    <Navbar />
                    <NavbarSlot />
                    <ErrorNotification />
                    <Notification />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<NewPoll />} />
                        <Route path="/polls/:id" element={<VotePoll />} />
                        <Route path="/polls/:id/results" element={<ViewPoll />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/users/:username" element={<UserProfile />} />
                        <Route path="*" element={<Loading />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </Providers>
    )
}

export default App
