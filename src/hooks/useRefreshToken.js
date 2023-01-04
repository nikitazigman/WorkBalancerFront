import axios from "../api/axios";
import useAuth from "./useAuth";


const useRefreshToken = () => {
    const { auth, setAuth } = useAuth()


    const refresh = async () => {
        const response = await axios.post(
            "/api/token/refresh/",
            JSON.stringify({ refresh: auth.refreshToken }),
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data);
            return { ...prev, accessToken: response.data.access };
        })
        return response.data.access;
    }

    return refresh;
}

export default useRefreshToken;