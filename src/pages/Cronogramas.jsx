import React, { useEffect } from 'react';
import CronogramaData from '../components/CronogramaData/CronogramaData';
import { useDispatch } from 'react-redux';
import { changeMenu } from '../redux/reducers/menuSlice';
import { useParams } from 'react-router-dom';

const Cronogramas = () => {
    const { empr_id } = useParams();
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(changeMenu({title:'MENU_CRONOS',empr_id:empr_id}))
      }, [])
    return (
        <CronogramaData/>
    );
}

export default Cronogramas;
