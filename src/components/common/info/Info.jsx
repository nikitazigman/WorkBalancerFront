import React from "react";

import infoIcon from "../../../imgs/info_icon.svg"
import "./Info.css"

const Info = ({ children, ...props }) => {
    return (
        <div className="info-container">
            {
                children &&
                <>
                    <img className="info-icon" src={infoIcon} alt="info" />
                    <p className="info" aria-live="assertive">
                        {children}
                    </p>
                </>
            }

        </div>
    )
}

export default Info;