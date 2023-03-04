import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useTasks from "../../../hooks/useTasks"
import Task from "../../common/task/Task";
import TaskForm from '../../common/task_form/TaskForm';

import config from '../../../configs/config';

import './Today.css';

function Today() {
    const [tasks, taskMethods] = useTasks();

    useEffect(() => {
        taskMethods.getTodayTasks()
    }, [])

    return (
        <section className='today-section'>
            <div className="tasks-container">
                {tasks.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            task={task}
                            onArchived={taskMethods.onArchived}
                            onChange={taskMethods.onChange}
                            onUpdate={taskMethods.onUpdate}
                            onComplete={taskMethods.onComplete}
                        />
                    )
                })}
            </div>
            <TaskForm showOptions={true} onCreate={taskMethods.onCreate} onAdd={taskMethods.onAdd} />
        </section>
    )
}

export default Today
