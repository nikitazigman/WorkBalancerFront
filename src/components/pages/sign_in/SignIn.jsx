import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../../../api/axios";
import useInput from "../../../hooks/useInput";
import useAuth from "../../../hooks/useAuth";

import config from "../../../configs/config"

import "./SignIn.css";


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { setAuth } = useAuth();

    const userRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const [user, userReset, userAttributes] = useInput("username", "");
    const [email, emailReset, emailAttributes] = useInput("email", "");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, [])

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
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        {...userAttributes}
                        required
                        placeholder="username"
                        className="input"
                    />
                    <input
                        type="text"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        {...emailAttributes}
                        required
                        placeholder="email"
                        className="input"
                    />
                    <input
                        type="password"
                        id="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        placeholder="password"
                        className="input"
                    />
                    <button disabled={!(user && pwd && email)} className="sing-in-btn">Sign in</button>
                </form>

                <div className="link-to-sing-up">
                    Do not have an account?
                    <Link to={config.links.sign_up} ><strong> Sign Up</strong></Link>
                </div>
            </div>
            <div className="tips-container">
                <p ref={errRef} className="tips" aria-live="assertive">{errMsg}</p>
            </div>

        </section>
    )
}

export default Login
