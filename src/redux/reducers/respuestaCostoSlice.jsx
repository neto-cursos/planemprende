import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import {
    listRespCostos, updateRespCostos,
    deleteRespCostos, createRespCostos
} from './../actions/respuestaCostoActions'

const initialState = {
    stateRespCost: 'void',
    respCostos: [],
    // respCostos: [
    //     {
    //         resp_cost_id: '', canv_id: '', cost_id: '',
    //         modu_nume: '', resp_cost_nume: '',
    //         resp_cost_desc: '', resp_cost_acti: '',
    //         resp_cost_monto: '', resp_cost_esta: '',
    //         created_at: '', updated_at,
    //     }
    // ]
}
export const respCostoSlice = createSlice({
    name: 'respCostos',
    //initialState:[],
    initialState: initialState,
    reducers: {
        resetStateRespCosto: (state, action) => {
            state.stateResp = action.payload;
            console.log(action.payload);
            return state;
        },
        resetAllRespCostos: (state, action) => {
            state = initialState;
            return state;
        },
        addRespCosto: (state, action) => {
            state.respCostos.push(action.payload);
            console.log(state.respCostos);
            return state;
        },
        agregarRespCosto: (state, action) => {
            action.payload.map(data => {
                console.log("data from add respCostos:")
                console.log(data);
                if (!state.respCostos.find(respCosto => respCosto.resp_cost_id === data.resp_cost_id))
                    state.respCostos.push(data);
                return state;
            });
            console.log("state last")
            console.log(state);
        },
        deleteRespCosto: (state, action) => {
            console.log(action.payload);
            //fin devuelve undefined si no lo encuentra
            const nodo = state.respCostos.find(respCosto => respCosto.resp_cost_id === action.payload)
            if (nodo) {
                state.respCostos.splice(state.respCostos.indexOf(nodo), 1);
            }
        },
        updateRespCosto: (state, action) => {
            const { resp_cost_id, cost_id, modu_nume, canv_id, resp_cost_nume, resp_cost_acti,resp_cost_monto,resp_cost_desc, resp_cost_esta } = action.payload;
            const respCostoTask = state.respCostos.find(respCosto => respCosto.resp_cost_id === resp_cost_id)
            if (respCostoTask) {
                respCostoTask.cost_id = cost_id;
                respCostoTask.modu_nume = modu_nume;
                respCostoTask.canv_id = canv_id;
                respCostoTask.resp_cost_nume = resp_cost_nume;
                respCostoTask.resp_cost_acti = resp_cost_acti;
                respCostoTask.resp_cost_monto = resp_cost_monto;
                respCostoTask.resp_cost_desc = resp_cost_desc;
                respCostoTask.resp_cost_esta = resp_cost_esta;
            }
        },
        resetRespCosto: (state, action) => {
            console.log("STATE RESETBEFORE RESPUESTA: ");
            console.log(state.respCostos);
            state.respCostos.length = 0;
            console.log("STATE RESET RESPUESTA: ");
            console.log(state.respCostos);
            return state;
        },

    },
    extraReducers(builder) {
        // login user
        builder
            .addCase(listRespCostos.pending, (state, action) => {
                console.log("GetrespCostos Pending");
            })
            .addCase(listRespCostos.fulfilled, (state, action) => {
                console.log("GetrespCostos Fullfilled");
                state.respCostos.length = 0;
                action.payload.map(data => {
                    // console.log("data from add respCostos:")
                    // console.log(data);
                    if (!state.respCostos.find(respCosto => respCosto.resp_cost_id === data.resp_cost_id))
                        state.respCostos.push(data);
                    return state;
                });
                console.log("state last")
                console.log(state.respCostos);
                state.stateResp = 'void';
                return state;
            })
            .addCase(listRespCostos.rejected, (state, action) => {
                console.log("GetrespCostos Rejected");
            })
            // register user
            .addCase(createRespCostos.pending, (state, action) => {
                console.log("CreaterespCostos Pending");
            })
            .addCase(createRespCostos.fulfilled, (state, action) => {
                console.log("CreaterespCostos FullFilled");
            })
            .addCase(createRespCostos.rejected, (state, action) => {
                console.log("CreaterespCostos Rejected");
            })
            // get user details
            .addCase(updateRespCostos.pending, (state, action) => {
                console.log("UpdaterespCostos Pending");
            })
            .addCase(updateRespCostos.fulfilled, (state, { payload }) => {
                console.log("UpdaterespCostos FullFilled");
                state.stateResp = 'loaded';
                return state;
            })
            .addCase(updateRespCostos.rejected, (state, { payload }) => {
                console.log("UpdaterespCostos Rejected");
            })
            // check if user is loggedIn
            .addCase(deleteRespCostos.pending, (state, action) => {
                console.log("DeleterespCostos Pending");
            })
            .addCase(deleteRespCostos.fulfilled, (state, { payload }) => {
                console.log("DeleterespCostos FullFilled");

            })
            .addCase(deleteRespCostos.rejected, (state, { payload }) => {
                console.log("DeleterespCostos Rejected");
            })
    },
})
export const { addRespCosto, deleteRespCosto, updateRespCosto, agregarRespCosto, resetRespCosto, resetStateRespCosto, resetAllRespCosto } = respCostoSlice.actions;
export default respCostoSlice.reducer;