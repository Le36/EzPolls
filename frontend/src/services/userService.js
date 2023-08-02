import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/users'

const login = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/login`, credentials)
    return response.data
}

const register = async (newUser) => {
    const response = await axios.post(`${BASE_URL}/register`, newUser)
    return response.data
}

const userService = {login, register}
export default userService