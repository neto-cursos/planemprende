import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';
import { nanoid } from 'nanoid';
import { motion } from 'framer-motion';
import miempr01 from './../assets/images/startbusiness.png';
import misemprendimientos01 from './../assets/images/misemprendimientos01.png';
import { changeMenu } from '../redux/reducers/menuSlice';
import CardInfo from './../components/Cards/CardInfo'
import { fetchEmprs } from '../redux/reducers/emprendSlice';
import { listAllCronogramas } from '../redux/actions/cronogramaActions';

const MainMenu = ({ windowSize }) => {
    const dispatch = useDispatch();
    const emprendimientos = useSelector(state => state.emprendimientos);
    const crons = useSelector(state => state.cronogramas.cronogramas);
    const { auth, userInfo, loading } = useSelector(state => state.usuarios);
    /**Menu auth */
    useEffect(() => {
        dispatch(changeMenu({ title: 'MENU_AUTH', empr_id: '' }))
    }, [])
    useEffect(() => {
        if (userInfo.user_id !== null &&userInfo.user_id!==''){
            // console.log("user_info");
            // console.log(userInfo.user_id);
            dispatch(fetchEmprs(userInfo.user_id));
            dispatch(listAllCronogramas({ id: userInfo.user_id }))
        }            
    }, [userInfo])
    /**fin Menu auth */

    const msgNotif = "Su lista de emprendimientos se ha cargado correctamente";
    const [showButton, setShowButton] = useState(0);
    const [showNotif, setShowNotif] = useState(false);
    const usuarios = useSelector(state => state.usuarios);
    const fecha = new Date();
    const [fechaActual, setFechaActual] = useState(
        new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())
        // new Date( fecha.getDate(),fecha.getMonth(),fecha.getFullYear())
    );
    const [tareasAlert, setTareasAlert] = useState([]);
    const [tareasAlertAct, setTareasAlertAct] = useState([]);
    const [tareasAlertPy, setTareasAlertPy] = useState([]);

    // console.log("cronogramas initial state")
    // console.log(crons);
    const formatDate = (date) => {
        let end = 0;
        end = date.indexOf("/");
        const day = date.slice(0, end);
        date = date.slice(end + 1);
        end = date.indexOf("/");
        const month = date.slice(0, end);
        date = date.slice(end + 1);
        const year = date.slice(0);
        return (new Date(year, month - 1,day))
    }
    const tareasAlertTemp = [];
    const tareasAlertTempAct = [];
    const tareasAlertTempPy = [];
    useEffect(() => {
        if (crons.length > 0) {

            crons.map(cr => {
                cr.cron.map(tarea => {
                    // console.log("tarea mainmenu cronos:")
                    // console.log(tarea);
                    // console.log(formatDate(tarea.end));
                    // console.log(formatDate(tarea.end) < fechaActual);
                    if (formatDate(tarea.end) < fechaActual) {
                        if (tarea.type !== 'project') {
                            const t = {
                                ...tareasAlertTempAct, id: tarea.id, empr_id:tarea.empr_id,name: tarea.name,
                                end: tarea.end, message: `la tarea ${tarea.name} del proyecto 
                        "${tarea.project}" está retrasada`
                            }
                            // console.log("Tareas t:");
                            // console.log(t);
                            if (!tareasAlertTempAct.find(cronograma => cronograma.id === tarea.id))
                                tareasAlertTempAct.push(t);
                        }
                        else {
                            const t = {
                                ...tareasAlertTempPy, id: tarea.cron_id, empr_id:tarea.empr_id,name: tarea.name,
                                end: tarea.end, message: `El proyecto "${tarea.name}"  está retrasado`
                            }
                            // console.log("Tareas t2:");
                            // console.log(t);
                            if (!tareasAlertTempPy.find(cronograma => cronograma.id === tarea.cron_id))
                                tareasAlertTempPy.push(t);
                        }
                        
                    }



                    return true;
                })
            })
            setTareasAlertAct(tareasAlertTempAct);
            setTareasAlertPy(tareasAlertTempPy);
        }
    }, [crons])

    useEffect(() => {
        if (tareasAlertPy.length > 0)
            setShowNotif(true);
    }, [tareasAlertPy])
    /**
     * bg-gradient-to-r from-[#7b00e0] to-[ #ae31d9]
     */
    return (
        <>
            <motion.div className="flex flex-col items-center justify-center pb-12 px-4 sm:px-6 lg:px-8"
                initial={{ width: 0, opacity: 0 }} animate={{ width: "100%", opacity: 2 }} exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <h1 className='text-2xl mb-2 text-center'>Bienvenido</h1>
                <section>
                    <div id="main_section" className="mr-4 rounded-xl flex-1 bg-gray-100 my-4 md:my-4">
                        {/* <div className=" pt-0">
                        <div className="rounded-t-3xl bg-gradient-to-r from-darkish to-gray-500 pl-6 p-1 shadow text-xl text-white text-center">
                            <h1 className="font-bold p-0">Datos</h1>
                        </div>
                    </div> */}

                        <div className="flex flex-wrap justify-center">
                            <CardInfo title="Emprendimientos" value={emprendimientos.emprs.length} icon={null} colorFrom={"from-[#FBEDCA]"} colorTo={"to-[#FBEDCA]"} borderColor={"border-yellow-600"} bgRound={"bg-yellow-600"}></CardInfo>
                            <CardInfo title="Retrasados" value={tareasAlertPy.length} icon={null} colorFrom={"from-orange-200"} colorTo={"to-orange-100"} borderColor={"border-red-500"} bgRound={"bg-red-500"}></CardInfo>
                            <CardInfo title="A tiempo" value={emprendimientos.emprs.length-tareasAlertPy.length} icon={null} colorFrom={"from-[#E7F3FE]"} colorTo={"to-[#E7F3FE]"} borderColor={"border-[#9EC8FF]"} bgRound={"bg-[#9EC8FF]"}></CardInfo>
                        </div>


                        {/* <div className="flex flex-row flex-wrap flex-grow mt-2">
                        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div className="bg-white border-transparent rounded-lg shadow-xl">
                                <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                    <h2 className="font-bold uppercase text-gray-600">Graph</h2>
                                </div>
                                <div className="p-5">
                                    <table className="w-full p-5 text-gray-700">
                                        <thead>
                                            <tr>
                                                <th className="text-left text-blue-900">Name</th>
                                                <th className="text-left text-blue-900">Side</th>
                                                <th className="text-left text-blue-900">Role</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>Obi Wan Kenobi</td>
                                                <td>Light</td>
                                                <td>Jedi</td>
                                            </tr>
                                            <tr>
                                                <td>Greedo</td>
                                                <td>South</td>
                                                <td>Scumbag</td>
                                            </tr>
                                            <tr>
                                                <td>Darth Vader</td>
                                                <td>Dark</td>
                                                <td>Sith</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p className="py-2"><a href="#">See More issues...</a></p>

                                </div>
                            </div>
                        </div>
                    </div> */}
                        {showNotif && tareasAlertPy.map(alertas => {
                            return <Alert severity="error" key={nanoid()}>{alertas.message} <Link to={`/emprendimiento/${alertas.empr_id}/cronograma`} className="ml-2 px-2 border-red-700 border-solid shadow-md shadow-rojo"> ir </Link> </Alert>
                        })
                        }
                    </div>
                </section>
                <div className="max-w-md w-full space-y-8">
                    {/* <h1 className='text-2xl mb-16 text-center'>Bienvenido <span className='font-extrabold'>{usuarios.userInfo.user_name}&nbsp;
                        {usuarios.userInfo.user_apellido}
                    </span></h1> */}
                    <div>

                        <div className="relative h-44 overflow-hidden mx-0 my-auto rounded-lg transition-all ease-in-out
                         shadow-custom1   
                         hover:shadow-custom2"
                            onMouseEnter={() => setShowButton(1)} onMouseLeave={() => setShowButton(0)}>
                            <div className={`${showButton === 1 ? 'blur-sm' : 'blur-none'}`} >

                                <img src={miempr01} alt="/" className=" z-20 rounded-md block border-solid border-whitish object-cover mx-6 my-auto transition-all duration-300 " />

                                {/* <div className="text-whitish text-sm font-bold p-3 leading-6">
                                    Andrew Neil
                                </div>
                                <div className="text-whitish text-sm leading-none mx-3 my-0">
                                    Surkhet, Nepal
                                </div> */}
                            </div>
                            <Link to="/nuevoemprendimiento">
                                {(showButton === 1) && <span className='absolute top-20 w-full px-3 py-4 bg-redish hover:bg-orange-500 rounded-lg font-bold font-krona text-xs text-darkish text-center hover:scale-110'>
                                    nuevo Emprendimiento </span>}
                            </Link>
                            {/* <div className="text-whitish text-sm mt-3 pl-1 py-5 pr-3">
                                <p>
                                    User Interface Designer and <br/>front-end developer
                                </p>
                                <div>
                                    <div className="btn">
                                        <button className='h-full w-full bg-whitish border-none outline-none cursor-pointer text-sm font-bold rounded-sm transition-all duration-75 hover:transform hover:scale-95'>Message</button>
                                    </div>
                                    <div className="btn">
                                        <button>Following</button>
                                    </div>
                                </div>
                            </div>
                            <div className="icons">
                                <li><a href="#"><span className="fab fa-facebook-f"></span></a></li>
                                <li><a href="#"><span className="fab fa-twitter"></span></a></li>
                                <li><a href="#"><span className="fab fa-instagram"></span></a></li>
                            </div> */}
                        </div>


                    </div>
                    <div className="relative h-36 overflow-hidden mx-0 my-auto rounded-lg transition-all ease-in-out
                         shadow-custom1   
                         hover:shadow-custom2"
                        onMouseEnter={() => setShowButton(2)} onMouseLeave={() => setShowButton(0)}>
                        <div className={`${showButton === 2 ? 'blur-sm' : 'blur-none'}`} >

                            <img src={misemprendimientos01} alt="/" className="z-20 rounded-md block border-solid border-whitish object-cover mx-6 my-auto transition-all duration-300 " />
                        </div>

                        <Link to="/misemprendimientos">
                            {(showButton === 2) && <span className='absolute top-16  w-full px-3 py-4 bg-redish hover:bg-orange-500 rounded-lg font-bold font-krona text-xs text-darkish text-center hover:scale-110'>
                                Mis Emprendimientos </span>}
                        </Link>
                    </div>
                    {/* <p className='mb-16 pb-16' /> */}

                </div>
            </motion.div>
        </>
    );
}

export default MainMenu;
