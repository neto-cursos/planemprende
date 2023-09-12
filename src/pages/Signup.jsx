import Header from "./../components/Forms/Elements/Header";
import SignUpForm from "./../components/Forms/SignUpForm";
import React, { useEffect } from 'react';
import {motion} from 'framer-motion';
import { changeMenu } from '../redux/reducers/menuSlice';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(changeMenu({title:'MENU_UNAUTH',empr_id:''}))
      }, [])
    //min-h-full h-screen
    return (
        <>
            <motion.div className=" flex items-center justify-center pt-6 pb-12 px-4 sm:px-6 lg:px-8"
            initial={{width:0,opacity:0}} animate={{width:"100%",opacity:2}} exit={{x:window.innerWidth, transition:{duration:0.8}}}
            >
                <div className="max-w-md w-full space-y-8">

                    <Header
                        heading="Crear nueva Cuenta"
                        paragraph="¿Ya esta registrado? "
                        linkName="Iniciar Sesión"
                        linkUrl="/login"
                    />
                    <SignUpForm />
                </div>
            </motion.div>
        </>
    );
}

export default Signup;
