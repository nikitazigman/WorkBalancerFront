import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import validator from "validator"

import axios from "../../../api/axios";
import config from "../../../configs/config";

import "./SignUp.css";


const Register = () => {
    const navigate = useNavigate()

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState("")
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)


    const [pwd, setPwd] = useState("")
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState("")
    const [validMatchPwd, setMatchValidPwd] = useState(false)
    const [matchPwdFocus, setMatchPwdFocus] = useState(false)

    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = validator.isAlphanumeric(user) && (user.length > 3 && user.length < 24)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = validator.isEmail(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = validator.isStrongPassword(pwd)
        setValidPwd(result)
        const match = (pwd === matchPwd)
        setMatchValidPwd(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd, email])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const credentials = JSON.stringify({
                username: user,
                email: email,
                password1: pwd,
                password2: matchPwd
            })
            const response = await axios.post(
                config.api.sign_up,
                credentials,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                },
            )

            if (response.status === 201) {
                setUser("");
                setPwd("");
                setMatchPwd("");
                navigate(config.links.sign_in, { replace: true })
            }
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
            errRef.current.focus();
        }
    }

    return (
        <section className="sign-up-section">
            <div className="sing-up-container">
                <div className="sign-up-header">Hey! Nice to meet you!</div>

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
                        className={"input " + (user && validName ? "" : "invalid")}
                    />
                    <input
                        type="text"
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        placeholder="email"
                        className={"input " + (email && validEmail ? "" : "invalid")}
                    />
                    <input
                        type="password"
                        id="pwd"
                        autoComplete="off"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        placeholder="password"
                        className={"input " + (pwd && validPwd ? "" : "invalid")}
                    />
                    <input
                        type="password"
                        id="confirm_pwd"
                        autoComplete="off"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatchPwd ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setMatchPwdFocus(true)}
                        onBlur={() => setMatchPwdFocus(false)}
                        placeholder="confirm password"
                        className={"input " + (matchPwd && validMatchPwd ? "" : "invalid")}
                    />
                    <button disabled={!(validName && validPwd && validMatchPwd)} className="sing-up-btn">Sign up</button>
                </form>
                <div className="link-to-sing-in">
                    Already have an account? <Link to={config.links.sign_in}><strong>Sign In</strong></Link>
                </div>
            </div>
            <div className="tips-container">
                {
                    userFocus && user && !validName &&
                    <p id="uidnote" className="tips">
                        4 to 24 characters. Must begin with a letter.
                        Only alphanumeric symbols are allowed.
                    </p>
                }
                {
                    emailFocus && email && !validEmail &&
                    <p id="uidemail" className="tips">
                        Provided email has wrong format. Please correct it.
                    </p>
                }
                {
                    pwdFocus && pwd && !validPwd &&
                    <p id="pwdnote" className="tips">
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
                {
                    matchPwdFocus && matchPwd && !validMatchPwd &&
                    <p id="pwdnote" className="tips">
                        Provided passwords are not equal. Please check it out.
                    </p>
                }
                <p ref={errRef} className="tips" aria-live="assertive">{errMsg}</p>
            </div>


        </section>
    )
}

export default Register
