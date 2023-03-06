import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import useInput from "../../../hooks/useInput";
import useAuthAPI from "../../../hooks/useAuthAPI";

import AuthInput from "../../common/auth_input/AuthInput";
import AuthButton from "../../common/auth_btn/AuthButton";
import Info from "../../common/info/Info";

import config from "../../../configs/config"

import "./SignIn.css";


const Login = () => {
    const navigate = useNavigate();

    const [user, userReset, userAttributes] = useInput("");
    const [email, emailReset, emailAttributes] = useInput("");
    const [pwd, setPwd] = useState("");

    const [errMsg, { signIn }] = useAuthAPI()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn({ user, pwd, email })
        result && navigate(config.links.today, { replace: true });

        setPwd("");
        userReset();
        emailReset();
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
