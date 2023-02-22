
import { useLocation, useNavigate } from 'react-router-dom';

import useAxiosPrivate from './useAxiosPrivate';
import axios from '../api/axios';
import useToday from './useToday';
import config from "../configs/config"

const useTasks = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const checkError = (error) => {
        if (error.name !== "CanceledError") {
            navigate(config.links.sign_in, { state: { from: location }, replace: true });
        }
    }

    const getTasks = async (day, completed) => {
        try {
            day = day ? day : "";
            completed = completed ? completed : ""

            const tasks_list_response = await axiosPrivate.get(`${config.api.tasks}?days=${day}&completed=${completed}`);
            return tasks_list_response.data

        } catch (error) {
            checkError(error)
        }
    }

    return [getTasks,]
}

export default useTasks;