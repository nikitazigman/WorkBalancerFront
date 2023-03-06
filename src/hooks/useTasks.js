import { useEffect, useState } from 'react';

import useAxiosPrivate from './useAxiosPrivate';
import axios from '../api/axios';
import config from "../configs/config"


const useTasks = () => {
    const axiosPrivate = useAxiosPrivate();
    const [tasks, setTasks] = useState([]);

    const getTasks = async ({ filter_days, archived, completed, exclude_days }) => {

        const taskUrl = `${config.api.tasks}?completed=${completed}&archived=${archived}`;
        const full_url =
            taskUrl +
            (filter_days ? `&days=${filter_days}` : "") +
            (exclude_days ? `&exclude_days=${exclude_days}` : "");



        console.log("get tasks url: %s", full_url);
        try {
            const response = await axiosPrivate.get(full_url);
            console.log(response);
            response.status === 200 && setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    }
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
        const completeTask = async () => {
            const full_url = `${config.api.tasks}${id}/`

            const task = tasks.filter(task => task.id === id)[0];

            const payload = JSON.stringify(
                { completed: !task.completed }
            );
            console.log(task, payload);
            try {
                const response = await axiosPrivate.patch(full_url,
                    payload,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                )
                console.log(response)
                response.status === 200 && setTasks(
                    (tasks) => {
                        return tasks.map((task) => {
                            return task.id === id ? { ...task, completed: !task.completed } : task;
                        })
                    }
                )
            } catch (error) {
                console.log(error)
            }
        }

        completeTask();
    }
    const onArchived = (id) => {
        const archiveTask = async () => {
            const full_url = `${config.api.tasks}${id}/`

            const payload = JSON.stringify(
                { archived: true }
            );

            try {
                const response = await axiosPrivate.patch(full_url,
                    payload,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                )
                console.log(response)
                response.status === 200 && setTasks(
                    tasks => tasks.filter(task => task.id !== id)
                )
            } catch (error) {
                console.log(error)
            }
        }

        archiveTask();

    }
    const onUpdate = (id) => {
        const updateTask = async () => {
            const full_url = `${config.api.tasks}${id}/`
            const task = tasks.filter(task => task.id === id)[0];
            const payload = JSON.stringify(task);

            try {
                const response = await axiosPrivate.patch(full_url,
                    payload,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                )
                console.log(response)
                return true;

            } catch (error) {
                console.log(error)
                return false;
            }
        }

        updateTask();
    }
    const onCreate = (task) => {
        const createTask = async () => {
            const full_url = `${config.api.tasks}`
            const payload = JSON.stringify(task);

            try {
                const response = await axiosPrivate.post(full_url,
                    payload,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );

                console.log(response.status);
                response.status === 201 && setTasks(tasks => [...tasks, response.data])

                return true;

            } catch (error) {
                console.log(error)
                return false;
            }
        }

        createTask();
    }
    const onAdd = (task, dayId) => {
        const addTask = async () => {
            const full_url = `${config.api.tasks}${task.id}/`;
            const payload = JSON.stringify(
                { days: task.days ? [...task.days, dayId] : [dayId] }
            );

            try {
                const response = await axiosPrivate.patch(full_url,
                    payload,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                response.status === 200 && setTasks(tasks => [...tasks, response.data]);
                return true;

            } catch (error) {
                console.log(error);
                return false;
            }
        }
        addTask()
    }

    const taskMethods = {
        onChange: onChange,
        onComplete: onComplete,
        onArchived: onArchived,
        onUpdate: onUpdate,
        onCreate: onCreate,
        getTasks: getTasks,
        onAdd: onAdd
    }

    return [{ tasks, setTasks }, taskMethods]
}

export default useTasks;