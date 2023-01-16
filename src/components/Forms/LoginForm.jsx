import { FormAction, FormExtra, Input, Header } from "./Elements";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFields } from './../../constants/FormFields';
import Error from '../Error';
import * as yup from "yup";
import { userLogin } from './../../redux/actions/userActions';
import { useEffect } from "react";
import LoadingScreen from "./../LoadingScreen/LoadingScreen"
import SetTimeOut from "../../utils/SetTimeOut";
import {updateAuth, changeSuccessLogin} from './../../redux/reducers/userSlice';
import SuccessMessage from "../MessagesBox/SuccessMessage";
import ResetAllReducers from "../../services/ResetAllReducers";
const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

const LoginForm = (props) => {
    const { loading, userInfo, error, auth, errores,successLogin } = useSelector((state) => state.usuarios)
    const dispatch = useDispatch();
    const schema = yup.object({
        email: yup.string().required().typeError('Debe ingresar un email válido'),
        password: yup.string().required('el password es un campo obligatorio')
        .trim('su password no debe incluir espacios al inicio o final')
        .strict(true)
        .min(5, 'su password debe tener un mínimo de 5 caracteres')
        .max(50, 'su password no debe exceder el máximo de 50 caracteres')
        .typeError('Debe ingresar su password'),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    /**
     * Console log
     */
    const submitForm = (data) => {
       dispatch(userLogin(data));
    }
    

    return (<>{!successLogin?!loading?
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitForm)}>
            {error && <Error>{errores}</Error>}
            {/* {errors.email?.message}
            {errors.password?.message} */}
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            {...register(field.name)}
                            //handleChange={updateFormInput}
                            //value={register[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            //name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                            errors={errors}
                        />
                    )
                }
            </div>
            <FormExtra />
            <FormAction action={'submit'} text="Iniciar Sesión" disabled={loading} />
        </form>:<LoadingScreen/>:<><ResetAllReducers/>
        <SetTimeOut condition={successLogin} timeDelay={1000} changeSuccess={updateAuth} changeCondition={changeSuccessLogin} value={true}>
           <SuccessMessage></SuccessMessage> </SetTimeOut></>}
           </>
    );
}

export default LoginForm;
