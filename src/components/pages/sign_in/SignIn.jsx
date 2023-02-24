import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../../../api/axios";
import useInput from "../../../hooks/useInput";
import useAuth from "../../../hooks/useAuth";

import AuthInput from "../../common/auth_input/AuthInput";
import AuthButton from "../../common/auth_btn/AuthButton";
import Info from "../../common/info/Info";

import config from "../../../configs/config"

import "./SignIn.css";


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { setAuth } = useAuth();

    const errRef = useRef();

    const [user, userReset, userAttributes] = useInput("username", "");
    const [email, emailReset, emailAttributes] = useInput("email", "");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");


    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, email])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const credentials = JSON.stringify({
                username: user,
                email: email,
                password: pwd
            })
            console.log(credentials)
            await axios.post(
                config.api.sign_in,
                credentials,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                },
            );

            setAuth({ user, email })
            userReset();
            emailReset();
            setPwd("");
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrMsg("Cannot get response from server. Please try again in a minute.");
            } else if (error.response?.status === 401) {
                setErrMsg("Seems like you provided wrong credentials.");
            } else {
                setErrMsg("Oops. Sign in was failed. I do not know what was the issue.");
            }
            errRef.current.focus();
        }
    }


    return (
        <section className="sign-in-section">
            <div className="sign-in-container">
                <div className="sign-in-header">Hey! Nice to see you again!</div>
                <form className="sign-in-form" onSubmit={handleSubmit}>
                    <AuthInput
                        type="text"
                        id="username"
                        autoComplete="off"
                        {...userAttributes}
                        placeholder="username"
                        valid={true}
                    />
                    <AuthInput
                        type="text"
                        id="email"
                        autoComplete="off"
                        {...emailAttributes}
                        placeholder="email"
                        valid={true}
                    />
                    <AuthInput
                        type="password"
                        id="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        placeholder="password"
                        valid={true}
                    />
                    <AuthButton disabled={!(user && pwd && email)} className="sing-in-btn">Sign in</AuthButton>
                </form>

                <div className="link-to-sing-up">
                    Do not have an account?
                    <Link to={config.links.sign_up} ><strong> Sign Up</strong></Link>
                </div>
            </div>
            <div className="tips-container">
                <Info>{errMsg}</Info>
            </div>

        </section>
    )
}

export default Login
