import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiAuth from '../../services/ApiAuth';

export const getRespCostos = createAsyncThunk('respcostos/get',
    async (datos) => {
        const data = await ApiAuth().post('getrespcostos', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            // console.log("response respcostosActions Get:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const listRespCostos = createAsyncThunk('respcostos/list',
    async (datos) => {
        const data = await ApiAuth().post('listrespcostos', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            // console.log("response respcostosActions Get:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)
export const createRespCostos = createAsyncThunk(
    'respcostos/create',
    async (datos) => {
        const data = await ApiAuth().post('createrespcostos', datos).then(response => {
            // console.log("response respcostosActions create:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const updateRespCostos = createAsyncThunk('respcostos/update',
    async (datos) => {
        const data = await ApiAuth().post('updaterespcostos', datos).then(response => {
            // console.log("response respcostosActions update:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)
export const deleteRespCostos = createAsyncThunk(
    'respcostos/delete',
    async (datos) => {
        const data = await ApiAuth().post('deleterespcostos', datos).then(response => {
            // console.log("response respcostosActions delete:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)



