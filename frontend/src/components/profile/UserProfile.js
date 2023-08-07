import React, {useEffect, useState, useContext} from 'react'
import {Link, useParams} from 'react-router-dom'
import userService from '../../services/userService'
import {ErrorContext} from '../../contexts/ErrorContext'
import {AuthContext} from '../../contexts/AuthContext'
import DeleteButton from '../common/DeleteButton'
import EmailChangeForm from '../auth/EmailChangeForm'
import PasswordChangeForm from '../auth/PasswordChangeForm'

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
            <h2>Your Profile</h2>
            <p>Username: {userProfile.user.username}</p>
            <p>Email: {userProfile.user.email}</p>
            <h2>Your Polls</h2>
            {userProfile.polls.map((poll) => (
                <div key={poll.id}>
                    <Link to={`/polls/${poll.id}`}>{poll.question}</Link>
                    <DeleteButton
                        poll={poll}
                        onSuccess={() =>
                            setUserProfile((userData) => ({
                                ...userData,
                                polls: userData.polls.filter((p) => p.id !== poll.id),
                            }))
                        }
                    />
                </div>
            ))}
            <PasswordChangeForm username={username} />
            <EmailChangeForm username={username} />
        </div>
    )
}

export default UserProfile
