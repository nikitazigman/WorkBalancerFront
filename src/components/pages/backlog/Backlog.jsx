import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { TaskForm, TasksList } from "../../common";
import './Backlog.css';


// ToDO: filter task wich already done


const BACKLOG_TASKS_LIST = "api/task/list/?completed=false";

function Backlog() {
    const [tasks, setTasks] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    console.log("render backlog page")

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getTasks = async () => {
            try {
                const response = await axiosPrivate.get(BACKLOG_TASKS_LIST, {
                    signal: controller.signal
                });
                isMounted && setTasks(response.data)
            } catch (error) {
                if (error.name !== "CanceledError") {
                    console.log("got error");
                    console.log(error);
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

    return (
        <section className='today-section'>
            <TaskForm tasks={tasks} setTask={setTasks} />
            <TasksList
                showLevel={true}
                tasks={tasks}
                onClick={null}
                onChange={updateTaskProps}
                setTasks={setTasks}
                onSubmit={SubmitUpdatedTask}
            />
        </section>
    )
}

export default Backlog
