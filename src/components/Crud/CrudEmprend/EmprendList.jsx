import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useParams } from 'react-router-dom';
import {
    deleteEmprend, fetchEmprs, getEmprsError,
    getEmprsStatus, removeEmpr, setEmprStatus
} from './../../../redux/reducers/emprendSlice';
import EditCard from './../../../assets/icons/editCard';
import RemoveCard from './../../../assets/icons/removeCard';
import Button from '@mui/material/Button';
import Notifications from '../../Notifications';
import { changeMenu } from '../../../redux/reducers/menuSlice';

const EmprendList = () => {
    const dispatch = useDispatch();
    /**Menu auth */
    useEffect(() => {
        dispatch(changeMenu({title:'MENU_AUTH',empr_id:''}))
      }, [])
      /**fin Menu auth */
    const msgNotif = "Su lista de emprendimientos se ha cargado correctamente";
    const [showNotif, setShowNotif] = useState(false);

    const { user_id } = useParams();
    
    //const emprends = useSelector(state => state.emprendimientos)
    const emprends = useSelector(state => state.emprendimientos.emprs);
    const emprsStatus = useSelector(getEmprsStatus);
    const emprsError = useSelector(getEmprsError);
    const [navigate, setNavigate] = useState(false);
    const updateEmpr = (id) => {
        //dispatch(updateEmpr(id));

        // return <Navigate to={`/emprendimiento/${id}/update`} />;
    }
    const handleDelete = (id) => {
        // console.log(id)
        dispatch(deleteEmprend(id));
        dispatch(removeEmpr({ empr_id: id }));
    }

    useEffect(() => {
        if (emprsStatus === 'idle' || emprsStatus === 'fulfilled') {
            let items = {}; let dataid = 0;
            if (sessionStorage.getItem('usr_dt')) {
                items = JSON.parse(sessionStorage.getItem('usr_dt'));
                // console.log("userData:" + items.user_name);
                dataid = items.user_id;
            }
            dispatch(fetchEmprs(dataid))
        }
        if (emprsStatus === 'succeeded') {
            setShowNotif(true);
        }


    }, [emprsStatus, dispatch])
    const [changeEmprs, setChangeEmprs] = useState(false);
    useEffect(() => {
        setChangeEmprs(true);
    }, [emprends])

    return (
        <>
            {showNotif && <Notifications msgNotif={msgNotif} showNotif={showNotif} setShowNotif={setShowNotif} severity="info" />}
            <div className='ml-2 sm:ml-0'><h2 className='text-xl sm:text-2xl lg:text-4xl text-center font-bold'>Mis Emprendimientos</h2>
                {/*<Link to='/reduxexample/taskform'><h3>Nuevo Emprendimiento</h3></Link>*/}
                <Link to='/nuevoemprendimiento' className='text-canvas2Txt font-bold'>
                    <Button variant="contained" sx={{ mb: 2 }} color="secondary">Nuevo Emprendimiento</Button>
                </Link>

                {/*<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                
                                <th scope="col" className="py-3 px-6">
                                    Nombre Emprendimiento
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Descripción
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Rubro
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Tipo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
    */}
                {
                    emprends.map((emprends) => {
                        return (
                            <div className="flex items-center bg-gray-100 mb-4 shadow text-base" key={emprends.empr_id}>
                                <div className="flex-auto text-left px-4 py-2 m-1 w-3/4">
                                    <Link to={`/emprendimiento/${emprends.empr_id}`}>
                                        <p className="text-gray-900 leading-none font-bold">{emprends.empr_nomb}</p>
                                        <p className="text-gray-600">Rubro: {emprends.empr_rubro} - Tipo: {emprends.empr_tipo}</p>
                                        <span className="inline-block text-sm font-semibold mt-1">{emprends.empr_desc}</span>
                                    </Link>
                                </div>

                                <div className="flex-auto text-left sm:text-right px-2 py-2 m-1 w-1/4">
                                    <Link to={`/emprendimiento/${emprends.empr_id}/update`}>
                                        <button title="Editar" onClick={() => updateEmpr(emprends.empr_id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-3 py-2 px-4 rounded-full inline-flex items-center">
                                            <EditCard></EditCard>
                                        </button>
                                    </Link>
                                    <button title="Eliminar" onClick={() => handleDelete(emprends.empr_id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center">
                                        <RemoveCard></RemoveCard>
                                    </button>
                                </div>

                                {/*<TableEmpr columns={columns} data={data} />*/}
                                {/* <Table columns={columns} data={data} map={mapFly} /> */}
                                {/*<tr key={emprends.empr_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                    {emprends.empr_nomb}
                                </td>
                                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                    {emprends.empr_desc}
                                </td>
                                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                    {emprends.empr_rubro}
                                </td>
                                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                    {emprends.empr_tipo}
                                </td>
                    </tr>*/}

                                {/*<div key={emprends.empr_id}>
                                            <h3 className='text-redish'>{emprends.empr_nomb}</h3>
                                            <p>{emprends.empr_desc}</p>
                                            <button onClick={() => {
                                                return handleDelete(emprends.empr_id)
                                            }}>borrar</button>
                                            <Link to={`/misemprendimientos/${user_id}/edit/${emprends.empr_id}`}>edit</Link>
                                        </div>*/}
                            </div>
                        )
                    }

                    )}
                {/*            </tbody>
            </table>
                </div >*/}
            </div >
            <p className='mb-32 pb-32' />
            <p className='mb-16 pb-16' />
        </>
    );
}

export default EmprendList;
