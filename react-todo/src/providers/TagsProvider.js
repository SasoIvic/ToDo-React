import React, {createContext, useEffect, useState} from "react";
import {httpDelete, httpGet, httpPost, httpPut} from "../fetcher";

const SERVER_URL = "http://127.0.0.1:8000/"

export const TagsContext = createContext([]);

export function TagsProvider({ children }) {
    const [tags, setTags] = useState([]);

    useEffect(()=> {
        getTags();
    }, []);


    const getTag = (id, setTag) => {
        httpGet(SERVER_URL + `tag/getTag/${id}`, data => {
            setTag(data.data);
        });

    }

    const getTags = () => {
        httpGet(SERVER_URL + "tag/getAllTags", data => {
            setTags(data.data);
        });

    }

    const postTag = (name, color) => {
        httpPost(SERVER_URL + "tag/addTag", {name: name, color: color}, () => {
            getTag();
        });
    }

    const updateTag = (id, name, color) => {
        httpPut(SERVER_URL + `tag/editTag/${id}`, {name: name, color: color}, () => {
            getTag();
        });
    }

    const deleteTag = (id) => {
        httpDelete(SERVER_URL + `tag/deleteTag/${id}`, () => {
            getTag();
        });
    }

    return (
        <TagsContext.Provider value={{ tags, getTag, getTags, postTag, updateTag, deleteTag }}>
            {children}
        </TagsContext.Provider>
    );
}