import React from "react";
import { useState, useEffect } from "react";
import moment from "moment/moment";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Task.css';

import edit_icon from "../../../imgs/edit_icon.svg";
import complete_icon from "../../../imgs/complete_icon.svg";
import archived_icon from "../../../imgs/archived_icon.svg";
import info_icon from "../../../imgs/info_icon.svg";


const LEVEL_REGEX = /^[1-9]{1}$/

// function Task({ task, setTasks, onClick, onChange, onSubmit, style, showLevel, ...props }) {
function Task({ task, onChange, onComplete, onArchived, onUpdate }) {

    const [editMode, setEditMode] = useState(false)

    const [validInput, setvValidInput] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    const getOnChange = (event) => {
        editMode && onChange({ [event.target.name]: event.target.value }, task.id)
    }

    useEffect(() => {
        const date = moment(task.deadline, "YYYY-MM-DD", true)

        const is_date_valid = date.isValid()
        const is_level_valid = LEVEL_REGEX.test(String(task.level))

        setvValidInput(is_date_valid && is_level_valid);

        if (!is_date_valid) {
            setErrMsg("The date should have the following format YYYY-MM-DD")
            return
        }

        if (!is_level_valid) {
            setErrMsg("The level should be between 1 and 9")
            return
        }

    }, [task.title, task.level, task.deadline])

    const handleEdit = () => {
        console.log("handle edit button")
        editMode && onUpdate(task.id)
        setEditMode((status) => !status)
    }

    const taskClassName = task.completed ? "task-input task-done" : "task-input"

    console.log(`task active ${editMode}`)
    console.log(`valid input ${validInput}`)

    return (
        <section className="task-section">
            {
                editMode &&
                <div className="tips-container">
                    {
                        !validInput &&
                        <>
                            <img className="info-icon" src={info_icon} alt="info" />
                            {errMsg}
                        </>
                    }

                </div>
            }
            <div className="form-container">
                <div className={"task-container" + ` ${editMode}`}>

                    <div className="title-container">
                        <input
                            type="text"
                            name="title"
                            className={taskClassName}
                            value={task.title}
                            maxLength={149}
                            onChange={getOnChange}
                            required
                        />
                    </div>

                    <div className="task-props-container">
                        <input
                            type="text"
                            name="level"
                            className={taskClassName}
                            value={task.level}
                            onChange={getOnChange}
                            size="1"
                            required
                        />
                        <input
                            type="text"
                            name="deadline"
                            className={taskClassName}
                            value={task.deadline}
                            onChange={getOnChange}
                            size="7"
                            required
                        />
                    </div>

                </div>
                <div className="buttons-container">
                    <button className={"task-btn" + ` ${task.completed}`} onClick={() => onComplete(task.id)}>
                        <img className="task-btn-icon" src={complete_icon} alt="complete" />
                    </button>

                    <button className={"task-btn" + ` ${editMode}`} onClick={handleEdit}>
                        <img className="task-btn-icon" src={edit_icon} alt="edit" />
                    </button>

                    <button className="task-btn" onClick={() => onArchived(task.id)}>
                        <img className="task-btn-icon" src={archived_icon} alt="archived" />
                    </button>
                </div>
            </div>
        </section>
    )
}


export default Task;