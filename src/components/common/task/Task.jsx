import React from "react";
import { useState } from "react";

import Info from "../../common/info/Info";
import useTaskValidation from "../../../hooks/useTaskValidation";

import edit_icon from "../../../imgs/edit_icon.svg";
import complete_icon from "../../../imgs/complete_icon.svg";
import archived_icon from "../../../imgs/archived_icon.svg";
import './Task.css';



function Task({ task, onChange, onComplete, onArchived, onUpdate }) {
    const [editMode, setEditMode] = useState(false);
    const errMsg = useTaskValidation(task)

    const getOnChange = (event) => {
        editMode && onChange({ [event.target.name]: event.target.value }, task.id);
    }


    const handleEdit = () => {
        console.log("handle edit button");
        if (editMode && !errMsg) {
            onUpdate(task.id);
            setEditMode((status) => false);
            return
        }

        setEditMode((status) => true);
    }

    const taskClassName = `task-input ${task.completed ? "task-done" : ""} ${editMode ? "input-edit-mode" : ""}`

    return (
        <section className="task-section">
            <div className="form-container">
                <div className={"task-container" + ` ${editMode}`}>

                    <div className="title-container">
                        <input
                            autoComplete="off"
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
                            autoComplete="off"
                            type="text"
                            name="level"
                            className={`${taskClassName} input-level`}
                            value={task.level}
                            onChange={getOnChange}
                            size="1"
                            required
                        />
                        <input
                            autoComplete="off"
                            type="text"
                            name="deadline"
                            className={`${taskClassName} input-deadline`}
                            value={task.deadline}
                            onChange={getOnChange}
                            size="7"
                            required
                        />
                    </div>

                </div>

                <div className="buttons-container">

                    {onComplete &&
                        <button className={"task-btn" + ` ${task.completed}`} onClick={() => onComplete(task.id)}>
                            <img className="task-btn-icon" src={complete_icon} alt="complete" />
                        </button>
                    }
                    {onUpdate &&
                        <button className={"task-btn" + ` ${editMode}`} onClick={handleEdit}>
                            <img className="task-btn-icon" src={edit_icon} alt="edit" />
                        </button>
                    }

                    {onArchived &&
                        <button className="task-btn" onClick={() => onArchived(task.id)}>
                            <img className="task-btn-icon" src={archived_icon} alt="archived" />
                        </button>
                    }

                </div>

            </div>

            {editMode && <Info>{errMsg}</Info>}
        </section>
    )
}


export default Task;