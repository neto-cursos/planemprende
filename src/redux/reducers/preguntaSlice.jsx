import { createSlice, nanoid } from '@reduxjs/toolkit'
import { getPreguntas, updatePreguntas, 
    deletePreguntas, createPreguntas,listPreguntas } from './../actions/preguntaActions'

const initialState ={
    loaded:false,
    preguntas:[],
    byModule:false,
}
export const preguntaSlice = createSlice({
    name: 'preguntas',
    //initialState:[],
    initialState: initialState,
    reducers: {
        reset:(state,action) => {
            state=initialState;
            return state;
        },
        setPregunta: (state, action) => {
            console.log(state, action);
            action.payload.map(data => {

                state.preguntas = state.preguntas.concat(data);
            });
        },
        addPregunta: (state, action) => {
            console.log(state, action);
            state.preguntas.push(action.payload);
        },
        deletePregunta: (state, action) => {
            console.log(action.payload);
            const nodo = state.preguntas.find(pregunta => pregunta.id === action.payload)
            if (nodo) {
                state.preguntas.splice(state.indexOf(nodo), 1)
            }
        },
        updatePregunta: (state, action) => {
            const { preg_id,
                modu_id,
                preg_nume,
                preg_text,
                preg_desc, } = action.payload;
            const preguntaTask = state.preguntas.find(pregunta => pregunta.id === preg_id)
            if (preguntaTask) {
                preguntaTask.preg_id = preg_id;
                preguntaTask.modu_id = modu_id;
                preguntaTask.preg_nume = preg_nume;
                preguntaTask.preg_text = preg_text;
                preguntaTask.preg_desc = preg_desc;
            }
        },
    },
    extraReducers(builder) {
        // login user
        builder
            .addCase(getPreguntas.pending, (state, action) => {
                console.log("Getrespuestas Pending");
            })
            .addCase(getPreguntas.fulfilled, (state, action) => {
                state.preguntas.length=0;
                console.log("Getrespuestas Fullfilled");
                console.log(state, action);
                //state.push(action.payload);
                action.payload.map(data => {

                    console.log("data from get preguntas:")
                    console.log(data);
                    //state=state.push(data);
                    if(!state.preguntas.find(pregunta => pregunta.preg_id === data.preg_id))
                    state.preguntas.push(data);
                    //console.log("state from get preguntas:")
                    //console.log(state);
                });
                state.loaded=true;
                state.byModule=true;
            })
            .addCase(getPreguntas.rejected, (state, action) => {
                console.log("Getrespuestas Rejected");
            })
            // register user
            .addCase(createPreguntas.pending, (state, action) => {
                console.log("Createrespuestas Pending");
            })
            .addCase(createPreguntas.fulfilled, (state, action) => {
                console.log("Createrespuestas FullFilled");
            })
            .addCase(createPreguntas.rejected, (state, action) => {
                console.log("Createrespuestas Rejected");
            })
            // get user details
            .addCase(updatePreguntas.pending, (state, action) => {
                console.log("updatePreguntas Pending");
            })
            .addCase(updatePreguntas.fulfilled, (state, { payload }) => {
                console.log("updatePreguntas FullFilled");
            })
            .addCase(updatePreguntas.rejected, (state, { payload }) => {
                console.log("updatePreguntas Rejected");
            })
            // check if user is loggedIn
            .addCase(deletePreguntas.pending, (state, action) => {
                console.log("Deleterespuestas Pending");
            })
            .addCase(deletePreguntas.fulfilled, (state, { payload }) => {
                console.log("Deleterespuestas FullFilled");

            })
            .addCase(deletePreguntas.rejected, (state, { payload }) => {
                console.log("Deleterespuestas Rejected");
            })
            .addCase(listPreguntas.pending, (state, action) => {
                console.log("Deleterespuestas Pending");
            })
            .addCase(listPreguntas.fulfilled, (state, action) => {
                console.log("Deleterespuestas FullFilled");
                state.preguntas.length=0;
                action.payload.map(data => {
                    if(!state.preguntas.find(pregunta => pregunta.preg_id === data.preg_id))
                    state.preguntas.push(data);
                });
                state.loaded=true;
                state.byModule=false;
            })
            .addCase(listPreguntas.rejected, (state, { payload }) => {
                console.log("Deleterespuestas Rejected");
            })
    },
})
export const { addPregunta, deletePregunta, updatePregunta,reset } = preguntaSlice.actions
export default preguntaSlice.reducer;