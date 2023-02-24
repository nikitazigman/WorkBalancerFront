import React from "react";
import "./AuthInput.css"

const AuthInput = ({ valid, ...props }) => {
    const inputProps = {
        ...props,
        className: `auth-input ${props.className ? props.className : ""} ${valid ? "" : "invalid"}`
    }
    return (
        <input
            autoComplete="off"
            required
            {...inputProps}
        />
    )
}
export default AuthInput;