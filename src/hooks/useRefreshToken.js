import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "./useAuth";

import config from "../configs/config";

const useRefreshToken = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth()

    const refresh = async () => {
        console.log("request refresh token");
        try {
            await axios.post(config.api.refresh_token, {},
                {
                    withCredentials: true
                }
            );

            const response = await axios.get(config.api.user, {
                withCredentials: true
            });

            (response.status % 200 === 0) &&
                setAuth({ user: response.data.username, email: response.data.email })

        } catch (error) {
            console.log("refresh token error:");
            console.log(error);

            navigate(config.links.sign_in, { replace: true });
        }

    }

    return refresh;
}

export default useRefreshToken;