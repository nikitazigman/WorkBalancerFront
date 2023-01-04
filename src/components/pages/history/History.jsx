import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { TasksList } from "../../common";
import './History.css';




const HISTORY_TASKS_LIST = "api/task/list/?completed=true";

function History() {
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
                const response = await axiosPrivate.get(HISTORY_TASKS_LIST, {
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

    return (
        <section className='today-section'>
            <TasksList
                showLevel={true}
                tasks={tasks}
                onClick={null}
                onChange={null}
                setTasks={null}
                onSubmit={null}
            />
        </section>
    )
}

export default History
