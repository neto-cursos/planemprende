import React from 'react';
import EmprendimientoForm from '../components/Forms/EmprendimientoForm';
import Header from '../components/Forms/Elements/Header';
import {motion} from 'framer-motion';
const RegisterEmprendimiento = () => {
    return (
        <>
        <motion.div className="flex items-center justify-center my-10 md:my-0 pb-12 pt-6 px-4 sm:px-6 lg:px-8"
        initial={{width:0,opacity:0}} animate={{width:"100%",opacity:2}} exit={{x:window.innerWidth, transition:{duration:0.1}}}
        >
            <div className="max-w-md w-full space-y-8">
                <Header
                    heading="Iniciar Emprendimiento"
                    paragraph="Registre su idea de emprendimiento"
                    linkName=""
                    linkUrl=""
                />
                <EmprendimientoForm></EmprendimientoForm>
            </div>
        </motion.div>
    </>
    );
}

export default RegisterEmprendimiento;
