import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { listActividades, updateActividades, deleteActividades, createActividades } from './../actions/ActividadActions'

const formatDate = (date) => {
    // console.log("DATE");console.log(date); 
    let end=0;
    end=date.indexOf("/");
    const day=date.slice(0,end);
    date=date.slice(end+1);
    // console.log("DATE2");console.log(date);  
    end=date.indexOf("/");
    const month=date.slice(0,end);
    date=date.slice(end+1);
    // console.log("DATE3");console.log(date);
    const year=date.slice(0);
    const fecha=new Date(year,month,day);
    return (fecha)
  }
const initialState = {
    loaded: false,
    project:'',
    cron:[{
        // id:nanoid(),
        id:'1',
        empr_id:'28',
        start:'01/10/2022',
        end:'23/10/2022',
        name:"Emprendimiento",
        progress:0,
        type:"project",
        hideChildren:false,
        displayOrder:1,
    },
    {
        id:nanoid(),
        empr_id:'28',
        type:"task",
        project:"Emprendimiento",
        displayOrder:2,
        name:"Comprar manzanas",
        start:'02/10/2022',
        end:'14/10/2022',
        responsable:"Neto Rodriguez",
        dependencies:[],
        cantidad:"2",
        unidad:"unidades",
        monto:"400Bs",
        notas:"se compró a tiempo",
        progress:0,
        cron_done:true,
        estado:'ontime',        
    },

]
} 
export const Actividadeslice = createSlice({
    name: 'Actividades',
    //initialState:[],
    initialState: initialState,
    reducers: {
        reset:(state,action) => {
            state=initialState;
            return state;
        },
        addCronograma: (state, action) => {
            //action.type or 
            //action.payload
            console.log(state);
            /**
             * En react no se puede usar push xq
             * react maneja datos inmutables
             *debería ser así [...state,action.payload]
             *en redux se permite usar push
             *sigue siendo inmutable
             */
            /*
            
                         action.payload.map(data => {
                            console.log("data from add respuestas:")
                            console.log(data);
                            if(!state.find(respuesta => respuesta.id == data.resp_id))
                            state.push(data);
                            return state;
                        });
                        console.log("state last")
                        console.log(state);*/
            state.cron.push(action.payload);
        },
        agregarCronograma: (state, action) => {
            action.payload.map(data => {
                // console.log("data from add respuestas:")
                // console.log(data);
                if (!state.cron.find(cronograma => cronograma.id === data.id))
                    state.cron.push(data);
                return state;
            });
            // console.log("state last")
            // console.log(state);
        },
        deleteCronograma: (state, action) => {
            // console.log(action.payload);
            //fin devuelve undefined si no lo encuentra
            const nodo = state.cron.find(cronograma => cronograma.id === action.payload)
            if (nodo) {
                state.cron.splice(state.cron.indexOf(nodo), 1)
            }
        },
        updateCronograma: (state, action) => {
            const { id, empr_id, name,start,end,
                responsable,dependencies,cantidad,unidad,monto,costounitario,type,
                notas,cron_done,progress,project,displayOrder
                // ,color
             } = action.payload;
            const cronogramaTask = state.cron.find(cronograma => cronograma.id === id)
            if (cronogramaTask) {
                // cronogramaTask.cron_id = cron_id;
                cronogramaTask.empr_id = empr_id;
                cronogramaTask.type = type;
                cronogramaTask.name = name;
                cronogramaTask.start = start;
                cronogramaTask.end = end;
                cronogramaTask.responsable = responsable;
                cronogramaTask.dependencies = dependencies;
                cronogramaTask.cantidad = cantidad;
                cronogramaTask.unidad = unidad;
                cronogramaTask.monto = monto;
                cronogramaTask.costounitario = costounitario;
                // cronogramaTask.color = color;
                cronogramaTask.notas = notas;
                cronogramaTask.cron_done = cron_done;
                cronogramaTask.progress = progress;
                cronogramaTask.project = project;
                //cronogramaTask.displayOrder = displayOrder;
                
            }
        },
        resetCronograma: (state, action) => {
            state.cron.length = 0;
        },
        changeHideCronograma: (state, action) => {
            // console.log("ACTION changehidecronograma");
            // console.log(action);
            const cronogramaTask = state.cron.find(cronograma => cronograma.id === action.payload.id)
            if(cronogramaTask){
                cronogramaTask.hideChildren=action.payload.hideChildren
            }
        },
        changeProjectName: (state, action) => {
            const cronogramaTask = state.cron.find(cronograma => cronograma.id === '1')
            if(cronogramaTask){
                cronogramaTask.name=action.payload;
                state.project=action.payload;
            }
            
        },
        changeCron_done: (state, action) => {
            const cronogramaTask = state.cron.find(cronograma => cronograma.id === action.payload.id)
            if(cronogramaTask){
                cronogramaTask.cron_done=action.payload.value;
            }            
        },

    },
    extraReducers(builder) {
        // login user
        builder
            .addCase(listActividades.pending, (state, action) => {
                console.log("GetCronograma Pending");
            })
            .addCase(listActividades.fulfilled, (state, action) => {
                // console.log("GetCronograma Fullfilled");
                action.payload.map(data => {
                    console.log("data from add respuestas:")
                    console.log(data);
                    if (!state.cron.find(cronograma => cronograma.id === data.id))
                        state.cron.push(data);
                    return state;
                });
                // console.log("state last")
                // console.log(state);

            })
            .addCase(listActividades.rejected, (state, action) => {
                console.log("GetCronograma Rejected");
            })
            // register user
            .addCase(createActividades.pending, (state, action) => {
                console.log("CreateActividades Pending");
            })
            .addCase(createActividades.fulfilled, (state, action) => {
                console.log("CreateActividades FullFilled");
            })
            .addCase(createActividades.rejected, (state, action) => {
                console.log("CreateActividades Rejected");
            })
            // get user details
            .addCase(updateActividades.pending, (state, action) => {
                console.log("UpdateActividades Pending");
            })
            .addCase(updateActividades.fulfilled, (state, { payload }) => {
                console.log("UpdateActividades FullFilled");
            })
            .addCase(updateActividades.rejected, (state, { payload }) => {
                console.log("UpdateActividades Rejected");
            })
            // check if user is loggedIn
            .addCase(deleteActividades.pending, (state, action) => {
                console.log("DeleteActividades Pending");
            })
            .addCase(deleteActividades.fulfilled, (state, { payload }) => {
                console.log("DeleteActividades FullFicled");

            })
            .addCase(deleteActividades.rejected, (state, { payload }) => {
                console.log("DeleteActividades Rejected");
            })
    },
})
export const { addCronograma, deleteCronograma, updateCronograma, agregarCronograma, resetCronograma,changeHideCronograma,changeProjectName,changeCron_done,reset } = Actividadeslice.actions
export default Actividadeslice.reducer;