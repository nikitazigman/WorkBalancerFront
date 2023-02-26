import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import useTaskValidation from "../../../hooks/useTaskValidation";
import useToday from "../../../hooks/useToday";

import Info from "../../common/info/Info";
import Option from "../../common/option/Option"

import './TaskForm.css';

const test_options = [
    {
        archived: false,
        completed: true,
        days: [422, 431, 429, 427, 430, 423, 428, 424, 425],
        deadline: "1972-12-16",
        id: 7620,
        level: 1,
        title: "test_new_title"
    },
    {
        archived: false,
        completed: false,
        days: [422, 431, 429, 427, 430, 423, 428, 424, 425],
        deadline: "1972-12-11",
        id: 7630,
        level: 3,
        title: "test1_new_title"
    },
    {
        archived: false,
        completed: true,
        days: [422, 431, 429, 427, 430, 423, 428, 424, 425],
        deadline: "1972-12-14",
        id: 7640,
        level: 5,
        title: "test2_new_title asdasdlkajsdkljahsd a asjdha"
    },
    {
        archived: false,
        completed: true,
        days: [422, 431, 429, 427, 430, 423, 428, 424, 425],
        deadline: "1972-12-19",
        id: 7650,
        level: 4,
        title: "test3_new_title"
    }
]

function TaskForm({ showOptions, onCreate, onAdd, ...props }) {
    const EMPTY_TASK = {
        archived: false,
        completed: false,
        deadline: useToday(),
        level: 1,
        title: ""
    }

    const [task, setTask] = useState(EMPTY_TASK);

    const errMsg = useTaskValidation(task)
    const [options, setOptions] = useState(test_options)

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

    const handleOnAdd = (task) => {
        onAdd(task);
        setOptions(options => options.filter(option => option.id != task.id));
    }

    const autocompleteOptions = options.map(option => {
        if (option.title.includes(task.title)) {
            return <Option
                key={option.id}
                task={option}
                onClick={handleOnAdd}
            />
        }
    })

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

            {showOptions && task.title.length > 2 && autocompleteOptions.length > 0 &&
                <div className="options-container">
                    {autocompleteOptions}
                </div>
            }
        </section >
    )
}

export default TaskForm;