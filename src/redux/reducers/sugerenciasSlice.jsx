import { createSlice,nanoid } from '@reduxjs/toolkit'
import { getSugerencias,updateSugerencias,
    deleteSugerencias,createSugerencias} from './../actions/sugerenciaActions'

const initialState=[
    {
        suge_id:'',
        preg_id:'',
        modu_nume:'',
        suge_tipo:'',
        suge_rubro:'',
        suge_text:'',
        suge_link:'',
    }
]
export const sugerenciasSlice=createSlice({
    name:'sugerencias',
    //initialState:[],
    initialState:initialState,
    reducers:{
        reset:(state,action) => {
            state=initialState;
            return state;
        },
        addSugerencia:(state,action) => {
            //action.type or 
            //action.payload
            console.log(state,action);
            /**
             * En react no se puede usar push xq
             * react maneja datos inmutables
             *debería ser así [...state,action.payload]
             *en redux se permite usar push
             *sigue siendo inmutable
             */
            state.push(action.payload);
        },
        deleteSugerencia:(state,action)=>{
            console.log(action.payload);
            //fin devuelve undefined si no lo encuentra
            const nodo=state.find(respuesta=>respuesta.id===action.payload)
            if (nodo){
                state.splice(state.indexOf(nodo),1)

            }
                

        },
        updateSugerencia:(state,action)=>{
            const {suge_id,preg_id,modu_nume,suge_tipo,suge_rubro,suge_text,suge_link}=action.payload;
            const sugerenciaTask=state.find(sugerencias=>sugerencias.suge_id===suge_id)
            if(sugerenciaTask){
                sugerenciaTask.suge_id=suge_id;
                sugerenciaTask.preg_id=modu_nume;
                sugerenciaTask.modu_nume=suge_tipo;
                sugerenciaTask.suge_tipo=suge_rubro;
                sugerenciaTask.suge_rubro=suge_text;
                sugerenciaTask.suge_text=suge_link;                
            }
        }
    },
    extraReducers(builder) {
        // login user
        builder
            .addCase(getSugerencias.pending, (state, action) => {
                console.log("getSugerencias Pending");
            })
            .addCase(getSugerencias.fulfilled, (state, action) => {
                console.log("getSugerencias Fullfilled");
                action.payload.map(data => {
                    console.log("data from get sugerencias:")
                    console.log(data);
                    if(!state.find(sugerencia => sugerencia.suge_id === data.suge_id))
                    state.push(data);
                    return state;
                });
            })
            .addCase(getSugerencias.rejected, (state, action) => {
                console.log("getSugerencias Rejected");
            })
            // register user
            .addCase(createSugerencias.pending, (state, action) => {
                console.log("createSugerencias Pending");
            })
            .addCase(createSugerencias.fulfilled, (state, action) => {
                console.log("createSugerencias FullFilled");
            })
            .addCase(createSugerencias.rejected, (state, action) => {
                console.log("createSugerencias Rejected");
            })
            // get user details
            .addCase(updateSugerencias.pending, (state, action) => {
                console.log("updateSugerencias Pending");
            })
            .addCase(updateSugerencias.fulfilled, (state, { payload }) => {
                console.log("updateSugerencias FullFilled");
            })
            .addCase(updateSugerencias.rejected, (state, { payload }) => {
                console.log("updateSugerencias Rejected");
            })
            // check if user is loggedIn
            .addCase(deleteSugerencias.pending, (state, action) => {
                console.log("deleteSugerencias Pending");
            })
            .addCase(deleteSugerencias.fulfilled, (state, { payload }) => {
                console.log("deleteSugerencias FullFilled");

            })
            .addCase(deleteSugerencias.rejected, (state, { payload }) => {
                console.log("deleteSugerencias Rejected");
            })
    },
})
export const {addSugerencia,deleteSugerencia,updateSugerencia,reset}=sugerenciasSlice.actions
export default sugerenciasSlice.reducer;