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
    { value: 65, label: "A" },
    { value: 66, label: "B" },
    { value: 67, label: "C" }
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
    setIdActiva, errores }, ref) => {
    // console.log("*****TAREAACTOVA")
    // console.log(tareaActiva);
    // console.log(idActiva);
    // console.log(valueDate);

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
    // const [valueNotas, setValueNotas] = React.useState('');
    // const [valueDate, setValueDate] = React.useState(dayjs(`${fecha.getFullYear()}-
    // ${fecha.getMonth() + 1}-${fecha.getDate()}`));
    // // const [valueDate2, setValueDate2] = React.useState(dayjs('2014-08-18T21:11:54'));
    // const [valueDate2, setValueDate2] = React.useState(dayjs(`${fecha.getFullYear()}-
    // ${fecha.getMonth() + 1}-${fecha.getDate()}`));

    // const handleChangeDatePicker = (newValue) => {
    //     setValueDate(newValue);
    // };
    // const handleChangeDatePicker2 = (newValue) => {
    //     setValueDate2(newValue);
    // };
    // const handleChangeNotas = (event) => {
    //     setValueNotas(event.target.value);
    // };

    // const schema = yup.object({
    //     name: yup.string().required().typeError('Debe ingresar un nombre actividad'),
    //     password: yup.number().positive().integer().required(),
    //     start: yup.date().required().typeError('Debe ser una fecha válida'),
    //     end: yup.date().required().typeError('Debe ser una fecha válida'),
    //     responsable: yup.string().required().typeError('Debe ingresar un responsable de la actividad'),
    //     cantidad: yup.number().positive().typeError('Debe ser un número valido'),
    //     unidad: yup.string().typeError('Debe ingresar una unidad'),
    //     costounitario: yup.number().positive().typeError('Debe ser un costo válido'),
    // }).required();

    // const { control, handleSubmit, formState: { errors } } = useForm({
    //     resolver: yupResolver(schema)
    // });

    // const {
    //     fields: members,
    //     append: appendMemberRow,
    //     remove: removeMemberRow
    // } = useFieldArray({
    //     control,
    //     name: "members"
    // });

    const { control, handleSubmit, formState: { errors } } = useForm({
        // resolver: yupResolver(schema)
    });

    // const submitForm = (data) => {
    //     // dispatch();
    //     data.preventDefault();
    //     console.log("******USEFORM+++++");
    //     console.log(data);
    // }


    return (
        <div>
            {/* {error && <Error>{errores}</Error>} */}
            {errors.name?.message}
            {/* {errors.start?.message}
            {errors.end?.message}
            {errors.responsable?.message}
            {errors.cantidad?.message}
            {errors.unidad?.message}
            {errors.costounitario?.message} */}



            <Box sx={windowSize.innerWidth > 640?style:style2} component="form" onSubmit={handleSubmit(submitForm)}>
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

                        // variant="standard"
                        // sx={{ width: '31rem' }}
                        />
                    )}
                />
                <div className='flex justify-center'>
                    <Controller
                        control={control}
                        name="type"
                        defaultValue="task"
                        render={({ field }) => (
                            <RadioGroup {...field} sx={{ display: 'inline-flex', flexDirection: 'row', p: 1 }}>
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
                        {/* <MobileDatePicker
                            id="end"
                            label="Fecha Fin"
                            inputFormat="DD/MM/YYYY"
                            value={valueDate2}
                            onChange={handleChangeDatePicker2}
                            renderInput={(params) => <TextField {...params} />}
                        /> */}
                        {/* </Stack> */}
                    </LocalizationProvider>
                </div>
                {errores !== null && errores.find(index => index.errorKey === 'responsable')?.errorMsg.map(t => {
                    return <span key={nanoid()} className='text-red-700'>{t}</span>
                })}

                <Controller
                    control={control}
                    name="responsable"
                    defaultValue={tareaActiva != null ? tareaActiva.responsable : ""}
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
                {/* <TextField id="responsable" label="Responsable" variant="standard" sx={{ width: '31rem' }} /> */}

                {/* <Controller
                    control={control}
                    name="predecesora"
                    defaultValue={false}
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormControlLabel
                            control={
                                <Checkbox onChange={onChange} checked={value} {...field} />
                            }
                            label="¿Predecesora?"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="paralela"
                    defaultValue={false}
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormControlLabel
                            control={
                                <Checkbox onChange={onChange} checked={value} {...field} />
                            }
                            label="¿Paralela?"
                        />
                    )}
                /> */}

                <Controller
                    control={control}
                    name="dependencies"
                    defaultValue="independiente"
                    render={({ field }) => (
                        <RadioGroup {...field} sx={{ display: 'inline-flex', flexDirection: 'row', pb: 2 }}>
                            <FormControlLabel
                                value="predecesora"
                                control={<Radio />}
                                label="¿predecesora?"
                            //sx={{display:'flex'}}
                            />
                            <FormControlLabel
                                value="paralela"
                                control={<Radio />}
                                label="¿Paralela?"
                            //sx={{display:'flex'}}
                            />
                            <FormControlLabel
                                value="independiente"
                                control={<Radio />}
                                label="¿independiente?"
                            //sx={{display:'flex'}}
                            />
                        </RadioGroup>
                    )}
                />

                {/* <Controller
                    control={control}
                    name="dependencies"
                    defaultValue={tareaActiva != null ? tareaActiva.dependencies : ""}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="standard"
                            label="Dependencias"
                            id="dependencies"
                            sx={{ pb: 2 }}
                        // variant="standard"
                        // sx={{ width: '31rem' }}
                        />
                    )}
                /> */}
                {errores !== null && errores.find(index => index.errorKey === 'cantidad')?.errorMsg.map(t => {
                    return <span className=' text-red-700'>{t}</span>
                })}
                <div className="flex items-end pb-1">
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
                                sx={{ width: '10rem' }}
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
                                sx={{ width: '10rem' }}
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
                                sx={{ width: '10rem' }}
                                type="number"
                            // variant="standard"
                            // sx={{ width: '31rem' }}
                            />
                        )}
                    /> <span>Bs.</span>
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
                            sx={{ mt: 3 }}
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
