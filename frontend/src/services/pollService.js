import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/polls'

const createPoll = async (newPoll, headers) => {
    const response = await axios.post(BASE_URL, newPoll, {headers})
    return response.data
}

const getPoll = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
}

const votePoll = async (id, optionTexts, headers) => {
    const response = await axios.post(`${BASE_URL}/${id}/vote`, optionTexts, {headers})
    return response.data
}

const subscribeToVotes = (id, callback) => {
    const eventSource = new EventSource(`${BASE_URL}/${id}/votes`)

    eventSource.onmessage = (event) => {
        const updatedPoll = JSON.parse(event.data)
        callback(updatedPoll)
    }

    return eventSource
}

const pollService = {createPoll, getPoll, votePoll, subscribeToVotes}
export default pollService
