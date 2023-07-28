import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

const createPoll = async (poll) => {
    console.log(poll)
    const response = await axios.post('/api/polls', poll);
    return response.data;
};

const getPoll = async (id) => {
    const response = await axios.get(`/api/polls/${id}`);
    return response.data;
};

const votePoll = async (id, optionText) => {
    const response = await axios.post(`/api/polls/${id}/vote`, {optionText});
    return response.data;
};

const pollService = {createPoll, getPoll, votePoll}
export default pollService;