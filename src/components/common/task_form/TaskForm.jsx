import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import useTaskValidation from "../../../hooks/useTaskValidation";
import useToday from "../../../hooks/useToday";
import Info from "../../common/info/Info";
import Task from "../../common/task/Task";

import './TaskForm.css';



function TaskForm({ showOptions, onCreate, ...props }) {
    const EMPTY_TASK = {
        archived: false,
        completed: false,
        deadline: useToday(),
        level: 1,
        title: ""
    }

    const [task, setTask] = useState(EMPTY_TASK);

    const errMsg = useTaskValidation(task)
    const [options, setOptions] = useState([])

    const taskOnChange = (event) => {
        setTask(task => {
            return { ...task, [event.target.name]: event.target.value }
        })
    }
    const handleTaskFormAction = (event) => {
        event.preventDefault();

        errMsg.length == 0 && onCreate({ ...task });
        setTask(EMPTY_TASK);
    }

    return (
        <section className="task-form-section">
            <div className="form-container">
                {task.title && task.level && task.deadline && <Info>{errMsg}</Info>}
                <form onSubmit={handleTaskFormAction} className="task-form-container">
                    <input type="submit" hidden />
                    <div className="title-container">
                        <input
                            autoComplete="off"
                            type="text"
                            name="title"
                            className="task-input input-edit-mode"
                            value={task.title}
                            maxLength={149}
                            onChange={taskOnChange}
                            placeholder="Enter title"
                            required
                        />
                    </div>
                    <div className="task-props-container">
                        <input
                            autoComplete="off"
                            type="text"
                            name="level"
                            className="task-input input-level input-edit-mode"
                            value={task.level}
                            onChange={taskOnChange}
                            required
                        />
                        <input
                            autoComplete="off"
                            type="text"
                            name="deadline"
                            className="task-input input-deadline input-edit-mode"
                            value={task.deadline}
                            onChange={taskOnChange}
                            required
                        />
                    </div>
                </form>
            </div>
            <div className="options-container">
                {showOptions && <></>}
            </div>
        </section >
    )
}

export default TaskForm;