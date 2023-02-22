import React, { useEffect, useState } from 'react';

import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useDays from '../../../hooks/useGetDay';
import useTasks from "../../../hooks/useTasks"

// import TaskForm from "../../common/task_form/TaskForm";
import Task from "../../common/task/Task";

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
    // const [options, setOptions] = useState([]);

    console.log(tasks)

    const onChange = (prop_obj, id) => {
        console.log("on change")
        console.log(prop_obj)
        console.log(id)

        setTasks(
            (tasks) => {
                return tasks.map((task) => {
                    return task.id == id ? { ...task, ...prop_obj } : task;
                })
            }
        )
    }
    const onComplete = (id) => {
        console.log(`completing ${id}`)
        setTasks(
            (tasks) => {
                return tasks.map((task) => {
                    return task.id == id ? { ...task, completed: !task.completed } : task;
                })
            }
        )
    }
    const onArchived = (id) => { console.log(`archiving ${id}`) }
    const onUpdate = (id) => { console.log(`updating ${id}`) }

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
            {/* <TaskForm
                date={today}
                tasks={tasks}
                setTasks={setTasks}
                options={options}
                setOptions={setOptions}
            /> */}
            {/* {
                tasks.map((task) => {
                    return <Task {...task} />
                })
            } */}
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
        </section>
    )
}

export default Today
