import React, { useEffect } from 'react';
import {Header} from './../components/Forms/Elements';
import LoginForm from './../components/Forms/LoginForm';
import {motion} from 'framer-motion';
import { changeMenu } from '../redux/reducers/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
const Login = (props) => {
    
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(changeMenu({title:'MENU_UNAUTH',empr_id:''}))
      }, [])
    return (
        <>
            <motion.div className=" flex items-center justify-center my-10 md:my-0 pb-12 pt-6 px-4 sm:px-6 lg:px-8"
            initial={{width:0,opacity:0}} animate={{width:"100%",opacity:2}} exit={{x:window.innerWidth, transition:{duration:0.8}}}
            >
                <div className="max-w-md w-full space-y-8">
                    <Header
                        heading="Ingresa a tu cuenta"
                        paragraph="¿Aún no tiene una cuenta? "
                        linkName="Crear cuenta"
                        linkUrl="/signup"
                    />
                    <LoginForm/>
                </div>
            </motion.div>
        </>
    );
}

export default Login;