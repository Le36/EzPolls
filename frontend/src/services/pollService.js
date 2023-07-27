import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

const createPoll = async (poll) => {
    const response = await axios.post('/api/polls', poll);
    return response.data;
};

const getPoll = async (id) => {
    const response = await axios.get(`/api/polls/${id}`);
    return response.data;
};

const pollService = {createPoll, getPoll}
export default pollService;