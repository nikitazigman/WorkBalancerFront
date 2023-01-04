import React, { useEffect, useState } from "react";
import './TaskForm.css';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import moment from "moment/moment";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Task from "../../common/task/Task";


const default_input = {
    title: "",
    description: "",
    comments: "",
    level: null,
    deadline: "",
    completed: false,
    date: null,
}
const TITLE_REGEX = /^[a-zA-Z0-9 ]{0,40}$/
const LEVEL_REGEX = /^[1-9]{1}$/

function TaskForm({ date, tasks, setTasks, options, setOptions, ...props }) {
    const [title, setTitle] = useState("");
    const [validTitle, setValidTitle] = useState(false);
    const [titleFocus, setTitleFocus] = useState(false);

    const [level, setLevel] = useState();
    const [validLevel, setValidLevel] = useState(false);
    const [levelFocus, setLevelFocus] = useState(false);

    const [deadline, setDeadline] = useState();
    const [validDeadline, setValidDeadline] = useState(false);
    const [deadlineFocus, setDeadlineFocus] = useState(false);

    const [id, setID] = useState();
    const [suitableOptions, setSuitableOptions] = useState([])

    const axiosPrivate = useAxiosPrivate();
    console.log(id)

    const addTask = (event) => {
        event.preventDefault();

        const createdTask = { ...default_input, title, level, deadline, date };
        const createTask = async () => {
            try {
                const response = await axiosPrivate.post("/api/task/create/",
                    JSON.stringify(createdTask),
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                )
                return response?.status === 201;
            } catch (error) {
                console.log("got error during task creation");
                console.log(error);
                return false;
            }
        }

        createTask().then((result) => {
            console.log("task is created. Updating tasksState")
            console.log(result)
            if (result) {
                setTasks([...tasks, createdTask]);
                setTitle();
                setLevel();
                setDeadline();
            }
        })
    }

    useEffect(() => {
        const result = TITLE_REGEX.test(title)
        setValidTitle(result);
    }, [title])

    useEffect(() => {
        const result = LEVEL_REGEX.test(level)
        setValidLevel(result);
    }, [level])
    useEffect(() => {
        const date = moment(deadline, "YYYY-MM-DD", true)
        setValidDeadline(date.isValid())
    }, [deadline])

    const handleInputTitle = (event) => {
        if (date) {
            if (event.target.value.length > 1) {
                setSuitableOptions(options.filter((option) => option.title.includes(event.target.value)))
            } else {
                setSuitableOptions([]);
            }
        }

        setTitle(event.target.value)
    }

    const handleSelectOption = (option) => {
        const updateTask = async () => {
            try {
                const response = await axiosPrivate.patch(`/api/task/${option.id}/`,
                    JSON.stringify({ date: date }),
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                )
                return response?.status === 200;
            } catch (error) {
                console.log("got error during task updating");
                console.log(error);
                return false;
            }
        }

        updateTask().then((result) => {
            if (result) {
                setTasks([...tasks, { ...option, date }]);
                setTitle("");
                setLevel("");
                setDeadline("");
                setOptions(options.filter(task => task.id !== option.id))
                setSuitableOptions([]);
            }
        })

    }

    return (
        <form onSubmit={addTask}>
            <input disabled={!(validLevel && validTitle && validDeadline)} type="submit" hidden />

            <div className="input-line">
                <input
                    name="title"
                    className="task-input title"
                    type="text"
                    placeholder='title'
                    value={title}
                    required
                    autoComplete="off"
                    onFocus={() => setTitleFocus(true)}
                    onBlur={() => setTitleFocus(false)}
                    onChange={handleInputTitle}
                />
                <input
                    name="level"
                    className="task-input difficulty"
                    type="text"
                    placeholder='level'
                    value={level}
                    required
                    autoComplete="off"
                    onFocus={() => setLevelFocus(true)}
                    onBlur={() => setLevelFocus(false)}
                    onChange={(event) => { setLevel(event.target.value) }}
                />
                <input
                    className="task-input deadline"
                    type="text"
                    placeholder='deadline'
                    value={deadline}
                    required
                    autoComplete="off"
                    onFocus={() => setDeadlineFocus(true)}
                    onBlur={() => setDeadlineFocus(false)}
                    onChange={(event) => { setDeadline(event.target.value) }}
                />
            </div>
            <div className="wrong-fromat-notification">
                {
                    title && titleFocus && !validTitle &&
                    <p id="title-note" className="instructions">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        0 to 40 characters.
                    </p>
                }
                {
                    level && levelFocus && !validLevel &&
                    <p id="title-note" className="instructions">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        only numbers from 1 to 9
                    </p>
                }
                {
                    deadline && deadlineFocus && !validDeadline &&
                    <p id="title-note" className="instructions">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        only date in format YYYY-MM-DD
                    </p>
                }
            </div>
            {
                suitableOptions.length > 0 &&
                <div className="options-container">
                    {
                        suitableOptions.map((option) => {
                            return (
                                <Task
                                    key={option.id}
                                    task={option}
                                    onClick={handleSelectOption}
                                    style={{
                                        padding: "0.5vh 1.5vw",
                                        gap: "0.1vh",
                                        marginTop: "0.1vw",
                                    }}
                                />
                            )
                        })
                    }
                </div>
            }


        </form>
    )
}

export default TaskForm;