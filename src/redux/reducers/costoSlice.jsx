import { createSlice, nanoid } from '@reduxjs/toolkit'
import {
    getCostos, updateCostos,
    deleteCostos, createCostos, listCostos
} from '../actions/CostoActions'

const initialState = {
    loaded: false,
    costos: [],
    // costos: [
    //     {
    //         cost_id: '', modu_id: '', cost_nume: '',
    //         cost_text: '', cost_desc: '',
    //         created_at: '', updated_at: '',
    //     }
    // ],
    byModule: false,
}
export const costoSlice = createSlice({
    name: 'costos',
    //initialState:[],
    initialState: initialState,
    reducers: {
        reset: (state, action) => {
            state = initialState;
            return state;
        },
        setCosto: (state, action) => {
            console.log(state, action);
            action.payload.map(data => {

                state.costos = state.costos.concat(data);
            });
        },
        addCosto: (state, action) => {
            console.log(state, action);
            state.costos.push(action.payload);
        },
        deleteCosto: (state, action) => {
            console.log(action.payload);
            const nodo = state.costos.find(costo => costo.cost_id === action.payload)
            if (nodo) {
                state.costos.splice(state.indexOf(nodo), 1)
            }
        },
        updateCosto: (state, action) => {
            const { cost_id,
                modu_id,
                cost_nume,
                cost_text,
                cost_desc, } = action.payload;
            const costoTask = state.costos.find(costo => costo.cost_id === cost_id)
            if (costoTask) {
                costoTask.cost_id = cost_id;
                costoTask.modu_id = modu_id;
                costoTask.cost_nume = cost_nume;
                costoTask.cost_text = cost_text;
                costoTask.cost_desc = cost_desc;
            }
        },
    },
    extraReducers(builder) {
        // login user
        builder
            .addCase(getCostos.pending, (state, action) => {
                console.log("Getrespuestas Pending");
            })
            .addCase(getCostos.fulfilled, (state, action) => {
                state.costos.length = 0;
                console.log("Getrespuestas Fullfilled");
                console.log(state, action);
                //state.push(action.payload);
                action.payload.map(data => {

                    console.log("data from get costos:")
                    console.log(data);
                    //state=state.push(data);
                    if (!state.costos.find(costo => costo.cost_id === data.cost_id))
                        state.costos.push(data);
                    //console.log("state from get costos:")
                    //console.log(state);
                });
                state.loaded = true;
                state.byModule = true;
            })
            .addCase(getCostos.rejected, (state, action) => {
                console.log("Getrespuestas Rejected");
            })
            // register user
            .addCase(createCostos.pending, (state, action) => {
                console.log("Createrespuestas Pending");
            })
            .addCase(createCostos.fulfilled, (state, action) => {
                console.log("Createrespuestas FullFilled");
            })
            .addCase(createCostos.rejected, (state, action) => {
                console.log("Createrespuestas Rejected");
            })
            // get user details
            .addCase(updateCostos.pending, (state, action) => {
                console.log("updateCostos Pending");
            })
            .addCase(updateCostos.fulfilled, (state, { payload }) => {
                console.log("updateCostos FullFilled");
            })
            .addCase(updateCostos.rejected, (state, { payload }) => {
                console.log("updateCostos Rejected");
            })
            // check if user is loggedIn
            .addCase(deleteCostos.pending, (state, action) => {
                console.log("DeleteCostos Pending");
            })
            .addCase(deleteCostos.fulfilled, (state, { payload }) => {
                console.log("DeleteCostos FullFilled");

            })
            .addCase(deleteCostos.rejected, (state, { payload }) => {
                console.log("DeleteCostos Rejected");
            })
            .addCase(listCostos.pending, (state, action) => {
                console.log("ListCostos Pending");
            })
            .addCase(listCostos.fulfilled, (state, action) => {
                console.log("ListCostos FullFilled");
                state.costos.length = 0;
                action.payload.map(data => {
                    if (!state.costos.find(costo => costo.cost_id === data.cost_id))
                        state.costos.push(data);
                });
                state.loaded = true;
                state.byModule = false;
            })
            .addCase(listCostos.rejected, (state, { payload }) => {
                console.log("ListCostos Rejected");
            })
    },
})
export const { addCosto, deleteCosto, updateCosto, reset } = costoSlice.actions
export default costoSlice.reducer;