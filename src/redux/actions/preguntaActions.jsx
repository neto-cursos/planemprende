import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiAuth from '../../services/ApiAuth';

export const getPreguntas = createAsyncThunk('preguntas/get',
    async (datos) => {
        const data = await ApiAuth().post('/getpreguntas', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            // console.log("response preguntasActions Get:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)


export const createPreguntas = createAsyncThunk(
    'preguntas/create',
    async (datos) => {
        const data = await ApiAuth().post('/preguntas/create', datos).then(response => {
            // console.log("response preguntaActions create:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const updatePreguntas = createAsyncThunk('preguntas/update',
    async (datos) => {
        const data = await ApiAuth().post('/preguntas/update', datos).then(response => {
            // console.log("response preguntasActions update:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)
export const deletePreguntas = createAsyncThunk(
    'preguntas/delete',
    async (datos) => {
        const data = await ApiAuth().post('/preguntas/delete', datos).then(response => {
            // console.log("response preguntasActions delete:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const listPreguntas = createAsyncThunk(
    'preguntas/list',
    async (datos) => {
        const data = await ApiAuth().get('/listpreguntas').then(response => {
            // console.log("response preguntasActions delete:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)
