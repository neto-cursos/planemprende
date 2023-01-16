import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { queryEmpr } from '../redux/reducers/emprendSlice';
import { motion } from 'framer-motion';
import canvasImagen2 from './../assets/images/Canvas2.png';
import scheduling from './../assets/images/scheduling.png';
import { changeMenu } from '../redux/reducers/menuSlice';

const SecondMenu = () => {
    /** Menu*/
    const navigate=useNavigate();
    window.onpopstate = () => {
        navigate("/");
        // dispatch(resetEstado());
    }
    const { empr_id } = useParams();
    useEffect(() => {
        if(empr_id!=null)
        dispatch(changeMenu({title:'MENU_EMPREND',empr_id:empr_id}))
      }, [])
    /** fin menu*/  
    const { empr_nomb_activo } = useSelector(state => state.emprendimientos)
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        user_name: '',
        user_apellido: '',
        user_id: '',
        isAuth: false,
    })
    const [datos, setDatos] = useState({
        empr_id: ''
    })
    
    // console.log("empr_id:" + empr_id)
    useEffect(() => {
        if (sessionStorage.getItem('usr_dt')) {
            const getData = JSON.parse(sessionStorage.getItem('usr_dt'));
            setUserData({
                ...userData,
                user_name: getData.user_name,
                user_apellido: getData.user_apellido,
                user_id: getData.user_id,
                auth: getData.auth,
            })
            // console.log("userData:" + userData.user_name);
        }
    }, []);
    useEffect(() => {
        setDatos({ ...datos, empr_id: empr_id })
        // console.log("entrouseeffect1:" + datos.empr_id)

    }, [empr_id]);

    useEffect(() => {
        // console.log("secondmenu datosuseeffect:" + datos.empr_id)
        if (datos.empr_id !== '')
            dispatch(queryEmpr(datos));
    }, [datos])

    return (
        <>
            <motion.div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
                initial={{ width: 0, opacity: 0 }} animate={{ width: "100%", opacity: 2 }} exit={{ x: window.innerWidth, transition: { duration: 0.8 } }}
            >

                <div className="max-w-md w-full space-y-8">
                    <div className='text-center font-bold text-bluenavish text-transform: uppercase'>{empr_nomb_activo}</div>

                    <div className="relative bg-gradient-to-b from-teal-500 rounded-2xl w-60 h-40 mt-10 mx-auto overflow-hidden">
                        <Link to={`/emprendimiento/${empr_id}/bmc`}>
                            <img src={canvasImagen2} alt="business model canvas" layout="fill" className='object-cover' />
                            <span
                                className='absolute top-28 w-full px-3 py-2 bg-redish rounded-lg font-bold font-krona text-xs text-darkish text-center'>
                                Plan de negocios
                            </span>
                        </Link>
                        {/* <Link to={`/emprendimiento/${empr_id}/bmc`} className='relative block w-full px-3 py-2 bg-redish rounded-lg font-bold font-krona text-xs text-darkish text-center'>
                            Plan de negocios
                        </Link> */}
                    </div>
                    <div className="relative bg-gradient-to-b from-teal-500 rounded-2xl w-60 h-40 mt-10 mx-auto overflow-hidden">
                        <Link to={`/emprendimiento/${empr_id}/cronograma`} >
                            <img src={scheduling} alt="Cronograma imagen"
                            className='object-cover'
                            layout="fill" />
                            <span className='absolute top-28 w-full px-3 py-2 bg-redish rounded-lg font-bold font-krona text-xs text-darkish text-center'>
                                Cronograma</span>
                        </Link>
                    </div>

                    {/* <div>
                        <Link to="/planfinanciamiento" className='relative block w-full px-3 py-4 bg-redish rounded-lg font-bold font-krona text-xs text-darkish text-center'>
                            
                            Estructura de Financiamiento
                        </Link>
                    </div> */}
                    {/*<div>
                        <Link to="/Actividades claves" className='relative block w-full px-3 py-4 bg-redish rounded-lg font-bold font-krona text-xs text-darkish text-center'>
                            Actividades claves
                        </Link>
                    </div>*/}
                    <p className='md:mb-16 md:pb-24' />
                    <p className='md:mb-16 md:pb-16' />
                </div>
            </motion.div>
        </>
    );
}

export default SecondMenu;
