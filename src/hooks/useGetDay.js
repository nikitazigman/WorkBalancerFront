import { useLocation, useNavigate } from 'react-router-dom';

import useAxiosPrivate from './useAxiosPrivate';
import axios from '../api/axios';
import useToday from './useToday';
import config from "../configs/config"

const useDays = () => {
    const today = useToday()
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const getToday = async () => {
        try {
            const day_list_response = await axiosPrivate.get(`${config.api.days}?date=${today}`);

            console.log("get list of the days:")
            console.log(day_list_response.data)

            if (day_list_response.data.results?.length > 0) {
                return day_list_response.data.results[0].id
            }

            console.log("there is not today in the list")

            const day_response = await axiosPrivate.post(config.api.days,
                JSON.stringify({ date: today }),
                { headers: { "Content-Type": "application/json" } },
            );

            console.log(`create the day: ${day_response.data}`)

            if (day_response.status === 201) {
                return day_response.data.id
            }

            return NaN

        } catch (error) {
            if (error.name !== "CanceledError") {
                navigate(config.links.sign_in, { state: { from: location }, replace: true });
            }
        }
    }

    return [getToday,]
}

export default useDays;