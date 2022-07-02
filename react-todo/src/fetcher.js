import axios from "axios";

export const httpGet = (url, callback) => {
    axios({
        method: 'get',
        url: url,
    }).then(res =>{
        callback(res.data);
    }).catch(err => {
        console.log(err)
    });
}

export const httpPost = (url, data, callback, onError) => {
    axios({
        method: 'post',
        url: url,
        data: data
    }).then(res =>{
        if(callback) callback(res.data);
    }).catch(err => {
        if(onError) onError(err);
        console.log(err)
    });
}

export const httpPut = (url, data, callback) => {
    axios({
        method: 'put',
        url: url,
        data: data,
    }).then(res =>{
        callback(res.data);
    }).catch(err => {
        console.log(err);
        return err;
    });
}

export const httpDelete = (url, callback) => {
    axios({
        method: 'delete',
        url: url,
    }).then(res =>{
        callback(res.data);
    }).catch(err => {
        console.log(err)
    });
}