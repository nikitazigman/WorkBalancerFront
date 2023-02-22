import React from "react";
import { useState, useEffect } from "react";
import moment from "moment/moment";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Task.css';

const TITLE_REGEX = /^[a-zA-Z0-9 ]{0,40}$/
const LEVEL_REGEX = /^[1-9]{1}$/

// function Task({ task, setTasks, onClick, onChange, onSubmit, style, showLevel, ...props }) {
function Task() {
    const task = {
        archived: false,
        completed: true,
        days: [422, 431, 429, 427, 430, 423, 428, 424, 425],
        deadline: "1972-12-16",
        id: 762,
        level: 1,
        title: "test_new_title"
    }

    const onChange = (name, id) => { console.log(`changing ${name} ${id}`) }
    const onComplete = (name, id) => { console.log(`completing ${name} ${id}`) }
    const onArchived = (id) => { console.log(`archiving ${id}`) }
    const onUpdate = (id) => { console.log(`updating ${id}`) }



    const [disabled, setDisabled] = useState(true)

    const [validTitle, setValidTitle] = useState(true);
    const [titleFocus, setTitleFocus] = useState(false);

    const [validLevel, setValidLevel] = useState(true);
    const [levelFocus, setLevelFocus] = useState(false);

    const [validDeadline, setValidDeadline] = useState(true);
    const [deadlineFocus, setDeadlineFocus] = useState(false);


    useEffect(() => {
        const result = TITLE_REGEX.test(task.title)
        setValidTitle(result);
    }, [task.title])

    useEffect(() => {
        const result = LEVEL_REGEX.test(String(task.level))
        setValidLevel(result);
    }, [task.level])

    useEffect(() => {
        const date = moment(task.deadline, "YYYY-MM-DD", true)
        setValidDeadline(date.isValid())
    }, [task.deadline])

    const handleEdit = () => {
        !disabled && onUpdate(task)
        setDisabled((status) => !status)
    }

    return (
        <section className="task-section">
            <div className="tips-container">
                {
                    task.title && titleFocus && !validTitle &&
                    <p id="title-note" className="instructions">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        0 to 40 characters.
                    </p>
                }
                {
                    task.level && levelFocus && !validLevel &&
                    <p id="title-note" className="instructions">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        only numbers from 1 to 9
                    </p>
                }
                {
                    task.deadline && deadlineFocus && !validDeadline &&
                    <p id="title-note" className="instructions">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        only date in format YYYY-MM-DD
                    </p>
                }
            </div>
            <div className="form-container">
                <div className="task-container">
                    <TaskInput
                        name="title"
                        completed={task.completed}
                        value={task.title}
                        onFocus={setTitleFocus}
                        onChange={(event) => onChange(task.id)}
                        disabled={disabled}
                    />
                    <div className="task-props">
                        <TaskInput
                            name="level"
                            completed={task.completed}
                            value={task.level}
                            onFocus={setLevelFocus}
                            onChange={(event) => onChange(task.id)}
                            disabled={disabled}
                        />
                        <TaskInput
                            name="deadline"
                            completed={task.completed}
                            value={task.deadline}
                            onFocus={setDeadlineFocus}
                            onChange={(event) => onChange(task.id)}
                            disabled={disabled}
                        />
                    </div>
                </div>
                <div className="buttons-container">
                    <button className="btn-complete">complete</button>
                    <button className="btn-edit" onClick={handleEdit}>edit</button>
                    <button className="btn-archived">edit</button>
                </div>
            </div>
        </section>
    )
}

const TaskInput = ({ name, completed, value, onFocus, onChange, disabled, ...props }) => {
    const className = completed ? "task-input task-done" : "task-input"

    return (
        <input
            type="text"
            name={name}
            className={className}
            value={value}
            onChange={!disabled ? onChange : () => { }}
            required
            onFocus={() => onFocus(true)}
            onBlur={() => onFocus(false)}
        />
    )
}

export default Task;