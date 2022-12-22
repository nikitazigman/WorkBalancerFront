import React, { useState } from 'react';

import { TaskForm, TasksList } from "../../common";

import data from "../../../data";
import './Today.css';

function Today() {
    const [day, setDay] = useState(1)
    const [tasks, setTask] = useState(data)

    const completeTask = ({ id }) => {
        const new_tasks = tasks.map(
            (item) => {
                if (item.id === id) {
                    return { ...item, completed: !item.completed };
                }
                return item;
            }
        )
        console.log(new_tasks)
        setTask(new_tasks)
    }

    return (
        <section className='today-section'>
            <TaskForm tasks={tasks} setTask={setTask} day_id={day} />
            <TasksList show_level={false} tasks={tasks} completeTask={completeTask} />
        </section>
    )
}

export default Today
