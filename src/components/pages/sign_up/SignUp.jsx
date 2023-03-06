import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


import AuthInput from "../../common/auth_input/AuthInput";
import AuthButton from "../../common/auth_btn/AuthButton";
import Info from "../../common/info/Info";
import useAuthAPI from "../../../hooks/useAuthAPI";

import validator from "validator"

import config from "../../../configs/config";
import "./SignUp.css";


const Register = () => {
    const navigate = useNavigate()
    const [apiErrMsg, { signUp }] = useAuthAPI()

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
        const result = await signUp({ user, email, pwd, matchPwd })
        result && navigate(config.links.sign_in, { replace: true })

        setUser("");
        setPwd("");
        setMatchPwd("");
    }

    return (
        <section className="sign-up-section">
            <div className="sing-up-container">
                <div className="sign-up-header">Hey! Nice to meet you!</div>

                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <AuthInput
                        type="text"
                        id="username"
                        onChange={(e) => setUser(e.target.value)}
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        placeholder="username"
                        valid={user && validName}
                    />
                    <AuthInput
                        type="text"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        placeholder="email"
                        valid={email && validEmail}
                    />
                    <AuthInput
                        type="password"
                        id="pwd"
                        onChange={(e) => setPwd(e.target.value)}
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        placeholder="password"
                        valid={pwd && validPwd}

                    />
                    <AuthInput
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        aria-invalid={validMatchPwd ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setMatchPwdFocus(true)}
                        onBlur={() => setMatchPwdFocus(false)}
                        placeholder="confirm password"
                        valid={matchPwd && validMatchPwd}
                    />
                    <AuthButton disabled={!(validName && validPwd && validMatchPwd)} className="sing-up-btn">Sign up</AuthButton>
                </form>
                <div className="link-to-sing-in">
                    Already have an account? <Link to={config.links.sign_in}><strong>Sign In</strong></Link>
                </div>
            </div>
            <div className="tips-container">
                {
                    userFocus && user && !validName &&
                    <Info>
                        4 to 24 characters. Must begin with a letter.
                        Only alphanumeric symbols are allowed.
                    </Info>
                }
                {
                    emailFocus && email && !validEmail &&
                    <Info>
                        Provided email has wrong format. Please correct it.
                    </Info>
                }
                {
                    pwdFocus && pwd && !validPwd &&
                    <Info>
                        8 to 24 characters.
                        Must include uppercase and lowercase letters,
                        a number and a special character.
                        Allowed special characters:
                        <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span>
                        <span aria-label="percent">%</span>
                    </Info>
                }
                {
                    matchPwdFocus && matchPwd && !validMatchPwd &&
                    <Info>
                        Provided passwords are not equal. Please check it out.
                    </Info>
                }
                <Info>{apiErrMsg}</Info>
            </div>


        </section>
    )
}

export default Register
