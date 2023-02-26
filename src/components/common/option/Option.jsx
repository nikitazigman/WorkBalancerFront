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
                    <span className="option-prop">{task.level}</span>
                    <span className="option-prop">{task.deadline}</span>
                </div>
            </div>
        </section>
    )
}

export default Option;