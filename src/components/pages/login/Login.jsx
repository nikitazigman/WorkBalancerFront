import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import "./Login.css";


const LOGIN_URL = "api/token/"

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { setAuth } = useAuth();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const credentials = JSON.stringify({
                username: user,
                password: pwd
            })
            console.log(credentials)
            const response = await axios.post(
                LOGIN_URL,
                credentials,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                },
            );
            console.log(response.data);

            const accessToken = response?.data?.access;
            const refreshToken = response?.data?.refresh;

            setAuth({ user, pwd, accessToken, refreshToken })

            setUser("");
            setPwd("");
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrMsg("No Server Response");
            } else if (error.response?.status === 401) {
                setErrMsg("Wrong credentials");
            } else {
                setErrMsg("Login failed");
            }
            errRef.current.focus();
        }
    }


    return (
        <section className="sign-up">
            <div className="sign-up-header">Login</div>

            <p ref={errRef} className="instructions" aria-live="assertive">{errMsg}</p>

            <form className="sign-up-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    placeholder="username"
                    className="input"
                />
                <input
                    type="password"
                    id="pwdnote"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    placeholder="password"
                    className="input"
                />
                <button disabled={!(user && pwd)} className="sing-up-btn">Sign up</button>
            </form>

            <div className="link-to-sing-in">
                Do not have an account? <Link to="/register">Sign Up</Link>
            </div>

        </section>
    )
}

export default Login
