import React, {createContext, useEffect, useState} from "react";
import {httpDelete, httpGet, httpPost, httpPut} from "../fetcher";

const SERVER_URL = "http://127.0.0.1:8000/"

export const GroupsContext = createContext([]);

export function GroupsProvider({ children }) {
    const [groups, setGroups] = useState([]);

    useEffect(()=> {
        getGroups();
    }, []);


    const getGroup = (id, setGroup) => {
        httpGet(SERVER_URL + `group/getGroup/${id}`, data => {
            setGroup(data.data);
        });

    }

    const getGroups = () => {
        httpGet(SERVER_URL + "group/getAllGroups", data => {
            setGroups(data.data);
        });

    }

    const postGroup = (name, importance, tagsIds) => {
        httpPost(SERVER_URL + "group/addGroup", {name: name, importance: importance, tags: tagsIds}, () => {
            getGroups();
        });
    }

    const addTag = (id, tagId) => {
        httpPut(SERVER_URL + `group/addTag/${id}`, {tags: tagId}, () => {
            getGroups();
        });
    }

    const updateGroup = (id, name, importance, tagsIds) => {
        httpPut(SERVER_URL + `group/editGroup/${id}`, {name: name, importance: importance, tags: tagsIds}, () => {
            getGroups();
        });
    }

    const deleteGroup = (id) => {
        httpDelete(SERVER_URL + `group/deleteGroup/${id}`, () => {
            getGroups();
        });
    }

    return (
        <GroupsContext.Provider value={{ groups, getGroup, getGroups, postGroup, addTag, updateGroup, deleteGroup }}>
            {children}
        </GroupsContext.Provider>
    );
}