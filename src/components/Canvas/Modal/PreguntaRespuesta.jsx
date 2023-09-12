import React from 'react'
import SelectCustom from "../../Forms/Elements/SelectCustom";
import EditIcon from '@mui/icons-material/Edit';
import PreguntaEdit from './PreguntaEdit';
import PreguntaAdd from './PreguntaAdd';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//thunk and redux to deleteUsersPregs
import { deleteUsersPregs } from "../../../redux/actions/userPreguntaActions";
import { deleteUsersPreg } from "../../../redux/reducers/userPreguntaSlice";
//confirmDialog
import ConfirmDialog from '../../Dialog';
import { useDispatch } from 'react-redux';
import { DeleteConfirmation } from '../../DeleteConfirmation/DeleteConfirmation';
import * as yup from 'yup';
import { validateForm } from '../../../utils/validateForm';
import { trimSingleText } from '../../../utils/trimText';
import SaveIcon from '@mui/icons-material/Save';


const PreguntaRespuesta = ({ onClose, handleSubmit, modulo, idRespuesta, preguntas, readySelect, inputTitle, respuesta, idPreg, setIdPreg, empr_id }) => {
    yup.setLocale({
        mixed: {
            default: 'Error',
            required: 'Este campo es requerido',
        },

        number: {
            min: 'El número debe ser mayor a ${min}',
        },
    });
    const schema = yup.object().shape({
        usr_resp_text: yup.string().required(),
    });
    const [isOpenEdit, setIsOpenEdit] = React.useState(false);
    const [errores, setErrores] = React.useState(null);
    const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
    const dispatch = useDispatch();
    const enviar = React.useRef(false);
    const [isDeleted, setIsDeleted] = React.useState(false);
    const [editUsrPreg, setEditUsrPreg] = React.useState(false);
    const [addUsrPreg, setAddUsrPreg] = React.useState(false);
    const editUsrPregOn = () => {
        setEditUsrPreg(true);
    }
    const addUsrPregOn = () => {
        setAddUsrPreg(true);
    }

    const validateSubmit=(e)=>{
        e.preventDefault();
        validateForm(schema, {usr_resp_text:trimSingleText(inputTitle.current.value)}, setErrores);
    }
    const deleteConfirmation = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Está seguro de borrar esta Pregunta?',
            subTitle: "Esta operación no puede ser revertida",
            onConfirm: () => {
                deleteUserPregunta(id);
            }
        })
    };//enables confirmDialog

    const deleteUserPregunta = (id) => {
        // e.preventDefault();
        console.log(id);
        enviar.current = true;
        dispatch(deleteUsersPregs({ usr_preg_id: id }));
        dispatch(deleteUsersPreg(id));
        setIsDeleted(true);
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    };
    React.useEffect(() => {
        inputTitle.current.focus();
    }, [])

    React.useEffect(() => {
        if (errores !== null) {
            if (errores.length == 0) {
                handleSubmit();
            }
            inputTitle.current.focus();
            console.log(errores);
        }
    }, [errores]);
    React.useEffect(() => {
        if (isDeleted === true) {
            enviar.current = false;
            console.log(preguntas);
            // const idd=preguntas.find(p=>p.usr_preg_id!==null&&p.modu_id===modulo)?.usr_preg_id;
            // console.log(idd);
            setIdPreg(preguntas.find(p => p.usr_preg_id !== null && p.modu_id === modulo)?.usr_preg_id);
        }
    }, [isDeleted]);
    React.useEffect(() => {
        console.log("chng idpreg:" + idPreg);
    }, [idPreg]);
    return (<>
        {/*body*/}
        <div className="relative p-2 flex-auto">
            <div className='flex flex-row'>
                {(editUsrPreg === false && addUsrPreg === false) ?
                    ((readySelect && idRespuesta !== 0) || idRespuesta === 0) && <>
                        <SelectCustom options={preguntas} modulo={modulo} respuesta={respuesta} idPreg={idPreg} setIdPreg={setIdPreg} idRespuesta={idRespuesta}
                        ></SelectCustom><div className='flex flex-col justify-center'>
                            <span className='flex m-0 px-2 py-0 items-center cursor-pointer' onClick={() => { addUsrPregOn() }}>
                                <AddIcon></AddIcon>
                            </span>
                            <span className='flex m-0 p-2 items-center cursor-pointer' onClick={() => { editUsrPregOn() }}>
                                <EditIcon></EditIcon>
                            </span>
                            {/* <span type="submit" className="cursor-pointer flex items-center" onClick={() => (deleteConfirmation(idPreg))}><DeleteForeverIcon></DeleteForeverIcon></span> */}

                        </div></>
                    : editUsrPreg === true ? <PreguntaEdit options={preguntas} modulo={modulo} idPreg={idPreg} setIdPreg={setIdPreg} setEditUsrPreg={setEditUsrPreg} editUsrPreg={editUsrPreg}></PreguntaEdit> : addUsrPreg === true ? <PreguntaAdd options={preguntas} modulo={modulo} idPreg={idPreg} setIdPreg={setIdPreg} setAddUsrPreg={setAddUsrPreg} empr_id={empr_id}></PreguntaAdd> : ''
                }
            </div>
            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                <label>Respuesta</label>
                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Su respuesta..." ref={inputTitle}></textarea>
            </p>
            <span className="text-red-500 block">
                {errores !== null && errores.find(e => e.errorKey === 'usr_resp_text')?.errorMsg}
            </span>
        </div>
        {/*footer*/}
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
            >
                Cerrar
            </button>
            <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={validateSubmit}
            >
                Guardar Cambios
            </button>
        </div>
        <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
        />
    </>
    )
}

export default PreguntaRespuesta
