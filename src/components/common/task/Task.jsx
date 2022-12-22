import React from "react";

import './Task.css';


function Task({ task, completeTask }) {
    let className = "task-description"
    if (task.completed) {
        className += " task-done"
    }
    return (
        <div className={className} onClick={() => completeTask(task)}>
            <div className="task-title">{task.title}</div>
            <div className="task-props">
                {task.difficulty && < div className="task-title">{task.difficulty}</div>}
                <div className="task-deadline">{task.deadline}</div>
            </div>
        </div >
    )
}

export default Task;