import { useEffect, useState } from 'react';

import useAxiosPrivate from './useAxiosPrivate';
import axios from '../api/axios';
import useToday from './useToday';
import config from "../configs/config"

const TestTasks = [
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


const useTasks = () => {
    const axiosPrivate = useAxiosPrivate();
    const [tasks, setTasks] = useState([]);

    // const checkError = (error) => {
    //     if (error.name !== "CanceledError") {
    //         navigate(config.links.sign_in, { state: { from: location }, replace: true });
    //     }
    // }

    // const getTasks = async (day, completed) => {
    //     try {
    //         day = day ? day : "";
    //         completed = completed ? completed : ""

    //         const tasks_list_response = await axiosPrivate.get(`${config.api.tasks}?days=${day}&completed=${completed}`);
    //         return tasks_list_response.data

    //     } catch (error) {
    //         checkError(error)
    //     }
    // }

    const getTasks = async () => {
        setTasks(TestTasks)
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
    const onAdd = (task) => {
        setTasks(tasks => [...tasks, task])
    }

    const taskMethods = {
        onChange: onChange,
        onComplete: onComplete,
        onArchived: onArchived,
        onUpdate: onUpdate,
        onCreate: onCreate,
        getTodayTasks: getTasks,
        getBacklogTasks: getTasks,
        onAdd: onAdd
    }

    return [tasks, taskMethods]
}

export default useTasks;