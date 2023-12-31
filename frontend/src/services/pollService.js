import axios from 'axios'

const BASE_URL = '/api/polls'

const createPoll = async (newPoll, headers) => {
    const response = await axios.post(BASE_URL, newPoll, {headers})
    return response.data
}

const getPoll = async (id, headers) => {
    const response = await axios.get(`${BASE_URL}/${id}`, {headers})
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

const deletePoll = async (id, headers) => {
    const response = await axios.delete(`${BASE_URL}/${id}`, {headers})
    return response.data
}

const pollService = {createPoll, getPoll, votePoll, subscribeToVotes, deletePoll}
export default pollService
