import { useRef, useState, useEffect } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";


import "./Login.css";


const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const LOGIN_URL = "api/token/"

const Login = () => {
    const navigate = useNavigate()

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState("")
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState("")
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
    }, [pwd])

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!(USER_REGEX.test(user) && PWD_REGEX.test(pwd))) {
            setErrMsg("invalid Entry")
            return;
        }
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
            )
            console.log(response.data);
            setSuccess(true);
            setUser("");
            setPwd("");
        } catch (error) {
            if (error?.response) {
                setErrMsg("No Server Response");
            } else if (error.response?.status === 400) {
                setErrMsg(error.data);
            } else {
                setErrMsg("Registration failed");
            }
            errRef.current.focus();
        }
    }

    useEffect(() => {
        success && navigate("/")
    }, [success])

    return (
        <section className="sign-up">
            <div className="sign-up-header">Login</div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <form className="sign-up-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    placeholder="username"
                    className={"input " + (userFocus && user && validName ? "" : "invalid")}
                />
                <input
                    type="password"
                    id="pwdnote"
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    placeholder="password"
                    className={"input " + (pwdFocus && pwd && validPwd ? "" : "invalid")}
                />
                <button disabled={!(validName && validPwd)} className="sing-up-btn">Sign up</button>
            </form>
            {
                userFocus && user && !validName &&
                <p id="uidnote" className="instructions">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters. Must begin with a letter.
                    Letters, numbers, underscores, hyphens allowed.
                </p>
            }
            {
                pwdFocus && pwd && !validPwd &&
                <p id="pwdnote" className="instructions">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.
                    Must include uppercase and lowercase letters,
                    a number and a special character.
                    Allowed special characters:
                    <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>
            }
            <div className="link-to-sing-in">
                Do not have an account? <Link to="/register">Sign Up</Link>
            </div>

        </section>
    )
}

export default Login
