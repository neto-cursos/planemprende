import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiAuth from '../../services/ApiAuth';

export const listActividades = createAsyncThunk('actividades/list',
    async (datos) => {
        const data = await ApiAuth().post('/listactividades', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            // console.log("response actividadesActions List:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const getActividades = createAsyncThunk('actividades/get',
    async (datos) => {
        const data = await ApiAuth().post('/getactividades', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            // console.log("response actividadesActions Get:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)


export const createActividades = createAsyncThunk(
    'actividades/create',
    async (datos) => {
        const data = await ApiAuth().post('/createactividades', datos).then(response => {
            // console.log("response actividadesActions create:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const updateActividades = createAsyncThunk('actividades/update',
    async (datos) => {
        const data = await ApiAuth().post('/updateactividades', datos).then(response => {
            // console.log("response actividadesActions update:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)
export const deleteActividades = createAsyncThunk(
    'actividades/delete',
    async (datos) => {
        const data = await ApiAuth().post('/deleteactividades', datos).then(response => {
            // console.log("response actividadesActions delete:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)


