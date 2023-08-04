import React, {useEffect, useState, useContext} from 'react'
import {Link, useParams} from 'react-router-dom'
import userService from '../services/userService'
import {ErrorContext} from '../contexts/ErrorContext'
import {AuthContext} from '../contexts/AuthContext'

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

    if (!userProfile) return <p>Loading...</p>

    return (
        <div>
            <h2>{userProfile.user.username}'s Profile</h2>
            <h3>Polls created by {userProfile.user.username}:</h3>
            {userProfile.polls.map((poll) => (
                <p key={poll.id}>
                    <Link to={`/polls/${poll.id}`}>{poll.question}</Link>
                </p>
            ))}
        </div>
    )
}

export default UserProfile
