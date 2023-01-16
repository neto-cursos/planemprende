import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { emprendimientoFields } from './../../constants/FormFields'
import { addNewEmpr, resetEmprendActiva } from './../../redux/reducers/emprendSlice';
import FormAction from './Elements/FormAction';
import Input from './Elements/Input';
import ToolTip from '../ToolTip/ToolTip';
import {helpRubro,helpTipo,helpNombreEmpr} from './../../constants/helpToolTip';
import { nanoIdNumbers } from '../../utils/nanoIdCustom';
import { rubros } from '../../constants/rubros';
const fields = emprendimientoFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');
const EmprendimientoForm = () => {
    const emprIdOpt=useRef(`Emprendimiento${nanoIdNumbers(6)}`);
    const [emprId, setEmprId] = useState(null);
    const [navigate, setNavigate] = useState(false);
    const formInput= useRef({ id: '', empr_nomb: '', empr_rubro: 'comercial', empr_tipo: 'Producto' });
    const dispatch = useDispatch();
    const updateFormInput = e => {
        e.persist()
        formInput.current[e.target.name]=e.target.value;
        // console.log(e.target.name + ":" + e.target.value)
    }

    useLayoutEffect(() => {
        
        dispatch(resetEmprendActiva());
    }, []);
    useEffect(()=>{
        const aux1 = JSON.parse(sessionStorage.getItem('usr_dt'));
        formInput.current.id=aux1.user_id;
    },[])
    const emprendimientos = useSelector(state => state.emprendimientos);
    const crearEmpr =  (e) => {
        e.preventDefault();
        
        if(formInput.current.empr_nomb===''){
        //     setFormInput({...formInput,empr_nomb:e.empr_nomb.placeholder});
        formInput.current.empr_nomb=emprIdOpt.current;
        }
        // console.log("enviando datos");
        // console.log(formInput)
        dispatch(addNewEmpr(formInput.current))
    }
    useEffect(() => {
        if (emprendimientos.errores.length === 0 && emprendimientos.empr_id_activo !== '') {
            setEmprId(emprendimientos.empr_id_activo)
            dispatch(resetEmprendActiva());
            setNavigate(true);
        }
    }, [emprendimientos]);
    
    if (navigate) {
        //console.log(axios.defaults.headers.common['Authorization'])
        return <Navigate to={`/emprendimiento/${emprId}`} />;
    }
    return (
        <form className="mt-8 space-y-6" onSubmit={crearEmpr}>
            <div className="">
                {
                    emprendimientos.errores.length !== 0 && <span className='text-red-700'>{ emprendimientos.errores.find(index => index.id === 'empr_nomb')?'Nombre de emprendimiento ya registrado, elija otro por favor':''}</span>}
                <span className='flex flex-row py-0'><label className=''>Nombre Del Emprendimiento:</label>
                <ToolTip initialValue={""} currentValue={helpNombreEmpr.id} title={helpNombreEmpr.id} msg={helpNombreEmpr.msg} /></span>
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            onChange={updateFormInput}
                            value={formInput[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={emprIdOpt.current}
                        />

                    )
                }
                <span className='flex flex-row py-2'><label className=''>Rubro:</label>
                <ToolTip initialValue={""} currentValue={helpRubro.id} title={helpRubro.id} msg={helpRubro.msg} /></span>
                <select
                    className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                    name="empr_rubro" defaultValue={'Comercial'} onChange={updateFormInput}
                >
                    <optgroup label="Rubro al que pertenece"></optgroup>
                    {rubros.map((r)=>{
                        return <option key={r.rubro_id}>{r.nomb_rubro}</option>    
                    })}
                </select>
                <span className='flex flex-row py-2'>
                <label className='relative block'>Tipo:</label>
                <ToolTip initialValue={""} currentValue={helpTipo.id} title={helpTipo.id} msg={helpTipo.msg} /></span>
                <div className="flex flex-row">

                    <div className="flex items-center mr-4">
                        <input defaultChecked id="purple-radio" type="radio" value="Producto" name="empr_tipo" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={updateFormInput} />
                        <label htmlFor="purple-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700">Producto</label>
                    </div>
                    <div className="flex items-center mr-4">
                        <input id="teal-radio" type="radio" value="Servicio" name="empr_tipo" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={updateFormInput} />
                        <label htmlFor="teal-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700">Servicio</label>
                    </div>
                </div>
                <FormAction handleSubmit={crearEmpr} text="Registrar Emprendimiento" />
            </div>

        </form>
    );
}

export default EmprendimientoForm;
