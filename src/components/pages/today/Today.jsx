import React, { useEffect, useState } from 'react';

import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useDays from '../../../hooks/useGetDay';
import useTasks from "../../../hooks/useTasks"

// import TaskForm from "../../common/task_form/TaskForm";
import Task from "../../common/task/Task";
import TaskForm from '../../common/task_form/TaskForm';

import config from '../../../configs/config';

import './Today.css';

const test_tasks = [
    {
        archived: false,
        completed: true,
        days: [422, 431, 429, 427, 430, 423, 428, 424, 425],
        deadline: "1972-12-16",
        id: 762,
        level: 1,
        title: "test_new_title"
    },
    {
        archived: false,
        completed: false,
        days: [422, 431, 429, 427, 430, 423, 428, 424, 425],
        deadline: "1972-12-11",
        id: 763,
        level: 3,
        title: "test1_new_title"
    },
    {
        archived: false,
        completed: true,
        days: [422, 431, 429, 427, 430, 423, 428, 424, 425],
        deadline: "1972-12-14",
        id: 764,
        level: 5,
        title: "test2_new_title asdasdlkajsdkljahsd a asjdha"
    },
    {
        archived: false,
        completed: true,
        days: [422, 431, 429, 427, 430, 423, 428, 424, 425],
        deadline: "1972-12-19",
        id: 765,
        level: 4,
        title: "test3_new_title"
    }
]

function Today() {
    const [getToday,] = useDays();
    const [getTasks,] = useTasks();

    const [tasks, setTasks] = useState(test_tasks);

    const onChange = (prop_obj, id) => {
        setTasks(
            (tasks) => {
                return tasks.map((task) => {
                    return task.id === id ? { ...task, ...prop_obj } : task;
                })
            }
        )
    }
    const onComplete = (id) => {
        setTasks(
            (tasks) => {
                return tasks.map((task) => {
                    return task.id === id ? { ...task, completed: !task.completed } : task;
                })
            }
        )
    }
    const onArchived = (id) => {
        setTasks(
            tasks => tasks.filter(task => task.id !== id)
        )
    }
    const onUpdate = (id) => { console.log(`updating ${id}`) }
    const onCreate = (task) => {
        setTasks(tasks => {
            const new_task = { ...task, id: tasks[tasks.length - 1].id + 1 }
            return [...tasks, new_task]
        })
    }
    useEffect(() => {
        const requestTasks = async () => {
            console.log("getting today id");
            const today = await getToday();
            console.log("requesting tasks");
            const data = await getTasks(today, NaN);
            setTasks(data.results)
        }

        // requestTasks()
    }, [])

    return (
        <section className='today-section'>
            <div className="tasks-container">
                {tasks.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            task={task}
                            onArchived={onArchived}
                            onChange={onChange}
                            onUpdate={onUpdate}
                            onComplete={onComplete}
                        />
                    )
                })}
            </div>
            <TaskForm showOptions={true} onCreate={onCreate} />
        </section>
    )
}

export default Today
