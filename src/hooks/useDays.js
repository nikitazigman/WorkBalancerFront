import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useAxiosPrivate from './useAxiosPrivate';

import config from "../configs/config"

const getTodayDate = () => {
    const date = new Date();
    return date.toISOString().slice(0, 10);
}

const useDays = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [days, setDays] = useState()

    const getToday = async (controller) => {
        const payload = JSON.stringify({ date: getTodayDate() })
        console.log("request today object")

        try {
            const response = await axiosPrivate.post(
                config.api.days,
                payload,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            console.log(response)

            if ((response.status % 200) === 0) {
                return response.data;
            }
        } catch (error) {
            console.log("request today object error:")
            console.log(error)
            if (error.name !== "CanceledError") {
                navigate(config.links.sign_in, { state: { from: location }, replace: true });
            }
        }
    }

    return [{ days }, { getToday }]
}

export { useDays, getTodayDate };