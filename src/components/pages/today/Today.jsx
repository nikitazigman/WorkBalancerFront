import React, { useEffect, useState } from 'react';

import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useDays from '../../../hooks/useGetDay';
import useTasks from "../../../hooks/useTasks"

// import TaskForm from "../../common/task_form/TaskForm";
import Task from "../../common/task/Task";

import config from '../../../configs/config';

import './Today.css';

function Today() {
    const [getToday,] = useDays();
    const [getTasks,] = useTasks();

    const [tasks, setTasks] = useState([]);
    // const [options, setOptions] = useState([]);

    console.log(tasks)

    // const completeTask = ({ id }) => {
    //     let changed_task = tasks.find(task => task.id === id);

    //     const updateTask = async () => {
    //         changed_task.completed = !changed_task.completed;
    //         try {
    //             const response = await axiosPrivate.put(`api/task/${id}/`,
    //                 JSON.stringify(changed_task),
    //                 {
    //                     headers: { "Content-Type": "application/json" }
    //                 });
    //             return response?.status === 200;
    //         }
    //         catch (error) {
    //             console.log("update task got error");
    //             console.log(error);
    //             return error;
    //         }
    //     }

    //     updateTask().then((result) => {
    //         console.log("task is completed")
    //         result && setTasks(prev => tasks.map(x => x));
    //     });
    // }

    // const updateTaskProps = (event, updatedTask) => {
    //     const updatedTasks = tasks.map((task) => {
    //         if (task.id === updatedTask.id) {
    //             return { ...task, [event.target.name]: event.target.value };
    //         }
    //         return task;
    //     })
    //     setTasks(updatedTasks)
    // }

    // const SubmitUpdatedTask = (task) => {
    //     const updateTask = async () => {
    //         try {
    //             const response = await axiosPrivate.put(`/api/task/${task.id}/`,
    //                 JSON.stringify(task),
    //                 {
    //                     headers: { "Content-Type": "application/json" }
    //                 }
    //             )
    //             return response?.status === 200;
    //         } catch (error) {
    //             console.log("got error during task updating");
    //             console.log(error);
    //             return false;
    //         }
    //     }

    //     updateTask();
    //     console.log("task is submitted")
    // }

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
                <Task />
                <Task />
                <Task />
            </div>
        </section>
    )
}

export default Today
