import axios from "axios";
import Config from "../configs/config";

export default axios.create({
    baseURL: Config.base_url
})

export const axiosPrivate = axios.create({
    baseURL: Config.base_url,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
})