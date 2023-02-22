import axios from "../api/axios";
import useAuth from "./useAuth";
import useInput from "./useInput";

import config from "../configs/config";

const useRefreshToken = () => {
    const { setAuth } = useAuth()
    const [user, resetUser, userAttrs] = useInput("username", "")

    const refresh = async () => {
        const response = await axios.post(config.api.refresh_token, {},
            {
                withCredentials: true
            }
        );

        setAuth(prev => {
            return { ...prev, accessToken: response.data.access, user: user };
        })
        return response.data.access;
    }

    return refresh;
}

export default useRefreshToken;