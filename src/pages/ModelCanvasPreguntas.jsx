import React,{useEffect} from 'react';
import CanvasPreguntas from '../components/CanvasPreguntas/CanvasPreguntas';
import {motion} from 'framer-motion';
import { changeMenu } from '../redux/reducers/menuSlice';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ModelCanvasPreguntas = () => {
    
    const { empr_id } = useParams();
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(changeMenu({title:'MENU_CANVAS_ASISTENTE',empr_id:empr_id,modu_nume:1,bmc_type:'Industria'}))
      }, [])

    return (
        <motion.div className='flex relative flex-col my-2 pl-2'
        initial={{width:0,opacity:0}} animate={{width:"100%",opacity:2}} exit={{x:window.innerWidth, transition:{duration:0.1}}}
        ><CanvasPreguntas/>
        </motion.div>

    );
}

export default ModelCanvasPreguntas;
