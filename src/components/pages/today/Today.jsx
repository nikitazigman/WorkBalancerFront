import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { TaskForm, TasksList } from "../../common";
import './Today.css';

const TASKS_LIST = "api/task/list/";


function Today() {
    const date = new Date();
    const today = date.toLocaleDateString("en-CA");

    const [tasks, setTasks] = useState([]);
    const [options, setOptions] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const completeTask = ({ id }) => {
        let changed_task = tasks.find(task => task.id === id);

        const updateTask = async () => {
            changed_task.completed = !changed_task.completed;
            try {
                const response = await axiosPrivate.put(`api/task/${id}/`,
                    JSON.stringify(changed_task),
                    {
                        headers: { "Content-Type": "application/json" }
                    });
                return response?.status === 200;
            }
            catch (error) {
                console.log("update task got error");
                console.log(error);
                return error;
            }
        }

        updateTask().then((result) => {
            console.log("task is completed")
            result && setTasks(prev => tasks.map(x => x));
        });
    }

    const updateTaskProps = (event, updatedTask) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === updatedTask.id) {
                return { ...task, [event.target.name]: event.target.value };
            }
            return task;
        })
        setTasks(updatedTasks)
    }

    const SubmitUpdatedTask = (task) => {
        const updateTask = async () => {
            try {
                const response = await axiosPrivate.put(`/api/task/${task.id}/`,
                    JSON.stringify(task),
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                )
                return response?.status === 200;
            } catch (error) {
                console.log("got error during task updating");
                console.log(error);
                return false;
            }
        }

        updateTask();
        console.log("task is submitted")
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        console.log("requesting tasks")
        const getTasks = async () => {
            try {
                const response = await axiosPrivate.get(TASKS_LIST, {
                    signal: controller.signal
                });
                if (isMounted) {
                    setTasks(response.data.filter(task => task.date === today))
                    setOptions(response.data.filter(task => ((task.date !== today) && (!task.completed))))
                }
            } catch (error) {
                if (error.name !== "CanceledError") {
                    navigate("/login", { state: { from: location }, replace: true });
                }
            }
        }

        getTasks();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <section className='today-section'>
            <TaskForm
                date={today}
                tasks={tasks}
                setTasks={setTasks}
                options={options}
                setOptions={setOptions}
            />
            <TasksList
                showLevel={false}
                tasks={tasks}
                onClick={completeTask}
                onChange={updateTaskProps}
                setTasks={setTasks}
                onSubmit={SubmitUpdatedTask}
            />
        </section>
    )
}

export default Today
