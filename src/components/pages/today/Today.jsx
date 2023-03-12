import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useTasks from "../../../hooks/useTasks"
import { useDays } from '../../../hooks/useDays';
import Task from "../../common/task/Task";
import TaskForm from '../../common/task_form/TaskForm';

import config from '../../../configs/config';

import './Today.css';

function Today() {
    const [day, setDay] = useState({
        date: ""
    })
    console.log("day: ", day)
    const [today, taskMethods] = useTasks();
    const [backlog, backlogMethods] = useTasks();

    const [{ }, { getToday }] = useDays();

    useEffect(() => {
        const getTasksForToday = async () => {
            const today = await getToday()
            await taskMethods.getTasks({ filter_days: today.id, archived: false })
            await backlogMethods.getTasks({ exclude_days: today.id, archived: false, completed: false });
            setDay(today);
        }

        getTasksForToday();
    }, [])

    const handleOnAdd = (task) => {
        backlog.setTasks(options => options.filter(option => option.id != task.id));
        taskMethods.onAdd(task, day.id)
    }

    return (
        <section className='today-section'>
            <div className="tasks-container">
                {today.tasks.map((task) => {
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
            <TaskForm
                backlogTasks={backlog.tasks}
                onCreate={taskMethods.onCreate}
                onAdd={handleOnAdd}
                today={day}
            />
        </section>
    )
}

export default Today
