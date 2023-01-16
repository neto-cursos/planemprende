import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiAuth from '../../services/ApiAuth';

export const getCanvas = createAsyncThunk('canvas/get',
    async (datos) => {
        const data = await ApiAuth().post('getcanvas', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            // console.log("response canvasActions Get:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const listCanvas = createAsyncThunk('canvas/list',
    async (datos) => {
        const data = await ApiAuth().post('/canvas/list', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            // console.log("response canvasActions Get:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)
export const createCanvas = createAsyncThunk(
    'canvas/create',
    async (datos) => {
        const data = await ApiAuth().post('createcanvas', datos).then(response => {
            // console.log("response canvasActions create:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const updateCanvas = createAsyncThunk('canvas/update',
    async (datos) => {
        const data = await ApiAuth().post('updatecanvas', datos).then(response => {
            // console.log("response canvasActions update:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)
export const deleteCanvas = createAsyncThunk(
    'canvas/delete',
    async (datos) => {
        const data = await ApiAuth().post('deletecanvas', datos).then(response => {
            // console.log("response canvasActions delete:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

