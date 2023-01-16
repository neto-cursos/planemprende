import React, {useEffect} from 'react';
import { reset as resetSugerencias} from '../redux/reducers/sugerenciasSlice';
import { reset as resetUsuarios } from '../redux/reducers/userSlice';
import { reset as resetRespuestas} from '../redux/reducers/respuestaSlice';
import { reset as resetRespuestaAsistidas} from '../redux/reducers/respuestaAsistSlice';
import { reset as resetPreguntas} from '../redux/reducers/preguntaSlice';
import { reset as resetMenu} from '../redux/reducers/menuSlice';
import { reset as resetEmprendimientos} from '../redux/reducers/emprendSlice';
import { reset as resetCronogramas} from '../redux/reducers/cronogramaSlice';
import { reset as resetCanvas} from '../redux/reducers/canvasSlice';
import { reset as resetActividad} from '../redux/reducers/actividadSlice';
import { useDispatch } from 'react-redux';



const ResetAllReducers = () => {
    const dispatch=useDispatch();
useEffect(() => {
    dispatch(resetSugerencias());
    // dispatch(resetUsuarios());
    dispatch(resetRespuestas());
    dispatch(resetRespuestaAsistidas());
    dispatch(resetPreguntas());
    dispatch(resetMenu());
    dispatch(resetEmprendimientos());
    dispatch(resetCronogramas());
    dispatch(resetCanvas());
    dispatch(resetActividad());
}, []);
}

export default ResetAllReducers