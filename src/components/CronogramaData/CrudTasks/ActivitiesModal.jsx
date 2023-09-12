import React, { forwardRef } from 'react';
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

import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { nanoid } from 'nanoid';

const options = ["A", "B", "C", "D"];
const objOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
];
const myHelper = {
    email: {
        required: "Email is Required",
        pattern: "Invalid Email Address"
    }
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    pl: 6,
};
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    pl: 6,
};
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
    fontSize: '1.3rem',
}));

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

const ActivitiesModal = forwardRef(({ isOpen, handleClose, handleSubmit2, valueDate, valueDate2,
    valueNotas, handleChangeDatePicker, handleChangeDatePicker2, handleChangeNotas,
    control2, submitForm, schema, tareaActiva, idActiva,
    setIdActiva, errores, tasks, userName=""}, ref) => {
    // console.log(tareaActiva);
    const [estadoRadioBtn, setEstadoRadioBtn] = React.useState({ selected: "independiente" });
    const selectRadioButton = (e, val) => {
        console.log("Holis");
        setEstadoRadioBtn({ selected: val });
    };
    // console.log(tasks);
    let displayorder = tasks.map(object => {
        if (tareaActiva) {
            if (object.displayorder != 1 && tareaActiva.displayorder > object.displayorder)
                return { value: object.id, label: `${object.displayorder}. ${object.name?.slice(0, 17)}` };

        } else
            if (object.displayorder != 1)
                return { value: object.id, label: `${object.displayorder}. ${object.name?.slice(0, 17)}` };
    });//gets displayorder vector

    const findVectorDep = () => {
        if (tareaActiva)
            if (tareaActiva.dependencies?.length > 0) {
                let vec = [];
                let vec2 = [];
                tareaActiva.dependencies.map(d => {
                    vec.push(tasks.find(t => d == t.id));
                })
                // console.log(vec);
                vec2 = vec.map(object => {
                    if (object.displayorder != 1)
                        return { value: object.id, label: `${object.displayorder}. ${object.name?.slice(0, 17)}` };
                })
                vec2 = vec2.filter(v => v !== null && v !== undefined);
                // console.log(vec2);
                return vec2;
            }
    }
    // findVectorDep();
    //let max = Math.max(...displayorder);//finds displayorder max value
    /*const vectorDep = (tasks.map(object => {
        if (object.displayorder === max)
            return object.id;
    }));
    vectorDep = vectorDep.filter(v => v !== null && v !== undefined);*/
    displayorder = displayorder.filter(v => v !== null && v !== undefined);
    // console.log(displayorder)
    //useState for managin window size
    const [windowSize, setWindowSize] = React.useState(getWindowSize());
    //useEffect for managing resizing window
    React.useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    console.log("ERRORESLLEGADODE");
    console.log(errores);
    let fechaInicio = valueDate;
    let fechaFin = valueDate2;
    if (tareaActiva) {
        if (tareaActiva.start && tareaActiva.end) {
            fechaInicio = dayjs(`${tareaActiva.start.getFullYear()}-
     ${tareaActiva.start.getMonth() + 1}-${tareaActiva.start.getDate()}`);
            fechaFin = dayjs(`${tareaActiva.end.getFullYear()}-
     ${tareaActiva.end.getMonth() + 1}-${tareaActiva.end.getDate()}`);
        }
    }
    const fecha = new Date();

    const { control, handleSubmit, formState: { errors } } = useForm({
        // resolver: yupResolver(schema)
    });
    const [valor, setValor] = React.useState(tareaActiva != null ? tareaActiva.dependencies?.length > 0 ? 'predecesora' : 'independiente' : 'independiente');
    const handleChangeRG = (evt) => {
        console.log(evt.target.value);
        setValor(evt.target.value);
    }

    return (
        <div>
            {/* {error && <Error>{errores}</Error>} */}
            {errors.name?.message}
            <Box sx={windowSize.innerWidth > 640 ? style : style2} component="form" onSubmit={handleSubmit(submitForm)}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Registro de Actividad
                </Typography>
                {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Ingrese Los siguientes datos de la actividad
                        </Typography> */}
                {errores !== null && errores.find(index => errores.errorKey === 'id')?.errorMsg}
                <Controller
                    control={control}
                    name="id"
                    defaultValue={tareaActiva != null ? tareaActiva.id : ""}
                    render={({ field }) => (
                        <TextField
                            {...field}

                            variant="filled"
                            label="id"
                            disabled
                            // variant="standard"
                            sx={{ display: 'none' }}
                        />
                    )}
                />

                {errores !== null && errores.find(index => index.errorKey === 'name')?.errorMsg.map(t => {
                    return <span className='text-red-700'>{t}</span>
                })}
                {tareaActiva?.resp_id == null ?
                    <Controller
                        control={control}
                        name="name"
                        defaultValue={tareaActiva != null ? tareaActiva.name : ""}
                        render={({ field }) => (
                            <TextField
                                {...field}

                                fullWidth
                                variant="filled"
                                label="Actividad"
                            // {...tareaActiva!=null?tareaActiva.resp_id==null?'':'disabled':''}
                            // variant="standard"
                            // sx={{ width: '31rem' }}
                            />
                        )}
                    /> :
                    <Controller
                        control={control}
                        name="name"
                        defaultValue={tareaActiva != null ? tareaActiva.name : ""}
                        render={({ field }) => (
                            <TextField
                                {...field}

                                fullWidth
                                variant="filled"
                                label="Actividad"
                                disabled
                            // {...tareaActiva!=null?tareaActiva.resp_id==null?'':'disabled':''}
                            // variant="standard"
                            // sx={{ width: '31rem' }}
                            />
                        )}
                    />
                }
                <div className='flex justify-center'>
                    <Controller
                        control={control}
                        name="type"
                        defaultValue="task"
                        render={({ field }) => (
                            <RadioGroup {...field} sx={{ display: 'none', flexDirection: 'row', p: 1 }}>
                                <FormControlLabel
                                    value="task"
                                    control={<Radio />}
                                    label="Tarea"
                                //sx={{display:'flex'}}
                                />
                                <FormControlLabel
                                    value="milestone"
                                    control={<Radio />}
                                    label="Hito"
                                //sx={{display:'flex'}}
                                />
                            </RadioGroup>
                        )}
                    />
                </div>
                <div className="pt-4 flex justify-between pr-8">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* <Stack spacing={3}> */}
                        <Controller
                            control={control}
                            name="start"
                            defaultValue={tareaActiva != null ? fechaInicio : valueDate}

                            render={({ field }) => (
                                <MobileDatePicker
                                    {...field}
                                    id="start"
                                    label="Fecha Inicio"
                                    inputFormat="DD/MM/YYYY"
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            )}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Controller
                            control={control}
                            name="end"
                            defaultValue={tareaActiva != null ? fechaFin : valueDate2}

                            render={({ field }) => (
                                <MobileDatePicker
                                    {...field}
                                    id="end"
                                    label="Fecha Fin"
                                    inputFormat="DD/MM/YYYY"
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </div>
                {errores !== null && errores.find(index => index.errorKey === 'responsable')?.errorMsg.map(t => {
                    return <span key={nanoid()} className='text-red-700'>{t}</span>
                })}

                <Controller
                    control={control}
                    name="responsable"
                    defaultValue={tareaActiva != null ? tareaActiva.responsable : userName}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="standard"
                            label="responsable"
                            id="responsable"
                            sx={{ pb: 1 }}
                        // variant="standard"
                        // sx={{ width: '31rem' }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="dependencies"
                    defaultValue={tareaActiva != null ? tareaActiva.dependencies?.length > 0 ? 'predecesora' : 'independiente' : 'independiente'}
                    render={({ field: { ref, ...field } }) => (
                        <RadioGroup {...field} onChange={handleChangeRG} value={valor} sx={{ display: 'inline-flex', flexDirection: 'row', pb: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <FormControlLabel
                                value="predecesora"
                                control={<Radio />}
                                label="¿predecesora?"
                            //{valor=='predecesora'?checked:''}
                            //sx={{display:'flex'}}
                            />
                            {/* <FormControlLabel
                                value="paralela"
                                control={<Radio />}
                                label="¿Paralela?"
                            sx={{display:'flex'}}
                            /> */}
                            <FormControlLabel
                                value="independiente"
                                control={<Radio />}
                                label="¿independiente?"
                            //{valor=='independiente'?checked:''}
                            //sx={{display:'flex'}}
                            />
                        </RadioGroup>
                    )}
                />
                {(valor == 'predecesora') &&
                    <Controller
                        control={control}
                        name="dependencias"
                        defaultValue={tareaActiva != null ? tareaActiva.dependencies?.length > 0 ? findVectorDep() : [] : []}
                        render={({ field: { ref, onChange, ...field } }) => (
                            <Autocomplete
                                multiple
                                options={displayorder}
                                defaultValue={tareaActiva != null ? tareaActiva.dependencies?.length > 0 ? findVectorDep() : [] : []}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => {
                                    //console.log(option)
                                    //console.log(value)
                                    return option.value === value.value}}
                                onChange={(_, data) => onChange(data)}
                                //onChage={(evt)=>{console.log(evt)}}
                                sx={{ pt: 0, pb: 2 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...field}
                                        {...params}
                                        fullWidth
                                        inputRef={ref}
                                        variant="filled"
                                        label="Dependencias"
                                        disabled
                                    />
                                )}
                            />
                        )}
                    />
                }
                {/* {(valor == 'paralela') &&
                    <Controller
                        control={control}
                        name="object-component"
                        defaultValue={[]}
                        render={({ field: { ref, onChange, ...field } }) => (
                            <Autocomplete
                                multiple
                                options={displayorder}
                                defaultValue={[]}
                                getOptionLabel={(option) => option.label}
                                onChange={(_, data) => onChange(data)}
                                //onChage={(evt)=>{console.log(evt)}}
                                renderInput={(params) => (
                                    <TextField
                                        {...field}
                                        {...params}
                                        fullWidth
                                        inputRef={ref}
                                        variant="filled"
                                        label="Dependencias"
                                        disabled
                                    />
                                )}
                            />
                        )}
                    />} */}

                {errores !== null && errores.find(index => index.errorKey === 'cantidad')?.errorMsg.map(t => {
                    return <span className=' text-red-700'>{t}</span>
                })}
                <div className="pb-0 m-0">
                    <Controller
                        control={control}
                        name="cantidad"
                        defaultValue={tareaActiva != null ? tareaActiva.cantidad : 0}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="standard"
                                label="Cantidad"
                                id="cantidad"
                                sx={{ width: '10rem', display:'none'}}
                                type="number"
                            // variant="standard"
                            // sx={{ width: '31rem' }}
                            />
                        )}
                    />

                    &nbsp;&nbsp;
                    <Controller
                        control={control}
                        name="unidad"
                        defaultValue={tareaActiva != null ? tareaActiva.unidad : "unidad"}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="standard"
                                label="Unidad"
                                id="unidad"
                                sx={{ width: '10rem',display:'none' }}
                                type="text"
                            // variant="standard"
                            // sx={{ width: '31rem' }}
                            />
                        )}
                    />
                    {errores !== null && errores.find(index => index.errorKey === 'costounitario')?.errorMsg.map(t => {
                        return <span className='text-red-700'>{t}</span>
                    })}
                    &nbsp;&nbsp;<Controller
                        control={control}
                        name="costounitario"
                        defaultValue={tareaActiva?.costounitario ? tareaActiva.costounitario : 0}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="standard"
                                label="costounitario"
                                id="costounitario"
                                sx={{ width: '10rem',display:'none' }}
                                type="number"
                                disabled
                            // variant="standard"
                            // sx={{ width: '31rem' }}
                            />
                        )}
                    /> 
                </div>

                <Controller
                    control={control}
                    name="notas"
                    defaultValue={tareaActiva != null ? tareaActiva.notas : ""}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Notas"
                            id="notas"
                            type="text"
                            multiline
                            sx={{ mt: 0 }}
                            rows={3}
                        // variant="standard"
                        // sx={{ width: '31rem' }}
                        />
                    )}
                />

                <div className="flex justify-center pt-2">
                    <ColorButton variant="contained" onClick={() => {
                        handleClose();
                    }}>Cancelar</ColorButton>
                    <span>&nbsp;&nbsp;</span>
                    <ColorButton type="submit" variant="contained"
                    // onClick={() => {
                    //     alert('clicked');
                    // }}
                    >Guardar</ColorButton>
                    {/* <button type="submit">Enviar</button> */}
                </div>
            </Box>

        </div>
    );
});

export default ActivitiesModal;
