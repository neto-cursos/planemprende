import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { addNewEmpr, resetEmprendActiva, updateEmprend, updateEmprs } from './../../../redux/reducers/emprendSlice';
import { emprendimientoFields } from '../../../constants/FormFields'
import FormAction from './../../Forms/Elements/FormAction';
import Input from './../../Forms/Elements/Input';
import Header from '../../Forms/Elements/Header';
import ToolTip from '../../ToolTip/ToolTip';
import { helpRubro, helpTipo, helpNombreEmpr } from './../../../constants/helpToolTip';
import { rubros } from '../../../constants/rubros';
const fields = emprendimientoFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');
const EmprendUpdate = ({ id }) => {

    const { empr_id } = useParams();
    const [navigate, setNavigate] = useState(false);
    const emprendimientos = useSelector(state => state.emprendimientos);
    const [emprendActivo, setEmprendActivo] = useState({});
    const [formInput, setFormInput] = useState({ id: '', empr_nomb: '', empr_rubro: 'comercial', empr_tipo: 'Producto' });
    const dispatch = useDispatch();
    const updateFormInput = e => {
        e.persist()
        setFormInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
        //console.log(e.target.name + ":" + e.target.value)
    }

    useLayoutEffect(() => {

        dispatch(resetEmprendActiva());
        //console.log("LOLOl:"+aux1.user_id)
    }, []);
    useEffect(() => {
        const aux1 = JSON.parse(sessionStorage.getItem('usr_dt'));
        setFormInput({ ...formInput, id: aux1.user_id })
        if (emprendimientos.emprs.length > 0) {
            let emprend;
            emprendimientos.emprs.map(empr => {
                if (empr.empr_id === Number(empr_id)) {
                    emprend = empr;
                }
            });
            setEmprendActivo(emprend);
        }
    }, [])

    useEffect(() => {
        // console.log("EmprendActivo")
        // console.log(emprendActivo)
        if (emprendActivo.empr_id) {
            setFormInput({
                empr_id: emprendActivo.empr_id,
                id: emprendActivo.id,
                empr_nomb: emprendActivo.empr_nomb,
                empr_rubro: emprendActivo.empr_rubro,
                empr_tipo: emprendActivo.empr_tipo
            });
        }
    }, [emprendActivo])

    const updateEmpr = (e) => {
        e.preventDefault();
        // console.log("enviando datos");
        // console.log(formInput);
        dispatch(updateEmprs(formInput))
    }
    useEffect(() => {
        if (emprendimientos.errores.length === 0 && emprendimientos.empr_id_activo !== '') {
            dispatch(resetEmprendActiva());
            setNavigate(true);

        }
    }, [emprendimientos]);

    if (navigate) {
        //console.log(axios.defaults.headers.common['Authorization'])
        return <Navigate to={`/misemprendimientos`} />;
    }

    return (
        <>
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <Header
                        heading="Actualizar Emprendimiento"
                        paragraph="Actualice su idea de emprendimiento"
                        linkName=""
                        linkUrl=""
                    />


                    <form className="mt-8 space-y-6" onSubmit={updateEmpr}>
                        <div className="">
                            {
                                emprendimientos.errores.length !== 0 && <span className='text-red-700'>{emprendimientos.errores.find(index => index.id === 'empr_nomb') ? 'Nombre de emprendimiento ya registrado, elija otro por favor' : ''}</span>}
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
                                        placeholder={field.placeholder}
                                    />

                                )
                            }
                            <span className='flex flex-row py-2'><label className=''>Rubro:</label>
                                <ToolTip initialValue={""} currentValue={helpRubro.id} title={helpRubro.id} msg={helpRubro.msg} /></span>
                            <select
                                className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                                name="empr_rubro" defaultValue={`${emprendActivo.empr_rubro}`} onChange={updateFormInput}
                            >
                                <optgroup label="Rubro al que pertenece"></optgroup>
                                {rubros.map((r) => {
                                    return <option key={r.rubro_id}>{r.nomb_rubro}</option>
                                })}
                            </select>
                            <span className='flex flex-row py-2'>
                                <label className='relative block'>Tipo:</label>
                                <ToolTip initialValue={""} currentValue={helpTipo.id} title={helpTipo.id} msg={helpTipo.msg} /></span>
                            <div className="flex flex-row">

                                <div className="flex items-center mr-4">
                                    {emprendActivo.empr_tipo === 'Producto' ?
                                        <input defaultChecked id="purple-radio" type="radio" value="Producto" name="empr_tipo" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={updateFormInput} /> :
                                        <input id="purple-radio" type="radio" value="Producto" name="empr_tipo" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={updateFormInput} />}
                                    <label htmlFor="purple-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700">Producto</label>
                                </div>
                                <div className="flex items-center mr-4">
                                    {emprendActivo.empr_tipo === 'Servicio' ?
                                        <input defaultChecked id="teal-radio" type="radio" value="Servicio" name="empr_tipo" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={updateFormInput} /> :
                                        <input id="teal-radio" type="radio" value="Servicio" name="empr_tipo" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={updateFormInput} />}
                                    <label htmlFor="teal-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700">Servicio</label>
                                </div>
                            </div>
                            <FormAction handleSubmit={updateEmpr} text="Actualizar Datos" />
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

export default EmprendUpdate;
