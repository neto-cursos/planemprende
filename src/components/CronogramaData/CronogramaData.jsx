import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ViewMode, Gantt } from "./../Cronograma/Cronograma";
import { ViewSwitcher } from "./view-switcher";
import { getStartEndDateForProject, initTasks } from "./CronogramsHelper";
import "./Cronograma.css";
import { useDispatch, useSelector } from "react-redux";
import {
    addCronograma, changeHideCronograma, changeProjectName,
    changeStatecron, checkCronogramaLocal, deleteCronograma,
    updateCronograma, findCronogramaLocal, resetCurrentCronograma,iniciarNuevoCron,
} from "./../../redux/reducers/cronogramaSlice";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    Slider,
    Select,
    MenuItem
} from "@mui/material";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useParams } from "react-router-dom";
import ActivitiesModal from "./CrudTasks/ActivitiesModal";
import * as yup from 'yup';
import { setLocale } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { nanoid } from "nanoid";
import { ConstructionOutlined, VerticalAlignTopRounded } from "@mui/icons-material";
import {
    listCronogramas, listAllCronogramas, updateCronogramas,
    deleteCronogramas, createCronogramas, checkIfCronReg
} from './../../redux/actions/cronogramaActions';
import Notifications from './../Notifications';
import ConfirmDialog from './../Dialog';
import { getSchema } from '../../utils/Validation/Validation';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { msgNotif } from "../../constants/messageNotifications";

// import { set } from "date-fns";
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
    const [showNotif, setShowNotif] = useState(false);
    const [errores, setErrores] = useState(null);
    // const [dataReceived, setDatareceived] = useState(false);
    const [dataSubmitted, setDataSubmitted] = useState();
    // const [accepted, setAccepted] = useState(false);
    const { empr_id } = useParams();
    dayjs.locale('es');
    /**
     * FORMS
     */
    const fecha = new Date();
    const [valueNotas, setValueNotas] = React.useState('');
    const [valueDate, setValueDate] = React.useState(dayjs(`${fecha.getFullYear()}-
     ${fecha.getMonth() + 1}-${fecha.getDate()}`));
    // const [valueDate2, setValueDate2] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [valueDate2, setValueDate2] = React.useState(dayjs(`${fecha.getFullYear()}-
     ${fecha.getMonth() + 1}-${fecha.getDate()}`));
    /*** Modal */
    const [isOpen, setIsOpen] = React.useState(false);
    const [idActiva, setIdActiva] = useState('');
    const [tareaActiva, setTareaActiva] = useState();
    const [hadErrors, setHadErrors] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    /**Cronogrmas Selector */
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

    useEffect(() => {
        if (cronos.sendDb === true)
            dispatch(createCronogramas(crons.cron[0]));
    }, [cronos.sendDb])
    
    useLayoutEffect(() => {
        
        if (cronos.list === '') {
            const userid = sessionStorage.getItem('usr_dt') ?
                JSON.parse(sessionStorage.getItem('usr_dt'))['user_id'] : '';
            if (userid !== '') {
                dispatch(listAllCronogramas({ id: userid }))       
            }
            //obtiene los cronogramas asociados al usuario cambia list to ready
        }
        
    }, [])

    useEffect(() => {
        dispatch(resetCurrentCronograma());
        if(cronos.list==='ready')
            dispatch(checkCronogramaLocal(empr_id));//does not depend on currentid
    }, [])
    


    useEffect(() => {
        if (cronos.state === 'found') {
            dispatch(findCronogramaLocal())
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
            // dispatch(checkIfCronReg({empr_id:empr_id}));
        }
    }, [cronos.state]);

    useEffect(() => {
        if (cronos.list === 'ready') {
            dispatch(checkCronogramaLocal(empr_id));
            //determines if state=found or not found
        }
    }, [cronos.list]);


    const handleChangeDatePicker = (newValue) => {
        setValueDate(newValue);
    };
    const handleChangeDatePicker2 = (newValue) => {
        // setValueDate2(newValue);
        // console.log(newValue);
    };
    const handleChangeNotas = (event) => {
        setValueNotas(event.target.value);
    };

    yup.setLocale({
        mixed: {
            default: 'Error',
            required: 'Este campo es requerido',
        },

        number: {
            min: 'El número debe ser mayor a ${min}',
        },
    });

    const handleOpen = () => {
        setIdActiva('');
        setIsOpen(true);
    }

    const handleClose = () => {
        setIdActiva('');
        setTareaActiva();
        setIsOpen(false);
        setErrores(null);
    };

    const handleEdit = (id) => {
        // console.log("entro handleedit");
        // console.log(id);
        setIdActiva(id);
    };

    const handleDelete = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Está seguro de borrar esta actividad?',
            subTitle: "Esta operación no puede ser revertida",
            onConfirm: () => {
                handleDeleteConfirmation(id);
            }
        })
        // console.log("deleteid");
        // console.log(id);
    }

    const handleDeleteConfirmation = (id) => {
        dispatch(deleteCronograma(id));
        dispatch(changeStatecron('deleted'));
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    }

    useEffect(() => {
        if (idActiva !== '') {
            tareas.map(t => {
                if (t.id == idActiva) {
                    setTareaActiva(t);
                }
            });
        }
    }, [idActiva]);

    useEffect(() => {
        if (idActiva != '') {
            setIsOpen(true);
            // console.log(isOpen)
        }

    }, [tareaActiva]);
    /**
     * 
     */

    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }

    const formatDate = (date, type) => {
        // console.log("DATE"); console.log(date);
        let end = 0;
        end = date.indexOf("/");
        const day = date.slice(0, end);
        date = date.slice(end + 1);
        // console.log("DATE2"); console.log(date);
        end = date.indexOf("/");
        const month = date.slice(0, end);
        date = date.slice(end + 1);
        // console.log("DATE3"); console.log(date);
        const year = date.slice(0);
        // while(date.indexOf("/")!==-1){
        //     fecha+=date.splice(start,date.indexOf("/"));

        //   }
        if (type === "end")
            return (new Date(year, month - 1, day, 23, 59, 59))
        return (new Date(year, month - 1, day))
    }



    const updateTable = () => {
        //is not necessary to JSON.stringify since Axios takes charge of that
        setSendAction(true);
        if (crons.idState === 'new') {
            dispatch(createCronogramas(crons.datos));
        } /*else if (canvasSelect.idState === 'db') {
            dispatch(updateRespuestas((respuestas)));
        }*/
    }
    useEffect(() => {
        if (crons.loaded === false) {
            task.length = 0;
            crons.cron.map(tarea => {
                const t = { ...tarea, start: formatDate(tarea.start, 'start'), end: formatDate(tarea.end, 'end'), }
                if (!task.find(cronograma => cronograma.id === t.id))
                    task.push(t);
            })
            // console.log("TASK : ");
            // console.log(task);
            setTareas(task);
        }
    }, [crons.cron]);

    useEffect(() => {
        if (tareas.length > 0) {
            if (sessionStorage.getItem("emprendimientos")) {
                const emprendimientos = JSON.parse(sessionStorage.getItem("emprendimientos"))
                emprendimientos.map(emprend => {
                    if (emprend.empr_id == empr_id) {
                        dispatch(changeProjectName({ project_name: emprend.empr_nomb, project_id: emprend.empr_id }));
                    }
                });
            }
            setFlag(true);
        } else {
            setFlag(false);
        }
    }, [tareas])
    //tareas es un useState


    let columnWidth = 65;
    if (view === ViewMode.Year) {
        columnWidth = 350;
    } else if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }

    const handleTaskChange = (task) => {
        // console.log("On date change Id:" + task.id);
        let newTasks = tareas.map(t => (t.id === task.id ? task : t));
        if (task.project) {
            const [start, end] = getStartEndDateForProject(newTasks, task.project);
            const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
            if (
                project.start.getTime() !== start.getTime() ||
                project.end.getTime() !== end.getTime()
            ) {
                const changedProject = { ...project, start, end };
                newTasks = newTasks.map(t =>
                    t.id === task.project ? changedProject : t
                );
            }
        }
        setTareas(newTasks);
    };

    const handleTaskDelete = (task) => {
        const conf = window.confirm("Are you sure about " + task.name + " ?");
        if (conf) {
            setTareas(tareas.filter(t => t.id !== task.id));
        }
        return conf;
    };

    const handleProgressChange = async (task) => {
        setTareas(tareas.map(t => (t.id === task.id ? task : t)));
        // console.log("On progress change Id:" + task.id);
    };

    const handleDblClick = (task) => {
        alert("On Double Click event Id:" + task.id);
    };

    const handleClick = (task) => {
        // console.log("On Click event Id:" + task.id);
    };

    const handleSelect = (task, isSelected) => {
        // console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
    };

    const handleExpanderClick = (task) => {
        // setTareas(tareas.map(t => (t.id === task.id ? task : t)));
        //crons.cron.map(t => (t.id === task.id ? task : t))
        dispatch(changeHideCronograma({ id: task.id, hideChildren: task.hideChildren }));
        // console.log("On expander click Id:" + task.id);
        // console.log(task);
    };
    // useEffect(() => {
    //     console.log("ERRORES:");
    //     console.log(errores);
    //     // console.log("DATARECEIVED:");
    //     // console.log(dataReceived)
    //     if (errores != null) {
    //         if (errores.length > 0) {
    //             setAccepted(false);
    //         }
    //         // else if (dataReceived === true)
    //         if (errores.length === 0) {
    //             console.log("USEEFFECT entro cond errores")
    //             setAccepted(true);
    //             }
    //         }
    //         // return setDatareceived(false);
    //     }, [errores])

    useEffect(() => {
        // if (hadErrors)
        // setAccepted(false)
    }, [hadErrors]);

    useEffect(() => {
        // console.log("******USEFORM+++++");
        // console.log(dataSubmitted);
        if (errores != null) {
            // console.log("USEEFFECT entro cond errores !=null")
            // console.log("accepted" + accepted);
            // console.log("errores length" + errores.length);
            // if (accepted && errores.length === 0) {
            if (errores.length === 0) {
                const fechaInicio = `${dataSubmitted.start.$D}/${(dataSubmitted.start.$M) + 1}/${dataSubmitted.start.$y}`;
                const fechaFin = `${dataSubmitted.end.$D}/${(dataSubmitted.end.$M) + 1}/${dataSubmitted.end.$y}`;
                const displayorder = crons.cron.map(object => {
                    return object.displayorder;
                });
                let max = Math.max(...displayorder);
                let vectorDep;
                if (dataSubmitted.dependencies === "predecesora") {
                    vectorDep = (crons.cron.map(object => {
                        if (object.displayorder === max)
                            return object.id;
                    }));
                }
                max = max === 0 ? 1 : max;
                // console.log(max);
                // console.log(idActiva);
                // console.log(fechaInicio);
                // console.log(fechaFin);
                if (dataSubmitted.id === "") {
                    const task = {
                        id: nanoid(),
                        empr_id: empr_id,
                        type: dataSubmitted.type,
                        //project: crons.project,
                        project: '1',
                        displayorder: max + 1,
                        name: dataSubmitted.name,
                        start: fechaInicio,
                        end: fechaFin,
                        responsable: dataSubmitted.responsable,
                        dependencies: vectorDep,
                        cantidad: dataSubmitted.cantidad,
                        unidad: dataSubmitted.unidad,
                        costounitario: dataSubmitted.costounitario,
                        monto: dataSubmitted.cantidad * dataSubmitted.costounitario,
                        notas: dataSubmitted.notas,
                        progress: 0,
                        cron_done: false,
                        estado: 'ontime'
                    }
                    dispatch(addCronograma(task));
                    dispatch(changeStatecron('created'));
                }
                else {
                    const task = {
                        id: dataSubmitted.id,
                        empr_id: empr_id,
                        type: dataSubmitted.type,
                        //project: crons.project,
                        project: '1',
                        name: dataSubmitted.name,
                        start: fechaInicio,
                        end: fechaFin,
                        responsable: dataSubmitted.responsable,
                        dependencies: [],
                        cantidad: dataSubmitted.cantidad,
                        unidad: dataSubmitted.unidad,
                        costounitario: dataSubmitted.costounitario,
                        monto: dataSubmitted.cantidad * dataSubmitted.costounitario,
                        notas: dataSubmitted.notas,
                        progress: 0,
                        cron_done: false,
                        estado: 'ontime',
                    }
                    dispatch(updateCronograma(task));
                    dispatch(changeStatecron('updated'));

                }
                // return setAccepted(false);
            }

        }

    }, [dataSubmitted]);
    // }, [dataSubmitted, accepted]);

    let flag2 = false;
    let erroresAux = [];
    const schema = yup.object().shape({
        name: yup.string().required(),
        responsable: yup.string().required(),
        unidad: yup.string().required(),
        cantidad: yup.number().min(0),
        costounitario: yup.number().min(0),
    });
    const submitForm = (data) => {

        flag2 = false;
        // setDataSubmitted(data);
        Object.keys(data).forEach(key => {
            if (typeof (data[key]) === 'string') {
                data[key] = (data[key]).trimStart();
                data[key] = (data[key]).trimEnd();
            }
        });
        // data.map(e=>{if(typeof(e)==='string'||typeof(e)==='number'){e=e.trimStart();e=e.trimEnd();}});
        // console.log("DATTA TYPE....")
        // console.log(data);
        erroresAux.length = 0;
        // setDatareceived(true);

        schema.validate(data, { abortEarly: false }).then(function () {
            // Success
            // console.log("No error YAY")
            setErrores(erroresAux);
            setDataSubmitted(data);
        }).catch(function (err) {
            // console.log("errores");
            // console.log(err.inner);
            // console.log("Get validation Errors");
            // console.log(getValidationErrors(err));
            err.inner.forEach(e => {
                // console.log(e.message, e.path);
                erroresAux.push({
                    errorKey: e.path,
                    errorValue: data[e.path],
                    errorMsg: e.errors,
                    errorExtra: '',
                })
            });
            // flag2 = true;
            // console.log("ERRORES AUX");
            // console.log(erroresAux);

            // setDatareceived(true);
            setErrores(erroresAux);
        });

        // Object.keys(data).forEach(key => {

        //     getSchema(key)
        //         .validate({
        //             [key]: data[key],
        //         }
        //         ).then((res) => { })
        //         .catch(function (err) {
        //             // console.log(err.name);
        //             erroresAux.push({
        //                 errorKey: key,
        //                 errorValue: data[key],
        //                 errorMsg: err.errors,
        //                 errorExtra: '',
        //             })
        //         })
        //     flag2 = true;
        // });

        // if (flag2 === true)
        //     setErrores(erroresAux);
    }
    const [idmsg, setIdmsg] = useState(-1);

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


    return (<>
        {showNotif && <Notifications msgNotif={msgNotif[idmsg]} showNotif={showNotif} setShowNotif={setShowNotif} severity="info" />}
        <div className="Wrapper relative">
            <ViewSwitcher
                onViewModeChange={viewMode => setView(viewMode)}
                onViewListChange={setIsChecked}
                isChecked={isChecked}
            />

            <div>
                <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>Registrar Nueva Actividad</Button>
                <Modal
                    open={isOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <ActivitiesModal isOpen={isOpen} handleClose={handleClose}
                        valueDate={valueDate}
                        valueDate2={valueDate2} handleChangeDatePicker={handleChangeDatePicker}
                        handleChangeDatePicker2={handleChangeDatePicker2}
                        valueNotas={valueNotas} handleChangeNotas={handleChangeNotas}
                        submitForm={submitForm} schema={getSchema}
                        idActiva={idActiva}
                        tareaActiva={tareaActiva}
                        setIdActiva={setIdActiva}
                        errores={errores}
                    >

                    </ActivitiesModal>
                </Modal>

            </div>

            <h3>Diagrama de Gantt</h3>
            {flag && <Gantt
                tasks={tareas}
                viewMode={view}
                onDateChange={handleTaskChange}
                onDelete={handleTaskDelete}
                onProgressChange={handleProgressChange}
                onDoubleClick={handleDblClick}
                onClick={handleClick}
                onSelect={handleSelect}
                onExpanderClick={handleExpanderClick}
                listCellWidth={isChecked ? "155px" : ""}
                columnWidth={columnWidth}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isChecked={isChecked}
            />}
            {/* <h3>Gantt With Limited Height</h3> */}
            {/* <Gantt
                tareas={tareas}
                viewMode={view}
                onDateChange={handleTaskChange}
                onDelete={handleTaskDelete}
                onProgressChange={handleProgressChange}
                onDoubleClick={handleDblClick}
                onClick={handleClick}
                onSelect={handleSelect}
                onExpanderClick={handleExpanderClick}
                listCellWidth={isChecked ? "155px" : ""}
                ganttHeight={300}
                columnWidth={columnWidth}
            /> */}
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


