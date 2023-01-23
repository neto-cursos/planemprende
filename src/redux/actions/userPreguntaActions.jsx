import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiAuth from '../../services/ApiAuth';

export const initUsersPregs = createAsyncThunk('userspreg/init',
    async (datos) => {
        const data = await ApiAuth().post('/inituserspreg', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            // console.log("response userspregActions Get:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const checkInitUsersPregs = createAsyncThunk('userspreg/checkinit',
    async (datos) => {
        const data = await ApiAuth().post('/checkinituserspreg', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            // console.log("response userspregActions Get:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const getUsersPregs = createAsyncThunk('userspreg/get',
    async (datos) => {
        const data = await ApiAuth().post('/getuserspreg', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            // console.log("response userspregActions Get:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)


export const createUsersPregs = createAsyncThunk(
    'userspreg/create',
    async (datos) => {
        const data = await ApiAuth().post('/createuserspreg', datos).then(response => {
            // console.log("response preguntaActions create:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const updateUsersPregs = createAsyncThunk('userspreg/update',
    async (datos) => {
        const data = await ApiAuth().post('/updateuserspreg', datos).then(response => {
            // console.log("response userspregActions update:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)
export const deleteUsersPregs = createAsyncThunk(
    'userspreg/delete',
    async (datos) => {
        const data = await ApiAuth().post('/deleteuserspreg', datos).then(response => {
            // console.log("response userspregActions delete:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const listUsersPregs = createAsyncThunk(
    'userspreg/list',
    async (datos) => {
        const data = await ApiAuth().post('/listuserspreg',datos).then(response => {
            // console.log("response userspregActions delete:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)
