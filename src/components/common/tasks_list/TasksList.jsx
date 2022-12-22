import React from "react";
import { Task } from "../../common";

import './TasksList.css';


function TasksList({ show_level, tasks, completeTask, ...props }) {
    const items = tasks.map(item => {
        return <Task
            key={item.id}
            task={{ ...item, difficulty: show_level && item.difficulty }}
            completeTask={completeTask}
        />
    })
    return (
        <div className='ToDo-list'>
            {items}
        </div>
    )
}

export default TasksList;