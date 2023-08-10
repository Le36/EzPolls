import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import userService from '../../services/userService'
import {ErrorContext} from '../../contexts/ErrorContext'
import {AuthContext} from '../../contexts/AuthContext'
import ProfileInfo from './ProfileInfo'
import ProfilePolls from './ProfilePolls'
import styles from './UserProfile.module.css'
import Loading from '../layout/Loading'
import PasswordChange from './PasswordChange'
import EmailChange from './EmailChange'

const UserProfile = () => {
    const {username} = useParams()
    const [userProfile, setUserProfile] = useState(null)
    const {setErrorMessage} = useContext(ErrorContext)
    const {authHeader} = useContext(AuthContext)

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const fetchedUserProfile = await userService.getUserProfile(username, authHeader())
                setUserProfile(fetchedUserProfile)
            } catch (error) {
                if (error.response && error.response.data.message) {
                    setErrorMessage(error.response.data.message)
                } else {
                    setErrorMessage('Failed to fetch user profile. Please try again.')
                }
            }
        }

        fetchUserProfile().then()
    }, [username, authHeader, setErrorMessage])

    const handleDeleteSuccess = (pollId) => {
        setUserProfile((userData) => ({
            ...userData,
            polls: userData.polls.filter((p) => p.id !== pollId),
        }))
    }

    const handleEmailChange = (newEmail) => {
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            user: {
                ...prevProfile.user,
                email: newEmail,
            },
        }))
    }

    if (!userProfile) return <Loading />

    return (
        <div className={styles.container}>
            <ProfileInfo user={userProfile.user} />
            <PasswordChange username={username} />
            <EmailChange username={username} handleEmailChange={handleEmailChange}/>
            <ProfilePolls polls={userProfile.polls} onDeleteSuccess={handleDeleteSuccess} />
        </div>
    )
}

export default UserProfile
