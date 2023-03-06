import { useState } from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";

import config from "../configs/config";
import { faL } from "@fortawesome/free-solid-svg-icons";

const useAuthAPI = () => {

    const [errorMsg, setErrMsg] = useState("")
    const { setAuth } = useAuth();


    const signIn = async ({ user, email, pwd }) => {
        try {
            const credentials = JSON.stringify({
                username: user,
                email: email,
                password: pwd
            })

            const response = await axios.post(
                config.api.sign_in,
                credentials,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                },
            );
            setAuth({ user, email })
            return true
        } catch (error) {
            if (!error?.response) {
                setErrMsg("Cannot get response from server. Please try again in a minute.");
            } else if (error.response?.status === 400) {
                setErrMsg("Seems like you provided wrong credentials.");
            } else {
                setErrMsg("Oops. Sign in was failed. I do not know what was the issue.");
            }
            return false
        }
    };

    const signUp = async ({ user, email, pwd, matchPwd }) => {
        try {
            const credentials = JSON.stringify({
                username: user,
                email: email,
                password1: pwd,
                password2: matchPwd
            });

            const response = await axios.post(
                config.api.sign_up,
                credentials,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                },
            );

            return response.status === 201;

        } catch (error) {
            if (!error?.response) {
                setErrMsg("Cannot get a response from the server. Please try again in several minutes.");
            } else if (error.response.status === 400) {
                if (error.response.data.email) {
                    setErrMsg(error.response.data.email);
                } else if (error.response.data.username) {
                    setErrMsg(error.response.data.username);
                } else if (error.response.data.non_field_errors) {
                    setErrMsg(error.response.data.non_field_errors);
                }
                else {
                    setErrMsg("Seems like provided credentials are not correct.");
                }
                console.log(error.response)
            } else {
                setErrMsg("Oops. Something went wrong. Please try again in several minutes");
            }
            return false
        }
    };
    const logOut = async () => {
        try {
            await axios.post(
                config.api.logout,
                null,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                },
            );
            setAuth({});
            return true;

        } catch (error) {
            setErrMsg("Something goes wrong. Please try again in sever minutes");
            return false
        };
    }

    return [
        errorMsg,
        { signUp, signIn, logOut }
    ]
}

export default useAuthAPI;