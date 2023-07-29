import React, {useState, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import pollService from '../services/pollService';
import PollResults from "./PollResults";

const ViewPoll = () => {
    const {id} = useParams();
    const location = useLocation();
    const [poll, setPoll] = useState(location.state?.poll || null);

    useEffect(() => {
        const fetchPoll = async () => {
            if (!poll) {
                const fetchedPoll = await pollService.getPoll(id);
                setPoll(fetchedPoll);
            }
        };

        fetchPoll();
    }, [id, poll]);

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:8080/api/polls/${id}/votes`);

        eventSource.onmessage = event => {
            const updatedPoll = JSON.parse(event.data);
            setPoll(updatedPoll);
        };

        return () => {
            eventSource.close();
        };
    }, [id]);

    if (!poll) return null;

    return <PollResults poll={poll}/>;
};

export default ViewPoll;