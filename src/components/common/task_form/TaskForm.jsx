import React, { useState } from "react";
import './TaskForm.css';


const default_input = {
    id: null,
    title: "",
    description: "",
    comments: "",
    difficulty: 1,
    deadline: "",
    completed: false,
    day: null,
}

function TaskForm({ day_id, tasks, setTask, ...props }) {
    const [input, setInput] = useState(default_input)


    const addTask = (event) => {
        event.preventDefault();
        setTask([...tasks, input]);
        setInput(default_input);
    }
    const handleInputChange = (event) => {
        setInput(prevInput => {
            return { ...prevInput, [event.target.name]: event.target.value }
        })
    }

    return (
        <form onSubmit={addTask}>
            <input type="submit" hidden />

            <div className="input-line">
                <input
                    name="title"
                    className="task-input title"
                    type="text"
                    placeholder='title'
                    value={input.title}
                    required
                    onChange={handleInputChange}
                />
                <input
                    name="difficulty"
                    className="task-input difficulty"
                    type="text"
                    placeholder='level'
                    value={input.difficulty}
                    required
                    onChange={handleInputChange}
                />
                <input
                    name="deadline"
                    className="task-input deadline"
                    type="text"
                    placeholder='deadline'
                    value={input.deadline}
                    required
                    onChange={handleInputChange}
                />
            </div>
        </form>
    )
}

export default TaskForm;