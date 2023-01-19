import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiAuth from '../../services/ApiAuth';

export const getCostos = createAsyncThunk('costos/get',
    async (datos) => {
        const data = await ApiAuth().post('/getcostos', datos).then(response => {
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

export const listCostos = createAsyncThunk('costos/list',
    async (datos) => {
        const data = await ApiAuth().get('/listcostos').then(response => {
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
export const createCostos = createAsyncThunk(
    'costos/create',
    async (datos) => {
        const data = await ApiAuth().post('/createcostos', datos).then(response => {
            // console.log("response canvasActions create:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const updateCostos = createAsyncThunk('costos/update',
    async (datos) => {
        const data = await ApiAuth().post('/updatecostos', datos).then(response => {
            // console.log("response canvasActions update:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)
export const deleteCostos = createAsyncThunk(
    'costos/delete',
    async (datos) => {
        const data = await ApiAuth().post('/deletecostos', datos).then(response => {
            // console.log("response canvasActions delete:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

