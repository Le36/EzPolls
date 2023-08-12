import axios from 'axios'

const BASE_URL = '/api/users'

const login = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/login`, credentials)
    return response.data
}

const register = async (newUser) => {
    const response = await axios.post(`${BASE_URL}/register`, newUser)
    return response.data
}

const getUserProfile = async (username, authHeader) => {
    const response = await axios.get(`${BASE_URL}/${username}`, {headers: authHeader})
    return response.data
}

const changePassword = async (username, passwordChange, authHeader) => {
    const response = await axios.put(`${BASE_URL}/${username}/password`, passwordChange, {headers: authHeader})
    return response.data
}

const changeEmail = async (username, newEmail, authHeader) => {
    const response = await axios.put(`${BASE_URL}/${username}/email`, newEmail, {headers: authHeader})
    return response.data
}

const userService = {login, register, getUserProfile, changePassword, changeEmail}
export default userService
