import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDays } from '../../../hooks/useDays';

import useTasks from "../../../hooks/useTasks"
import Task from "../../common/task/Task";
import TaskForm from '../../common/task_form/TaskForm';

import config from '../../../configs/config';

import './Backlog.css';


function Backlog() {
    const [backlog, taskMethods] = useTasks();
    const [{ }, { getToday }] = useDays();


    useEffect(() => {
        const getBacklogTasks = async () => {
            const today = await getToday()
            await taskMethods.getTasks({ exclude_days: today.id, archived: false, completed: false });
        }

        getBacklogTasks();
    }, [])

    return (
        <section className='backlog-section'>
            <TaskForm options={[]} onCreate={taskMethods.onCreate} onAdd={taskMethods.onAdd} />

            <div className="tasks-container">
                {backlog.tasks.map((task) => {
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
