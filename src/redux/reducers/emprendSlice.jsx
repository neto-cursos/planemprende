import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import ApiAuth from '../../services/ApiAuth';

const POSTS_URL = '/misemprendimientos';
const initialState = {
    emprs: [],
    status: 'idle',
    error: null,
    errores: [],
    empr_id_activo: '',
    empr_nomb_activo: '',
    operation:'none',
}

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

export const addNewEmpr = createAsyncThunk('emprs/addNewEmprs', async (initialPost) => {
    const response = await ApiAuth().post('/nuevoempr', initialPost).then(response => {
        return response.data
    })
    return response;
});
export const removeEmpr = createAsyncThunk('emprs/removeEmprs', async (datos) => {
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

export const queryEmpr = createAsyncThunk('emprs/queryEmprs', async (datos) => {
    const response = await ApiAuth().post('/queryempr', datos).then(response => {
        return response.data;
    })
    return response;
});
export const emprendSlice = createSlice({
    name: 'emprendimientos',
    //initialState:[],
    initialState: initialState,
    reducers: {
        reset:(state,action) => {
            state=initialState;
            return state;
        },
        addEmprend: {
            reducer(state, action) {
                // console.log(state, action);
                state.emprs.push(action.payload);
            },
            prepare(nombre, rubro, tipo, descripcion) {
                return {
                    payload: {
                        id: nanoid(),
                        empr_nomb: nombre,
                        empr_rubro: rubro,
                        empr_tipo: tipo,
                        empr_desc: descripcion,
                        empr_esta: 1,
                    }
                }
            }
        },
        getEmprendFromDB: (state, action) => {
            state.emprs.concat(action.payload);
        },
        deleteEmprend: (state, action) => {
            // console.log(action.payload);
            //fin devuelve undefined si no lo encuentra
            const emprendFound = state.emprs.find(empr => empr.empr_id === action.payload)
            if (emprendFound) {
                state.emprs.splice(state.emprs.indexOf(emprendFound), 1)
            }

        },
        updateEmprend: (state, action) => {
            const { id, nombre, rubro, tipo, estado, descripcion } = action.payload;
            const emprendTask = state.emprs.find(emprend => emprend.id === id)
            if (emprendTask) {
                emprendTask.nombre = nombre;
                emprendTask.rubro = rubro;
                emprendTask.tipo = tipo;
                emprendTask.estado = estado;
                emprendTask.descripcion = descripcion;
            }
        }
        ,
        resetEmprendActiva: (state, action) => {
            state.empr_id_activo = '';
            state.empr_nomb_activo = '';
            state.errores.length = 0;
        },
        setEmprStatus: (state, action) => {
            state.status = action.payload;
        }

    },
    extraReducers(builder) {
        builder
            .addCase(fetchEmprs.pending, (state, action) => {
                state.status = 'loading'
                console.log("EmprendimientoSlice Pending")
            })
            .addCase(fetchEmprs.fulfilled, (state, action) => {
                action.payload.map(emprs => {
                    // console.log(emprs);
                    if (state.operation === 'updated') {
                        const emprendTask = state.emprs.find(emprend => emprend.empr_id ===Number( emprs.empr_id))
                        if (emprendTask) {
                            emprendTask.empr_nomb = emprs.empr_nomb;
                            emprendTask.empr_rubro = emprs.empr_rubro;
                            emprendTask.empr_tipo = emprs.empr_tipo;
                            emprendTask.empr_esta = emprs.empr_esta;
                        }
                    } else {
                        if (!state.emprs.find(emprend => emprend.empr_id === emprs.empr_id))
                            state.emprs = state.emprs.concat(emprs);
                    }
                });
                sessionStorage.setItem("emprendimientos", JSON.stringify(action.payload));
                state.status = 'succeeded';
                state.operation="none";
            })
            .addCase(fetchEmprs.rejected, (state, action) => {
                state.status = 'failed'
                console.log("FetchEmprs Failed")
                state.error = action.error.message
            })
            .addCase(addNewEmpr.rejected, (state, action) => {
                state.status = 'failed'
                console.log("AddNewEmpr Failed")
                // console.log(action)
                //state.error = action.error.message
            })
            .addCase(addNewEmpr.pending, (state, action) => {
                state.status = 'pending'
                console.log("AddNewEmpr pending")
                //state.error = action.error.message
            })
            .addCase(addNewEmpr.fulfilled, (state, action) => {
                console.log("AddNewEmpr Fulfilled")
                state.status='fulfilled';
                state.errores.length = 0;
                if (action.payload.errores) {

                    console.log(action.payload);
                    Object.keys(action.payload.errores).forEach(key => {

                        // state.errores.push({id:key,
                        //     msg:action.payload.errores[key]})    
                        action.payload.errores[key].map(e2 => {
                            state.errores.push({
                                id: key,
                                msg: e2
                            })
                        })
                    })
                    state.operation='createdError';
                    //console.log(action.payload.errores.empr_nomb)
                } else {
                    //state.posts.push(action.payload);
                    state.empr_id_activo = action.payload.empr_id;
                    state.empr_nomb_activo = action.payload.empr_nomb;
                    //state.status = 'idle';
                    state.operation='created';
                }

                //state.posts.push(action.payload)
            })
            .addCase(removeEmpr.pending, (state, action) => {
                state.status = 'pending'
                console.log("RemoveEmpr Pending")
            })
            .addCase(removeEmpr.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                console.log("RemoveEmpr fulfilled")

            })
            .addCase(removeEmpr.rejected, (state, action) => {
                state.status = 'failed'
                console.log("RemoveEmpr Failed")
                state.error = action.error;
                // console.log('STATEERROR')
                if (action.error)
                    console.log(action);
                if (action.error.message)
                    state.errores = [{ id: nanoid(), msg: action.error.message }]

            })
            .addCase(updateEmprs.pending, (state, action) => {
                state.status = 'pending'
                console.log("UndateEmprs PENDING")
            })
            .addCase(updateEmprs.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                console.log("updateEmprs fulfilled")
                state.errores.length = 0;
                if (action.payload.errores) {

                    console.log(action.payload);
                    Object.keys(action.payload.errores).forEach(key => {
                        // state.errores.push({id:key,
                        //     msg:action.payload.errores[key]})    
                        action.payload.errores[key].map(e2 => {
                            state.errores.push({
                                id: key,
                                msg: e2
                            })
                        })
                    })
                    state.operation='updatedError';
                    //console.log(action.payload.errores.empr_nomb)
                } else {
                    //state.posts.push(action.payload);
                    state.empr_id_activo = action.payload.empr_id;
                    state.empr_nomb_activo = action.payload.empr_nomb;
                    state.operation='updated';
                }
                

            })
            .addCase(updateEmprs.rejected, (state, action) => {
                state.status = 'failed'
                console.log("UpdateEmprs FAILED")

            })
            .addCase(queryEmpr.fulfilled,(state,action)=>{
                state={...state,empr_nomb_activo:action.payload.empr_nomb};
                return state;
            })
    }

})

export const selectAllEmprs = (state) => state.emprendimientos.emprs;
export const getEmprsStatus = (state) => state.emprendimientos.status;
export const getEmprsError = (state) => state.emprendimientos.error;

export const { addEmprend, deleteEmprend, updateEmprend, resetEmprendActiva,
    setEmprStatus,reset } = emprendSlice.actions
export default emprendSlice.reducer;