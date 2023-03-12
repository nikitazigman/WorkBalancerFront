import React from "react";
import "./AuthButton.css"

const AuthButton = ({ children, ...props }) => {
    const btnProps = { ...props, className: `auth-btn ${props.className ? props.className : ""}` }
    return (
        <button
            {...btnProps}
        >
            {children}
        </button>
    )
}
export default AuthButton;