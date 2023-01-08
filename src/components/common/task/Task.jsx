import React from "react";
import { useState, useEffect } from "react";
import moment from "moment/moment";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Task.css';

const TITLE_REGEX = /^[a-zA-Z0-9 ]{0,40}$/
const LEVEL_REGEX = /^[1-9]{1}$/

function Task({ task, setTasks, onClick, onChange, onSubmit, style, showLevel, ...props }) {
    const className = task.completed ? "task-props-input task-done" : "task-props-input"

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

    const handleSubit = (event) => {
        event.preventDefault();
        onSubmit && onSubmit(task);
    }

    return (
        <form onSubmit={handleSubit}>
            <input disabled={!(validLevel && validTitle && validDeadline)} type="submit" hidden />

            <div className={"task-description"} onDoubleClick={onClick ? () => onClick(task) : null} style={style}>
                <div className="task-title">
                    <input
                        name="title"
                        type="text"
                        className={className}
                        value={task.title}
                        onChange={onChange ? (event) => onChange(event, task) : () => { }}
                        size={task.title.length}
                        required
                        onFocus={() => setTitleFocus(true)}
                        onBlur={() => setTitleFocus(false)}
                    />
                </div>
                <div className="task-props">
                    {
                        showLevel &&
                        <div className="task-level">
                            <input
                                type="text"
                                name="level"
                                className={className}
                                value={task.level}
                                onChange={onChange ? (event) => onChange(event, task) : () => { }}
                                size="1"
                                required
                                onFocus={() => setLevelFocus(true)}
                                onBlur={() => setLevelFocus(false)}
                            />
                        </div>
                    }
                    <div className="task-deadline">
                        <input
                            type="text"
                            name="deadline"
                            className={className}
                            value={task.deadline}
                            onChange={onChange ? (event) => onChange(event, task) : () => { }}
                            size={task.deadline.length}
                            required
                            onFocus={() => setDeadlineFocus(true)}
                            onBlur={() => setDeadlineFocus(false)}
                        />
                    </div>
                </div>
            </div >
            <div className="task-wrong-fromat-notification">
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
        </form>
    )
}

export default Task;