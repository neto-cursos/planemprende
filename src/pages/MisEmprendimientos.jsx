import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { setDataFromLocalSave, updateLoading } from '../redux/reducers/userSlice';
import Spinner from '../components/Spinner/Spinner';
import {motion} from 'framer-motion';

const MisEmprendimientos = () => {           
    const { auth, userInfo, loading } = useSelector(state => state.usuarios);
    const { empr_id,user_id,params } = useParams();
    const location = useLocation();
    const addrReq1 = '/misemprendimientos/';
    // console.log("empr user: " + userInfo.user_name)
    // console.log("empr auth: " + auth)
    if (loading) {
        return (<><Spinner></Spinner></>)
    }
    else
        return (
            <>

                <div>
                    <span className='text-xl sm:text-2xl lg:text-4xl'>Mis Emprendimientos</span>
                </div>
                {auth ? <Navigate to={`/misemprendimientos/${userInfo.user_id}`} replace={true}/> : <Navigate to='/' />}

            </>
        );
}

export default MisEmprendimientos;
