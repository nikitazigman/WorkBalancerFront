import React, { useEffect, useState } from "react";

import useTasks from "../../../hooks/useTasks"
import { getTodayDate } from "../../../hooks/useDays";
import useTaskValidation from "../../../hooks/useTaskValidation";

import Info from "../../common/info/Info";
import Option from "../../common/option/Option"

import './TaskForm.css';


function TaskForm({ backlogTasks, onCreate, onAdd, today, ...props }) {
    const EMPTY_TASK = {
        archived: false,
        completed: false,
        deadline: getTodayDate(),
        level: 1,
        title: "",
        days: []
    }

    const options = backlogTasks || [];

    const [task, setTask] = useState(EMPTY_TASK);
    const errMsg = useTaskValidation(task)

    const taskOnChange = (event) => {
        setTask(task => {
            return { ...task, [event.target.name]: event.target.value }
        })
    }
    const handleTaskFormAction = (event) => {
        event.preventDefault();

        const new_task = options.length > 0 ? { ...task, days: [today.id] } : task;
        errMsg.length == 0 && onCreate(new_task);
        setTask(EMPTY_TASK);
    }

    const autocompleteOptions = options
        .filter(
            option => option.title.includes(task.title)
        )
        .map(
            option => {
                return <Option
                    key={option.id}
                    task={option}
                    onClick={onAdd}
                />
            }
        )

    return (
        <section className="task-form-section">
            <div className="form-container">
                {task.title && task.level && task.deadline && <Info>{errMsg}</Info>}
                <form onSubmit={handleTaskFormAction} className={`task-form-container  ${options.length > 0 ? "" : "without-options"}`}>
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

            {
                options.length > 0 && task.title.length > 2 && autocompleteOptions.length > 0 &&
                <div className="options-container">
                    {autocompleteOptions}
                </div>
            }
        </section >
    )
}

export default TaskForm;