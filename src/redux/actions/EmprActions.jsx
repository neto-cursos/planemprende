import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiAuth from '../../services/ApiAuth';

const POSTS_URL = '/misemprendimientos';
export const fetchEmprs = createAsyncThunk('emprs/fetchEmprs', async (datoid) => {

    const response = await ApiAuth().post(POSTS_URL, { id: datoid }).then(response => {
        // console.log("HOLIS");
        // console.log(response);
        return response.data
    }).catch(error => {
        console.log(error)
    })
    return response;
})

export const addNewEmprs = createAsyncThunk('emprs/addNewEmprs', async (initialPost) => {
    const response = await ApiAuth().post('/nuevoempr', initialPost).then(response => {
        return response.data
    })
    return response;
});
export const removeEmprs = createAsyncThunk('emprs/removeEmprs', async (datos) => {
    const response = await ApiAuth().post('/removeempr', datos).then(response => {
        return response.data;
    })
    return response;
});
export const updateEmprs = createAsyncThunk('emprs/updateEmprs', async (datos) => {
    const response = await ApiAuth().post('/updateempr', datos).then(response => {
        return response.data;
    })
    return response;
});

export const queryEmprs = createAsyncThunk('emprs/queryEmprs', async (datos) => {
    const response = await ApiAuth().post('/queryempr', datos).then(response => {
        return response.data;
    })
    return response;
});