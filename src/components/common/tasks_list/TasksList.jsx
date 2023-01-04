import React from "react";
import { Task } from "../../common";

import './TasksList.css';


function TasksList({ showLevel, tasks, onChange, onClick, onSubmit, ...props }) {
    const items = tasks.map(item => {
        return <Task
            key={item.id}
            task={item}
            showLevel={showLevel}
            onClick={onClick}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    })
    return (
        <div className='ToDo-list'>
            {items}
        </div>
    )
}

export default TasksList;