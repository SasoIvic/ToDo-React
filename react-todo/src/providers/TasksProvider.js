import React, {createContext, useState} from "react";
import {httpDelete, httpGet, httpPost, httpPut} from "../fetcher";

const SERVER_URL = "http://127.0.0.1:8000/"

export const TasksContext = createContext([]);

export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const [topFive, setTopFive] = useState([]);

    /*
    useEffect(()=> {
        getGroups();
    }, []);
    */

    const getTask = (id) => {
        httpGet(SERVER_URL + `task/getTask/${id}`, data => {
            setTasks(data.data);
        });

    }

    const getTasks = (groupId) => {
        httpGet(SERVER_URL + `task/getAllTasks/${groupId}`, data => {
            setTasks(data.data);
        });

    }

    const getAllTasks = () => {
        httpGet(SERVER_URL + `task/getTasks/`, data => {
            setTasks(data.data);
        });

    }

    const getTopFiveTasks = () => {
        httpGet(SERVER_URL + `task/topFive`, data => {
            setTopFive(data.data);
        });

    }

    const postTask = (task, group) => {
        httpPost(SERVER_URL + "task/addTask", {task}, () => {
            if(group)
                getTasks(group._id)
            else
                getAllTasks();
        });
    }

    const addTag = (id, tagId) => {
        httpPut(SERVER_URL + `task/addTag/${id}`, {tags: tagId}, () => {
            getTask();
        });
    }

    const updateTask = (id, task, group) => {
        httpPut(SERVER_URL + `task/editTask/${id}`, {task}, () => {
            if(group)
                getTasks(group._id)
            else
                getAllTasks();
        });
    }

    const deleteTask = (id, group) => {
        httpDelete(SERVER_URL + `task/deleteTask/${id}`, () => {
            if(group)
                getTasks(group._id)
            else
                getAllTasks();
        });
    }

    return (
        <TasksContext.Provider value={{ tasks, topFive, getTask, getTasks, getAllTasks, getTopFiveTasks, postTask, addTag, updateTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
}