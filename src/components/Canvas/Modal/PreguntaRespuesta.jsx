import React from 'react'
import SelectCustom from "../../Forms/Elements/SelectCustom";
import EditIcon from '@mui/icons-material/Edit';
import PreguntaEdit from './PreguntaEdit';
import PreguntaAdd from './PreguntaAdd';
import AddIcon from '@mui/icons-material/Add';
const PreguntaRespuesta = ({ onClose, handleSubmit, modulo, idRespuesta, preguntas, readySelect, inputTitle, respuesta, idPreg, setIdPreg,empr_id }) => {
    const [editUsrPreg,setEditUsrPreg]=React.useState(false);
    const [addUsrPreg,setAddUsrPreg]=React.useState(false);
    const editUsrPregOn=()=>{
        setEditUsrPreg(true);
    }
    const addUsrPregOn=()=>{
        setAddUsrPreg(true);
    }
    return (<>
        {/*body*/}
        <div className="relative p-2 flex-auto">
            <div className='flex flex-row'>
                {(editUsrPreg===false&&addUsrPreg===false)?
                ((readySelect && idRespuesta !== 0) || idRespuesta === 0) && <><SelectCustom options={preguntas} modulo={modulo} respuesta={respuesta} idPreg={idPreg} setIdPreg={setIdPreg} idRespuesta={idRespuesta}
                ></SelectCustom><div className='flex flex-col justify-center'>
                <span className='flex m-0 p-0 items-center cursor-pointer' onClick={()=>{addUsrPregOn()}}>
                    <AddIcon></AddIcon>
                </span>
                <span className='flex m-0 p-0 items-center cursor-pointer' onClick={()=>{editUsrPregOn()}}>
                    <EditIcon></EditIcon>
                </span></div></>:editUsrPreg===true?<PreguntaEdit options={preguntas} modulo={modulo} idPreg={idPreg} setIdPreg={setIdPreg} setEditUsrPreg={setEditUsrPreg}></PreguntaEdit>:addUsrPreg===true?<PreguntaAdd options={preguntas} modulo={modulo} idPreg={idPreg} setIdPreg={setIdPreg} setAddUsrPreg={setAddUsrPreg} empr_id={empr_id}></PreguntaAdd>:''
                }
            </div>
            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                <label>Respuesta</label>
                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Su respuesta..." ref={inputTitle}></textarea>
            </p>
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
                onClick={handleSubmit}
            >
                Guardar Cambios
            </button>
        </div>
    </>
    )
}

export default PreguntaRespuesta
