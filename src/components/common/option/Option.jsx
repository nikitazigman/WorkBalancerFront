import React from "react";

import optionIcon from "./../../../imgs/option-icon.svg"
import "./Option.css"


const Option = ({ task, onClick, ...option }) => {

    const handleOnClick = (event) => {
        onClick(task);
    }

    return (
        <section className="option-section" onClick={handleOnClick}>
            <img src={optionIcon} alt="add task" className="option-image" />
            <div className="option-container">
                <span className="option-title">{task.title}</span>
                <div className="option-props">
                    <div className="option-prop">{task.level}</div>
                    <div className="option-prop">{task.deadline}</div>
                </div>
            </div>
        </section>
    )
}

export default Option;