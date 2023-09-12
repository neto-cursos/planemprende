import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
//import from Cronograma Folder
import { ViewMode, Gantt } from "./../Cronograma/Cronograma";
//import from same folder
import { ViewSwitcher } from "./view-switcher";
import { getStartEndDateForProject, initTasks } from "./CronogramsHelper";
//modal crud
import ActivitiesModal from "./CrudTasks/ActivitiesModal";
//import thunks
import {
    listCronogramas, listAllCronogramas, updateCronogramas,
    deleteCronogramas, createCronogramas, checkIfCronReg
} from './../../redux/actions/cronogramaActions';
//import reduxSlices
import {
    addCronograma, changeHideCronograma, changeProjectName,
    changeStatecron, checkCronogramaLocal, deleteCronograma,
    updateCronograma, findCronogramaLocal, resetCurrentCronograma, iniciarNuevoCron,
    setSaved,
} from "./../../redux/reducers/cronogramaSlice";
//import dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/es';
//import validation
import * as yup from 'yup';
import { setLocale } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { getSchema } from '../../utils/Validation/Validation';
//import Styles
import { Button, Modal, } from "@mui/material";
import "./Cronograma.css";
import { ConstructionOutlined, VerticalAlignTopRounded } from "@mui/icons-material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
//import react-hook-form
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { nanoid } from "nanoid";
//import notifications
import Notifications from './../Notifications';
import ConfirmDialog from './../Dialog';
//import messages
import { msgNotif } from "../../constants/messageNotifications";

import { agregarRespuesta, deleteRespuesta, resetRespuesta, resetStateResp } from './../../redux/reducers/respuestaSlice';
import { listRespuestas, updateRespuestas } from './../../redux/actions/respuesta2Actions';
import { createCanvas, getCanvas } from './../../redux/actions/CanvaActions';
import { setEmpr_id, resetEstado } from './../../redux/reducers/canvasSlice';
import { listRespCostos, updateRespCostos } from './../../redux/actions/respuestaCostoActions';
import { agregarRespCosto, deleteRespCosto, resetRespCosto, resetStateRespCosto } from './../../redux/reducers/respuestaCostoSlice';
import estrategia from './../../assets/icons/estrategia.png';

function getValidationErrors(err) {
    const validationErrors = {};
    err.inner.forEach(error => {
        if (error.path) {
            validationErrors[error.path] = error.message;
        }
    });
    return validationErrors;
}

const CronogramaData = () => {
    //preparation
    let columnWidth = 65; //start columnWidth default value
    dayjs.locale('es');
    const fecha = new Date();
    const [idmsg, setIdmsg] = useState(-1); //to select msg to show
    const [valueDate, setValueDate] = React.useState(dayjs(`${fecha.getFullYear()}-
      ${fecha.getMonth() + 1}-${fecha.getDate()}`));
    const [valueDate2, setValueDate2] = React.useState(dayjs(`${fecha.getFullYear()}-
      ${fecha.getMonth() + 1}-${fecha.getDate()}`));
    //get params
    const { empr_id } = useParams();
    //forms
    const [valueNotas, setValueNotas] = React.useState('');
    const [dependancies, setDependancies] = React.useState([]);
    const [showNotif, setShowNotif] = useState(false);
    const [errores, setErrores] = useState(null);
    const [dataSubmitted, setDataSubmitted] = useState();
    /*** Modal */
    const [isOpen, setIsOpen] = React.useState(false);
    const [idActiva, setIdActiva] = useState('');
    const [tareaActiva, setTareaActiva] = useState();
    const [hadErrors, setHadErrors] = useState(false);
    let erroresAux = [];//variable to store errors found on validation
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    /**Cronogramas Selector */
    const cronos = useSelector(state => state.cronogramas);
    const crons = useSelector(state => state.cronogramas.current_cron);
    const dispatch = useDispatch();
    const [tareas, setTareas] = useState([]);
    const [sendAction, setSendAction] = useState(false);
    const [isChecked, setIsChecked] = React.useState(true);
    const task = [];
    // const flag = useRef(false);
    const [flag, setFlag] = useState(false);
    //view state , tareas gotten from initTasks(), isChecked; 
    const [view, setView] = React.useState(ViewMode.Day);

    if (view === ViewMode.Year) {
        columnWidth = 350;
    } else if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }
    //yup
    yup.setLocale({
        mixed: {
            default: 'Error',
            required: 'Este campo es requerido',
        },
        number: {
            min: 'El número debe ser mayor a ${min}',
        },
        string: {
            required: 'Este campo es requerido',
        }
    });
    const schema = yup.object().shape({
        name: yup.string().required(),
        responsable: yup.string().required(),
        unidad: yup.string().required(),
        cantidad: yup.number().min(0),
        costounitario: yup.number().min(0),
    });
    //USE-EFFECT
    let userName = sessionStorage.getItem('usr_dt') ?
        JSON.parse(sessionStorage.getItem('usr_dt'))['user_name'] + ' ' + JSON.parse(sessionStorage.getItem('usr_dt'))['user_apellido'] : '';
    useLayoutEffect(() => {
        if (cronos.list === '') {
            const userid = sessionStorage.getItem('usr_dt') ?
                JSON.parse(sessionStorage.getItem('usr_dt'))['user_id'] : '';
            if (userid !== '') {
                dispatch(listAllCronogramas({ id: userid }))
            }
        }
    }, []);//obtiene los cronogramas asociados al usuario cambia list to ready

    useEffect(() => {
        if (cronos.list === 'ready') {
            dispatch(checkCronogramaLocal(empr_id));
            //determines if state=found or not found
        }
    }, [cronos.list]);//it activate when cronos.list changed to 'ready'

    useEffect(() => {
        dispatch(resetCurrentCronograma());
        if (cronos.list === 'ready')
            dispatch(checkCronogramaLocal(empr_id));//does not depend on currentid
    }, []);

    const canvasSelect = useSelector(state => state.canvas);
    const { stateResp } = useSelector(state => state.respuestas);
    const respuestas = useSelector(state => state.respuestas.respuestas);
    const respuestasCostos = useSelector(state => state.respuestasCostos.respCostos);
    const addActivKey = () => {
        //leer el canvas enviando el empr_id
        dispatch(getCanvas({ empr_id: empr_id }));
        //leer las respuestas del modulo 7
        console.log('entro a addActivKey')
        //crear las actividades con el nombre, usr, monto 0, cantidad 0.
    }
    useEffect(() => {
        //if (canvasSelect.estado === 'loadedCanvasID' && canvasSelect.idState === 'db' && canvasSelect.datos.empr_id == empr_id) {
        if (canvasSelect.estado === 'loadedCanvasID' && canvasSelect.datos.empr_id == empr_id) {
            dispatch(listRespuestas({ canv_id: canvasSelect.datos.canv_id }));
            dispatch(listRespCostos({ canv_id: canvasSelect.datos.canv_id }));
            console.log("display responses")
        } else if (canvasSelect.idState === 'alreadyLoaded' && respuestas.length === 0) {
            // console.log("entro wey")
            dispatch(listRespuestas({ canv_id: canvasSelect.datos.canv_id }));
            dispatch(listRespCostos({ canv_id: canvasSelect.datos.canv_id }));
            console.log("display responses")
        }
    }, [canvasSelect])

    useEffect(() => {
        if (respuestas.length > 0 && crons.cron.length > 0) {
            console.log('preparar actividades modulo7');
            console.log(respuestas);
            console.log(canvasSelect.datos.canv_id)
            let taskAux = [];
            let taskAux2 = [];
            const displayorder = crons.cron.map(object => {
                return object.displayorder;
            });//gets displayorder vector
            let max = Math.max(...displayorder);//finds displayorder max value
            max = max === 0 ? 1 : max;
            const dateNow = new Date();
            respuestas.map(r => {
                if (r.modu_nume == 7 && r.canv_id == canvasSelect.datos.canv_id) {
                    if (typeof (r.resp_id) !== 'string') {
                        console.log('modu_nume7')
                        if (!crons.cron.find(respuesta => respuesta.resp_id === r.resp_id)) {
                            console.log(r);
                            const fechaInicio = `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`;
                            const fechaFin = `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`;
                            // const displayorder = crons.cron.map(object => {
                            //     return object.displayorder;
                            // });//gets displayorder vector
                            // let max = Math.max(...displayorder);//finds displayorder max value
                            // let vectorDep = [];//vector dependencies
                            // let vectorDep2 = [];
                            console.log(respuestasCostos);
                            console.log(r);
                            const respC = respuestasCostos.find(rc => (rc.resp_id_ref == r.resp_id_ref))
                            let costoU = 0;
                            if (respC != null) {
                                console.log("PLASS")
                                costoU = Number(respC.resp_cost_monto)
                            }
                            let task = {
                                empr_id: empr_id,
                                type: 'task',
                                project: '1',
                                name: r.resp_text,
                                start: fechaInicio,
                                end: fechaFin,
                                responsable: '',
                                dependencies: [],
                                cantidad: 1,
                                unidad: 'unidad',
                                costounitario: costoU,
                                monto: costoU,
                                notas: '',
                                progress: 0,
                                cron_done: false,
                                estado: 'ontime',
                                id: nanoid(),
                                displayorder: max + 1,
                                fromCanva: true,
                                resp_id: r.resp_id,
                            }

                            taskAux.push(task);
                            max = max + 1;
                        }
                        else {
                            const cron_acti = crons.cron.find(respuesta => respuesta.resp_id === r.resp_id)
                            if (cron_acti) {
                                const respC = respuestasCostos.find(rc => (rc.resp_id_ref == r.resp_id_ref))
                                let costoU = 0;
                                if (respC != null) {
                                    console.log("PLASS")
                                    costoU = Number(respC.resp_cost_monto)
                                }
                                let task = {
                                    empr_id: cron_acti.empr_id,
                                    type: cron_acti.type,
                                    project: cron_acti.project,
                                    name: r.resp_text,
                                    start: cron_acti.start,
                                    end: cron_acti.end,
                                    responsable: cron_acti.responsable,
                                    dependencies: cron_acti.dependencies,
                                    cantidad: cron_acti.cantidad,
                                    unidad: cron_acti.unidad,
                                    //costounitario: cron_acti.costounitario,
                                    costounitario: costoU,
                                    monto: costoU,
                                    //monto: cron_acti.monto,
                                    notas: cron_acti.notas,
                                    progress: cron_acti.progress,
                                    cron_done: cron_acti.cron_done,
                                    estado: cron_acti.estado,
                                    id: cron_acti.id,
                                    resp_id: cron_acti.resp_id,
                                    displayorder: cron_acti.displayorder,
                                }
                                taskAux2.push(task);
                            }
                        }
                    }
                }
            }
            )
            taskAux.map(t => {
                dispatch(addCronograma(t));
                dispatch(changeStatecron('created'));
            })
            taskAux2.map(t => {
                dispatch(updateCronograma(t));
                dispatch(changeStatecron('updated'));
            })
        }
    }, [respuestas, respuestasCostos])
    useEffect(() => {
        addActivKey();
    }, [])
    useLayoutEffect(() => {
        dispatch(resetRespuesta());
        dispatch(resetRespCosto());
    }, [])
    useEffect(() => {
        // const updateDatePy=()=>{
        console.log(tareas);
        const cronPY = tareas.find(t => t.id == '1')
        if (cronPY != null) {
            const tareas2 = tareas;
            // let fechaInicioMenor = cronPY.start;
            let fechaInicioMenor = tareas[1]?.start;
            let fechaFinMayor = tareas[1]?.end;
            tareas2.map((t) => {
                if (id !== 0) {
                    if (t.start < fechaInicioMenor) {
                        fechaInicioMenor = t.start;
                        console.log(fechaInicioMenor)
                    }
                    if (t.end > fechaFinMayor) {
                        fechaFinMayor = t.end;
                        console.log(fechaFinMayor)
                    }
                }
                // const fechaInicio = `${formatDate2(t.start)}`;
                // const fechaFin = `${formatDate2(t.end)}`;
                // const task = {
                //     ...t,
                //     start: fechaInicio,
                //     end: fechaFin,
                // }
                // console.log("dispatch fecha")
                // dispatch(updateCronograma(task));
                console.log('nooo2')
            })

            const task = {
                ...cronPY, start: `${formatDate2(fechaInicioMenor)}`, end: `${formatDate2(fechaFinMayor)}`,
            }
            dispatch(updateCronograma(task));
        }
        // }
    }, [])


    useEffect(() => {
        if (cronos.state === 'found') {
            dispatch(findCronogramaLocal());
        } else if (cronos.state === 'not found') {
            const dateNow = new Date();
            dispatch(iniciarNuevoCron({
                id: '1',
                empr_id: empr_id,
                start: `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`,
                end: `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`,
                name: "Mi nuevo proyecto",
                progress: 0,
                type: "project",
                hideChildren: false,
                displayorder: 1,
                crond_done: false,
                cron_id: nanoid(),
            }))
            if (sessionStorage.getItem("emprendimientos")) {
                const emprendimientos = JSON.parse(sessionStorage.getItem("emprendimientos"))
                emprendimientos.map(emprend => {
                    if (emprend.empr_id == empr_id) {
                        dispatch(changeProjectName({ project_name: emprend.empr_nomb, project_id: emprend.empr_id }));
                    }
                });
            }
        }
    }, [cronos.state]);//start project if not found on DB and then change name for project name
    //if found activates findcronogramalocal, also sendDB=true
    useEffect(() => {
        if (cronos.sendDb === true)
            dispatch(createCronogramas(crons.cron[0]));
    }, [cronos.sendDb])//if project is not on DB activates sendDb=true and register project on DB

    useEffect(() => {
        if (idActiva !== '') {
            tareas.map(t => {
                if (t.id == idActiva) {
                    setTareaActiva(t);
                }
            });
        }
    }, [idActiva]);//if idActiva changes then gets data from Cronograma's tareas & assign to TareaActiva

    useEffect(() => {
        if (idActiva != '') {
            setIsOpen(true);
        }

    }, [tareaActiva]);//if TareaActiva changes, IsOpen modal changes to true;


    useEffect(() => {
        if (crons.loaded === false) {
            task.length = 0;
            crons.cron.map(tarea => {
                const t = {
                    ...tarea,
                    start: formatDate(tarea.start, 'start'),
                    end: formatDate(tarea.end, 'end'),
                }
                if (!task.find(cronograma => cronograma.id === t.id))
                    task.push(t);
            })
            setTareas(task);
        }
    }, [crons.cron]);//if crons.cron changes

    useEffect(() => {
        if (tareas.length > 0) {
            // if (sessionStorage.getItem("emprendimientos")) {
            //     const emprendimientos = JSON.parse(sessionStorage.getItem("emprendimientos"))
            //     emprendimientos.map(emprend => {
            //         if (emprend.empr_id == empr_id) {
            //             dispatch(changeProjectName({ project_name: emprend.empr_nomb, project_id: emprend.empr_id }));
            //         }
            //     });
            // }
            setFlag(true);
        } else {
            setFlag(false);
        }
        const tareas2 = tareas;
        let fechaInicioMenor;
        let fechaFinMayor;
        let fechaBI;
        let fechaBF;
        const cronPY = tareas.find(t => t.id == '1')
        if (cronPY != null) {
            //fechaInicioMenor = cronPY.start;
            fechaInicioMenor = tareas[1]?.start;
            fechaBI = fechaInicioMenor;
            //fechaFinMayor = cronPY.end;
            fechaFinMayor = tareas[1]?.end;
            fechaBF = fechaFinMayor;
        }

        tareas2.map((dataSubmitted, id) => {
            console.log("id inicial: " + id);
            if (id !== 0) {
                if (dataSubmitted.start < fechaInicioMenor)
                    fechaInicioMenor = dataSubmitted.start;
                if (dataSubmitted.end > fechaFinMayor)
                    fechaFinMayor = dataSubmitted.end;
            }
            const fechaInicio = `${formatDate2(dataSubmitted.start)}`;
            const fechaFin = `${formatDate2(dataSubmitted.end)}`;
            const task = {
                ...dataSubmitted,
                start: fechaInicio,
                end: fechaFin,
            }
            // console.log("dispatch fecha")
            dispatch(updateCronograma(task));
        })

        if (fechaBI != fechaInicioMenor || fechaBF != fechaFinMayor) {
            const task = {
                ...cronPY, start: `${formatDate2(fechaInicioMenor)}`, end: `${formatDate2(fechaFinMayor)}`,
            }
            dispatch(updateCronograma(task));
        }

    }, [tareas])

    useEffect(() => {
        if (errores != null) {
            if (errores.length === 0) {
                const fechaInicio = `${dataSubmitted.start.$D}/${(dataSubmitted.start.$M) + 1}/${dataSubmitted.start.$y}`;
                const fechaFin = `${dataSubmitted.end.$D}/${(dataSubmitted.end.$M) + 1}/${dataSubmitted.end.$y}`;
                const displayorder = crons.cron.map(object => {
                    return object.displayorder;
                });//gets displayorder vector
                let max = Math.max(...displayorder);//finds displayorder max value
                let vectorDep = [];//vector dependencies
                let vectorDep2 = [];
                if (dataSubmitted.dependencias) {
                    if (dataSubmitted.dependencias.length > 0) {
                        vectorDep2 = dataSubmitted.dependencias.map((d) => {
                            if (d.value)
                                return d.value;
                        })
                        vectorDep2 = vectorDep2.filter(v => v !== null && v !== undefined);
                    }
                }
                // if (dataSubmitted.dependencies === "predecesora") {
                //     vectorDep = (crons.cron.map(object => {
                //         if (object.displayorder === max)
                //             return object.id;
                //     }));
                //     vectorDep = vectorDep.filter(v => v !== null && v !== undefined);
                // }
                max = max === 0 ? 1 : max;
                let task = {
                    empr_id: empr_id,
                    type: dataSubmitted.type,
                    project: '1',
                    name: dataSubmitted.name,
                    start: fechaInicio,
                    end: fechaFin,
                    responsable: dataSubmitted.responsable,
                    dependencies: vectorDep2,
                    cantidad: dataSubmitted.cantidad,
                    unidad: dataSubmitted.unidad,
                    costounitario: dataSubmitted.costounitario,
                    monto: dataSubmitted.cantidad * dataSubmitted.costounitario,
                    notas: dataSubmitted.notas,
                    progress: 0,
                    cron_done: false,
                    estado: 'ontime'
                }
                if (dataSubmitted.id === "") {
                    task = {
                        ...task,
                        id: nanoid(),
                        displayorder: max + 1,
                    }
                    dispatch(addCronograma(task));
                    dispatch(changeStatecron('created'));
                }
                else {
                    task = {
                        ...task,
                        id: dataSubmitted.id,
                    }
                    dispatch(updateCronograma(task));
                    dispatch(changeStatecron('updated'));
                }
            }
        }
    }, [dataSubmitted]);

    useEffect(() => {
        if (crons.statecron === 'updated') {
            setShowNotif(true);
            setIsOpen(false);
            setIdmsg(1);
            setErrores(null);
            setIdActiva('');
            setTareaActiva();
        }
        if (crons.statecron === 'created') {
            setShowNotif(true);
            setIsOpen(false);
            setIdmsg(0);
            setErrores(null);
        }
        if (crons.statecron === 'deleted') {
            setShowNotif(true);
            setIsOpen(false);
            setIdmsg(2);
            setErrores(null);
        }

        return () => {
            dispatch(changeStatecron('idle'));
        };
    }, [crons.statecron]);

    //FUNCTIONS
    const handleChangeDatePicker = (newValue) => {
        setValueDate(newValue);
    };
    const handleChangeNotas = (event) => {
        setValueNotas(event.target.value);
    };
    const handleOpen = () => {
        setIdActiva('');
        setIsOpen(true);
    };
    const handleClose = () => {
        setIdActiva('');
        setTareaActiva();
        setIsOpen(false);
        setErrores(null);
    };//when closing modal
    const handleEdit = (id) => {
        console.log('entro222');
        setIdActiva(id);
    };//IdActiva to appear modal
    const handleDelete = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Está seguro de borrar esta actividad?',
            subTitle: "Esta operación no puede ser revertida",
            onConfirm: () => {
                handleDeleteConfirmation(id);
            }
        })
    };//enables confirmDialog
    const handleDeleteConfirmation = (id) => {
        dispatch(deleteCronograma(id));
        dispatch(changeStatecron('deleted'));
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    }// function to perform delecte cronograma on REDUX and disappear confirmdialog
    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }//rellena number with 0 until it is 2 digits
    const formatDate2 = (date) => {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    }//return date to 23-03-2023 format

    const formatDate = (date, type) => {
        let end = 0;
        // console.log("date:")
        // console.log(date);
        end = date.indexOf("/");
        const day = date.slice(0, end);
        date = date.slice(end + 1);
        end = date.indexOf("/");
        const month = date.slice(0, end);
        date = date.slice(end + 1);
        const year = date.slice(0);
        if (type === "end")
            return (new Date(year, month - 1, day, 23, 59, 59))
        return (new Date(year, month - 1, day))
    }//return date in format 2023-03-23



    const updateTable = () => {
        //is not necessary to JSON.stringify since Axios takes charge of that
        setSendAction(true);
        if (crons.idState === 'new') {
            dispatch(createCronogramas(crons.datos));
        }//if idState=new then createCronogramas on DB 
    }

    //onDateChange
    const handleTaskChange = (task) => {
        let newTasks = tareas.map(t => (t.id === task.id ? task : t));
        //assign task if id found on tareas
        if (task.project) {//task.project contains id of project default 1
            const [start, end] = getStartEndDateForProject(newTasks, task.project);
            const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
            if (//check if new task or updated task start and end time has changed
                project.start.getTime() !== start.getTime() ||
                project.end.getTime() !== end.getTime()
            ) {//if changed it will change start and end time for project
                const changedProject = { ...project, start, end };
                newTasks = newTasks.map(t =>
                    t.id === task.project ? changedProject : t
                );
            }
        }
        setTareas(newTasks);
    };//function to change start and end time for project 

    const handleProgressChange = async (task) => {
        setTareas(tareas.map(t => (t.id === task.id ? task : t)));
    };//verify if task exists in array,if exists sets task if not sets t

    const handleTaskDelete = (task) => {
        const conf = window.confirm("Are you sure about " + task.name + " ?");
        if (conf) {
            setTareas(tareas.filter(t => t.id !== task.id));
        }
        return conf;
    };//onDelete for task-gantt-content

    const handleDblClick = (task) => {
        alert("On Double Click event Id:" + task.id);
    };//when doubleClicking
    const handleClick = (task) => {
        // console.log("On Click event Id:" + task.id);
    };

    const handleSelect = (task, isSelected) => {
        // console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
    };

    const handleExpanderClick = (task) => {
        dispatch(changeHideCronograma({ id: task.id, hideChildren: task.hideChildren }));
    };//handleExpanderClick to hide or not children tasks

    const submitForm = (data) => {
        console.log(data);
        Object.keys(data).forEach(key => {
            if (typeof (data[key]) === 'string') {
                data[key] = (data[key]).trimStart();
                data[key] = (data[key]).trimEnd();
            }
        });
        erroresAux.length = 0;
        schema.validate(data, { abortEarly: false }).then(function () {
            setErrores(erroresAux);
            setDataSubmitted(data);
        }).catch(function (err) {
            err.inner.forEach(e => {
                erroresAux.push({
                    errorKey: e.path,
                    errorValue: data[e.path],
                    errorMsg: e.errors,
                    errorExtra: '',
                })
            });
            setErrores(erroresAux);
        });
    }
    useEffect(() => {
        if (cronos.saved === 'success') {

            setShowNotif(true);
            setIsOpen(false);
            setIdmsg(3);
            setErrores(null);

            dispatch(setSaved(false));
        }

    }, [cronos.saved])


    return (<>
        {showNotif && <Notifications msgNotif={msgNotif[idmsg]} showNotif={showNotif} setShowNotif={setShowNotif} severity="info" />}
        <div className="Wrapper relative">
            <h1 className="text-4xl text-darkish text-center">Cronograma</h1>
            <div className="flex flex-row justify-center">

                <div className="flex justify-center cursor-pointer">
                    <Link className="flex flex-col justify-center w-full px-3 py-0 items-center" to={`/emprendimiento/${empr_id}/bmc`} >
                        {/* <img src={scheduling} alt="Cronograma imagen"
                            className='object-cover'
                            layout="fill" /> */}

                        <img src={estrategia} className="hover:bg-rojo-violeta object-scale-down h-14 rounded-lg w-full" alt="..." />
                        <h3 className="font-sans text-sm font-semibold hover:text-rojo-violeta"> Ver Canvas</h3>
                    </Link>
                </div>
                <div>
                    <ViewSwitcher
                        onViewModeChange={viewMode => setView(viewMode)}
                        onViewListChange={setIsChecked}
                        isChecked={isChecked}
                    />
                </div>
            </div>
            <div>
                {/* <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
                    Registrar Nueva Actividad</Button> */}


                <Modal
                    open={isOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >{/*end modal*/}
                    <ActivitiesModal isOpen={isOpen} handleClose={handleClose}
                        valueDate={valueDate}
                        valueDate2={valueDate2} handleChangeDatePicker={handleChangeDatePicker}
                        handleChangeDatePicker2={handleChangeDatePicker}
                        valueNotas={valueNotas} handleChangeNotas={handleChangeNotas}
                        submitForm={submitForm} schema={getSchema}
                        idActiva={idActiva}
                        tareaActiva={tareaActiva}
                        setIdActiva={setIdActiva}
                        errores={errores}
                        tasks={tareas}
                        userName={userName}
                    >{/*end activities modal*/}
                    </ActivitiesModal>
                </Modal>

            </div>
            {flag && <Gantt
                tasks={tareas}
                viewMode={view}
                onDateChange={handleTaskChange}
                onDelete={handleTaskDelete} //window.confirm("Are you sure about
                //setTareas(tareas.map(t => (t.id === task.id ? task : t)));
                onProgressChange={handleProgressChange}
                onDoubleClick={handleDblClick} //show alert
                onClick={handleClick} //not working
                onSelect={handleSelect} //not working
                onExpanderClick={handleExpanderClick} //changehide child
                listCellWidth={isChecked ? "155px" : ""}
                columnWidth={columnWidth}
                handleEdit={handleEdit} //set idActiva true
                handleDelete={handleDelete} //to confirm deletion
                isChecked={isChecked}
            />}
            <div className='text-center flex md:absolute z-0 md:z-0 lg:absolute lg:right-10 lg:top-10 lg:z-0 text-lg text-canvas4Txt'>
                <span className="bg-violeta text-whitish m-2 p-1 rounded-md cursor-pointer" aria-label="Actualizar Cronograma" onClick={() => dispatch(updateCronogramas(crons.cron))}>
                    <AddIcon> </AddIcon> <span className="text-xs">Guardar Cronograma</span>
                </span>
            </div>
        </div>
        <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
        />
    </>
    );
}
export default CronogramaData;