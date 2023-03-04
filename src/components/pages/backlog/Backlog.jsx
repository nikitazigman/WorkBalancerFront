import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useTasks from "../../../hooks/useTasks"
import Task from "../../common/task/Task";
import TaskForm from '../../common/task_form/TaskForm';

import config from '../../../configs/config';

import './Backlog.css';


function Backlog() {
    const [tasks, taskMethods] = useTasks();

    useEffect(() => {
        taskMethods.getBacklogTasks()
    }, [])

    return (
        <section className='backlog-section'>
            <TaskForm showOptions={false} onCreate={taskMethods.onCreate} onAdd={taskMethods.onAdd} />

            <div className="tasks-container">
                {tasks.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            task={task}
                            onArchived={taskMethods.onArchived}
                            onChange={taskMethods.onChange}
                            onUpdate={taskMethods.onUpdate}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default Backlog
