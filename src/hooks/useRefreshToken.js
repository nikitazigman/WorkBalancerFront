import axios from "../api/axios";
import useAuth from "./useAuth";
import useInput from "./useInput";


const REFRESH_URL = "/api/auth/token/refresh/"
const useRefreshToken = () => {
    const { setAuth } = useAuth()
    const [user, resetUser, userAttrs] = useInput("username", "")

    const refresh = async () => {
        const response = await axios.post(REFRESH_URL, {},
            {
                withCredentials: true
            }
        );

        setAuth(prev => {
            // console.log(JSON.stringify(prev));
            // console.log(response.data);
            return { ...prev, accessToken: response.data.access, user: user };
        })
        return response.data.access;
    }

    return refresh;
}

export default useRefreshToken;