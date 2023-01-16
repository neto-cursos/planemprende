import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import {
    listCronogramas, listAllCronogramas, updateCronogramas, deleteCronogramas,
    createCronogramas, checkIfCronReg
} from './../actions/cronogramaActions';

const formatDate = (date) => {
    console.log("DATE"); console.log(date);
    let end = 0;
    end = date.indexOf("/");
    const day = date.slice(0, end);
    date = date.slice(end + 1);
    console.log("DATE2"); console.log(date);
    end = date.indexOf("/");
    const month = date.slice(0, end);
    date = date.slice(end + 1);
    console.log("DATE3"); console.log(date);
    const year = date.slice(0);
    // while(date.indexOf("/")!==-1){
    //     fecha+=date.splice(start,date.indexOf("/"));

    //   }
    const fecha = new Date(year, month, day);
    return (fecha)
}
const initialState = {
    sendDb: false,
    state: '',
    list: '',
    usr_id: -1,
    current_cron_id: '',
    current_cron: {
        idState: 'new',
        loaded: false,
        project: '',
        project_name: '',
        statecron: 'idle',
        empr_id: '',
        cron_id: '',
        cron: [
            // {
            //     // id:nanoid(),
            //     id: '1',
            //     empr_id: '',
            //     start: '28/10/2022',
            //     end: '28/11/2022',
            //     name: "Holis",
            //     progress: 0,
            //     type: "project",
            //     hideChildren: false,
            //     displayorder: 1,
            //     crond_done: false,
            //     cron_id: nanoid(),
            // },
            // {
            //     id:nanoid(),
            //     empr_id:'28',
            //     type:"task",
            //     project:"Emprendimiento",
            //     displayOrder:2,
            //     name:"Comprar manzanas",
            //     start:'02/10/2022',
            //     end:'14/10/2022',
            //     responsable:"Neto Rodriguez",
            //     dependencies:[],
            //     cantidad:"2",
            //     unidad:"unidades",
            //     monto:"400Bs",
            //     notas:"se compró a tiempo",
            //     progress:0,
            //     cron_done:true,
            //     estado:'ontime',        
            // },
        ]
    },
    cronogramas: [
        // {
        //     idState: 'new',
        //     loaded: false,
        //     project: '',
        //     project_name: '',
        //     statecron: 'idle',
        //     empr_id: '',
        //     cron_id: '',
        //     cron: [
        //         // {
        //         //     // id:nanoid(),
        //         //     id: '1',
        //         //     empr_id: '',
        //         //     start: '28/10/2022',
        //         //     end: '27/11/2022',
        //         //     name: "",
        //         //     progress: 0,
        //         //     type: "project",
        //         //     hideChildren: false,
        //         //     displayorder: 1,
        //         //     crond_done: false,
        //         //     cron_id: nanoid(),
        //         // },
        //     ]
        // },
    ]
}
export const cronogramaSlice = createSlice({
    name: 'cronogramas',
    //initialState:[],
    initialState: initialState,
    reducers: {
        reset: (state, action) => {
            state = initialState;
            return state;
        },
        iniciarCronograma: (state, action) => {
            state.cronogramas.push(action.payload);
            actual = action.payload.cron_id;
            return { ...state, current_cron_id: actual }
        },
        checkCronogramaLocal: (state, action) => {
            state.cronogramas.map((crons) => {

                if (crons.empr_id == action.payload) {
                    state.current_cron_id = crons.cron_id;
                    state.state = 'found';
                    console.log("ENCONTRADO CRONOS"+crons.cron_id);
                }
            })
            if (state.state !== 'found') {
                state.state = 'not found';
                console.log("NO ENCONTRADO CRONOS")
            }
            return state;
        },
        findCronogramaLocal: (state, action) => {
            const cronograma = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron_id);
            console.log(state.cronogramas);
            console.log("FindCronogramaLocal")
            console.log(state.current_cron_id);
            console.log("FindCronogramaLocal")
            console.log(cronograma)
            if (cronograma) {
                cronograma.cron.map(t => { t.dependencies = []; t.progress = 0 })
                const cronograma_actual = {
                    idState: 'db',
                    loaded: false,
                    project: '',
                    project_name: '',
                    statecron: 'idle',
                    empr_id: '',
                    cron_id: '',
                    cron: cronograma.cron,

                }
                state.current_cron = cronograma;
            } else {

            }

        },
        addCronograma: (state, action) => {
            console.log(state);
            const cronograma = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron_id);
            if (cronograma) {
                cronograma.cron.push(action.payload);
                cronograma.statecron = 'created';
                state.current_cron = cronograma;
            }
        },
        iniciarNuevoCron: (state, action) => {
            if (state.state === 'not found') {
                const cronog = {
                    idState: 'new',
                    loaded: false,
                    project: '',
                    project_name: '',
                    statecron: 'idle',
                    empr_id: action.payload.empr_id,
                    cron_id: action.payload.cron_id,
                    cron:[action.payload],
                }
                state.cronogramas.push(cronog);
                state.current_cron=cronog;
                // state.state='found';
                state.current_cron_id=action.payload.cron_id;
            }
            return state;
        },
        agregarActividad: (state, action) => {
            const crons = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron_id);
            const cronogramaTask = crons.cron.find(cronograma => cronograma.cron_id === action.payload.cron_id);
            // if (cronogramaTask) {

            // }else{
            //     cronogramaTask.cron.push(action.payload);
            //     crons.statecron = 'created';
            // }
            // action.payload.map(data => {
            //     if (!state.cron.find(cronograma => cronograma.id === data.id))
            //         state.cron.push(data);
            //     return state;
            // });
            console.log("state last")
            console.log(state);
        },
        deleteCronograma: (state, action) => {
            console.log(action.payload);
            //fin devuelve undefined si no lo encuentra
            const crons = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron_id);
            const nodo = crons.cron.find(cronograma => cronograma.id === action.payload)
            if (nodo) {
                crons.cron.splice(crons.cron.indexOf(nodo), 1)
            }
            if (crons)
                state.current_cron = crons;
        },
        updateCronograma: (state, action) => {
            const { id, empr_id, name, start, end,
                responsable, dependencies, cantidad, unidad, monto, costounitario, type,
                notas, cron_done, progress, project, displayOrder
                // ,color
            } = action.payload;
            const crons = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron_id);
            const cronogramaTask = crons.cron.find(cronograma => cronograma.id === id)
            if (cronogramaTask) {
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
                cronogramaTask.notas = notas;
                cronogramaTask.cron_done = cron_done;
                cronogramaTask.progress = progress;
                cronogramaTask.project = project;
            }
            crons.statecron = 'updated';
            if (crons)
                state.current_cron = crons;


        },
        resetCronograma: (state, action) => {
            const crons = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron_id);
            crons.cron.length = 0;
        },
        changeHideCronograma: (state, action) => {
            const crons = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron_id);
            console.log("ACTION changehidecronograma");
            console.log(action);
            const cronogramaTask = crons.cron.find(cronograma => cronograma.id === action.payload.id)
            if (cronogramaTask) {
                cronogramaTask.hideChildren = action.payload.hideChildren
            }
        },
        changeProjectName: (state, action) => {
            const crons = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron_id);
            const cronogramaTask = crons.cron.find(cronograma => cronograma.id === '1')
            if (cronogramaTask) {
                cronogramaTask.name = action.payload.project_name;
                crons.project_name = action.payload.project_name;
                crons.project = String(action.payload.project_id);
                state.current_cron = crons;
            }
            if (state.state == "not found") {
                state.sendDb = true;
            }
            return state;
        },
        changeCron_done: (state, action) => {
            const crons = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron_id);
            const cronogramaTask = crons.cron.find(cronograma => cronograma.id === action.payload.id)
            if (cronogramaTask) {
                cronogramaTask.cron_done = action.payload.value;
            }
        },
        changeStatecron: (state, action) => {
            const crons = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron_id);
            if (crons) {
                crons.statecron = action.payload;
                state.current_cron = crons;
            }
        },
        changeIdState: (state, action) => {
            const crons = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron_id);
            crons.idState = action.payload;
            console.log("ACTION ID")
            console.log(action.payload);
            return state;
        },
        resetCurrentCronograma: (state, action) => {
            state.current_cron = {};
            state.state='';
            state.current_cron_id='';
            return state;
        }

    },
    extraReducers(builder) {
        // login user
        builder
            .addCase(listAllCronogramas.pending, (state, action) => {
                console.log("ListCronogramas Pending");

            })
            .addCase(listAllCronogramas.fulfilled, (state, action) => {
                console.log("ListCronogramas fulfilled");
                console.log(action.payload);
                if (action.payload.crons.length > 0) {
                    action.payload.crons.map((e) => {
                        const crons = state.cronogramas.find(cronograma => cronograma.cron_id === e[0].cron_id);
                        console.log(e[0].id);
                        if (crons) {
                            crons.idState = 'db';
                            crons.loaded = false;
                            crons.project = '';
                            crons.project_name = '';
                            crons.statecron = 'idle';
                            crons.empr_id = e[0].empr_id;
                            crons.cron = e;

                        } else {
                            const object = {
                                idState: 'db',
                                loaded: false,
                                project: '',
                                project_name: '',
                                statecron: 'idle',
                                empr_id: e[0].empr_id,
                                cron_id: e[0].cron_id,
                                cron: e,
                            };
                            state.cronogramas.push(object);
                        }
                    })

                }
                state.list = 'ready';
                return state;
            })
            .addCase(listAllCronogramas.rejected, (state, action) => {
                console.log("GetCronograma rejected");

            })
            .addCase(listCronogramas.pending, (state, action) => {
                console.log("GetCronograma Pending");
            })
            .addCase(listCronogramas.fulfilled, (state, action) => {
                console.log("GetCronograma Fullfilled");
                const crons = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron);
                action.payload.map(data => {
                    console.log("data from add respuestas:")
                    console.log(data);
                    if (!crons.cron.find(cronograma => cronograma.id === data.id))
                        crons.cron.push(data);
                    // return state;
                });
                console.log("state last")
                console.log(state);

            })
            .addCase(checkIfCronReg.rejected, (state, action) => {
                console.log("checkIfCronReg Rejected");
            })
            // register user
            .addCase(checkIfCronReg.pending, (state, action) => {
                console.log("checkIfCronReg Pending");
            })
            .addCase(checkIfCronReg.fulfilled, (state, action) => {
                console.log("checkIfCronReg FullFilled");

                if (action.payload.habilitado == 'no') {
                    // crons.idState = 'exists';
                    state.current_cron_id = action.payload.cron_id;
                    state.state = "in db";

                }
                if (action.payload.habilitado == 'yes') {
                    // crons.idState = 'readytocreate';
                    state.state = "not found";
                }

            })
            .addCase(listCronogramas.rejected, (state, action) => {
                console.log("GetCronograma Rejected");
            })
            // register user
            .addCase(createCronogramas.pending, (state, action) => {
                console.log("Createcronogramas Pending");
            })
            .addCase(createCronogramas.fulfilled, (state, action) => {
                console.log("Createcronogramas FullFilled");
                // state.idState = 'new';
                // state.cronogramas.map(e=>{
                //     e.
                //     const crons = state.cronogramas.find(cronograma => cronograma.cron_id === state.current_cron.cron[0].cron_id);   
                // })
                // state.cronogramas.

                // state.idState='db';
                // state.state='found';
                state.sendDb = false;
                return state;

            })
            .addCase(createCronogramas.rejected, (state, action) => {
                console.log("Createcronogramas Rejected");
            })
            // get user details
            .addCase(updateCronogramas.pending, (state, action) => {
                console.log("Updatecronogramas Pending");
            })
            .addCase(updateCronogramas.fulfilled, (state, action) => {
                console.log("Updatecronogramas FullFilled");
                console.log(action);

            })
            .addCase(updateCronogramas.rejected, (state, { payload }) => {
                console.log("Updatecronogramas Rejected");
            })
            // check if user is loggedIn
            .addCase(deleteCronogramas.pending, (state, action) => {
                console.log("Deletecronogramas Pending");
            })
            .addCase(deleteCronogramas.fulfilled, (state, { payload }) => {
                console.log("DeleteCronogramas FullFicled");

            })
            .addCase(deleteCronogramas.rejected, (state, { payload }) => {
                console.log("DeleteCronogramas Rejected");
            })
    },
})
export const { iniciarCronograma, addCronograma, deleteCronograma, updateCronograma, agregarCronograma,
    changeIdState, resetCronograma, changeHideCronograma, changeProjectName, changeCron_done, changeStatecron,iniciarNuevoCron,
    resetCurrentCronograma, checkCronogramaLocal, findCronogramaLocal, reset } = cronogramaSlice.actions
export default cronogramaSlice.reducer;