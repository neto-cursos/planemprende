import React from 'react'
import {motion} from 'framer-motion';
import { FormAction, Input, Header } from "./../Forms/Elements";
import { recoverPassFields } from './../../constants/FormFields';
import { useDispatch,useSelector } from 'react-redux';
import Error from '../Error';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
const fields = recoverPassFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

const ForgotPassword = () => {
    const { loading, userInfo, error, auth, errores,successLogin } = useSelector((state) => state.usuarios)
    const dispatch = useDispatch();
    const schema = yup.object({
        email: yup.string().required().typeError('Debe ingresar un email válido'),
    }).required();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    /**
     * Console log
     */
    const submitForm = (data) => {
    //    dispatch(userLogin(data));
    }
    return (
    <>
            <motion.div className=" flex items-center justify-center my-10 md:my-0 pb-12 pt-6 px-4 sm:px-6 lg:px-8"
            initial={{width:0,opacity:0}} animate={{width:"100%",opacity:2}} exit={{x:window.innerWidth, transition:{duration:0.8}}}
            >
                <div className="max-w-md w-full space-y-8">
                    <Header
                        heading="Recupera tu password"
                        paragraph="¿ya recordaste tu password? "
                        linkName="login"
                        linkUrl="/login"
                    />
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitForm)}>
                {error && <Error>{errores}</Error>}
                {/* {error && <SnackBar state={true} condition={isOpenModal} setCondition={setIsOpenModal} message={errores} customTimeOut={1000}><ModalCustom isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} mensaje={error}></ModalCustom></SnackBar>} */}


                <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            {...register(field.name)}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                            errors={errors}
                        />
                    )
                }
            </div>
            <FormAction action={'submit'} text="Enviar" disabled={loading} />
                </form>
                </div>
            </motion.div>
        </>
  )
}

export default ForgotPassword