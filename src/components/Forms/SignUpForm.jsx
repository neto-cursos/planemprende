import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ApiAuth from './../../services/ApiAuth';
import { logOut } from './../../utils/UtilsAuth';
import { signupFields } from './../../constants/FormFields'
import FormAction from './Elements/FormAction';
import Input from './Elements/Input';
import { useForm } from 'react-hook-form';
import Error from '../Error';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/userActions';
import MessageRedirect from '../MessageRedirect/MessageRedirect';
import { changeSuccessRegister } from '../../redux/reducers/userSlice';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');
const SignUpform = () => {
  const { loading, userInfo, error, auth, errores, successRegister } = useSelector((state) => state.usuarios)
  const [navigate, setNavigate] = useState(false);
  const [formInput, setFormInput] = useState({ name: '', apellido: '', email: '', password: '' });
  const dispatch = useDispatch();
  const submitForm = e => {
    // e.persist()
    // console.log(e);
    dispatch(registerUser(e));
    // setFormInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    // console.log(e.target.name + ":" + e.target.value)
  }
  const schema = yup.object({
    email: yup.string().required().typeError('Debe ingresar un email válido'),
    password: yup.string().required()
      .trim('su password no debe incluir espacios al inicio o final')
      .strict(true)
      .min(5, 'su password debe tener un mínimo de 5 caracteres')
      .max(50, 'su password no debe exceder el máximo de 50 caracteres')
      .typeError('Debe ingresar su password'),
  }).required();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const crearUsuario = async (e) => {
    dispatch(registerUser(data));

    // e.preventDefault();
    // console.log("enviando datos");
    // console.log(formInput)
    // await ApiAuth().post('/auth/registro', formInput).then(response => {
    //   console.log(response)
    //   setNavigate(true);
    //   logOut();
    // }).catch((err)=>{})
  }
  useEffect(() => {
    if (successRegister === true) {
      setShowSuccessMsg(true);
      const timer = setTimeout(() => mostrarMensaje(), 2000);
      return () => clearTimeout(timer);    
    }
  }, [successRegister])
  
const [showSuccessMsg,setShowSuccessMsg]=useState(false);
  const mostrarMensaje=() => {
    dispatch(changeSuccessRegister(false));
    setNavigate(true);
    // return (setShowSuccessMsg(false));
  }

if (navigate) {
  //console.log(axios.defaults.headers.common['Authorization'])
  return <Navigate to="/login" />;
}

return (!showSuccessMsg?
  <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitForm)}>
    {error && <Error>{errores}</Error>}
    <div className="">
      {
        fields.map(field =>
          <Input
            key={field.id}
            {...register(field.name)}

            // value={formInput[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            // name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            errors={errors}
          />

        )
      }
      <FormAction handleSubmit={crearUsuario} text="Registrar Cuenta" />
    </div>

  </form>:<MessageRedirect message={"Su cuenta ha sido creado exitosamente"} title={"Cuenta Creada"}></MessageRedirect>
);
}

export default SignUpform;
