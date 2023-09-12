import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRespuesta, deleteRespuesta, updateRespuesta } from "./../../../redux/reducers/respuestaSlice";
import respuestaCostoSlice, { addRespCosto, deleteRespCosto, updateRespCosto } from "./../../../redux/reducers/respuestaCostoSlice";
import { modulos } from './../../../constants/modulos'
import { nanoid } from "@reduxjs/toolkit";
import SelectCustom from "../../Forms/Elements/SelectCustom";
import CostoRespuesta from "../../Canvas/Modal/CostoRespuesta";
import PreguntaRespuesta from "../../Canvas/Modal/PreguntaRespuesta";

const ModalCreateEntry = ({ message, isOpen, onClose, modulo, idRespuesta, setIdRespuesta, idCanvas, preguntas, readySelect, setReadySelect, idRespuestaCosto, costos = null, empr_id }) => {
    // const totalPreguntas=React.useRef([]);
    // const totalPreguntas=[];
    // if(preguntas!=null&&typeof(preguntas)=='array')
    // if(preguntas!=null&&Array.isArray(preguntas))
    // preguntas.map((p)=>{totalPreguntas.push(p);});
    // preguntas.map((p)=>{totalPreguntas.current.push(p);});
    // if(costos!=null&&Array.isArray(costos))
    // costos.map((c)=>{totalPreguntas.push(c)});
    // costos.map((c)=>{totalPreguntas.current.push(c)});

    // const [pregSel, setPregSel] = useState({
    //     preg_id: '',
    //     preg_text: '',
    // });
    const [idPreg, setIdPreg] = useState('');
    const [idCosto, setIdCosto] = useState('');
    const modu_nomb2 = modulos.find((nodo => nodo.modu_id == modulo))
    const inputTitle = useRef(null);
    const inputActividad = useRef(null);
    const inputMonto = useRef(null);
    const dispatch = useDispatch();
    const respuestas = useSelector(state => state.respuestas.respuestas);
    const respuestasCostos = useSelector(state => state.respuestasCostos.respCostos);
    const [isReadyToSend, setIsReadyToSend] = useState(false);

    const [respuesta, setRespuesta] = useState({
        resp_id: '',
        preg_id: '',
        modu_nume: '',
        canv_id: idCanvas,
        resp_nume: '',
        resp_text: '',
        resp_desc: '',
        resp_esta: ''
    });
    const [respCosto, setRespCosto] = useState(
        {
            resp_cost_id: '',
            canv_id: idCanvas,
            cost_id: '',
            modu_nume: '',
            resp_cost_nume: '',
            resp_cost_desc: '',
            resp_cost_acti: '',
            resp_cost_monto: '',
            resp_cost_esta: '',
        })
    const onClicAccion = (type) => {
        if (type === 'respuesta')
            setRespuesta({
                ...respuesta,
                resp_text: inputTitle.current.value,
                preg_id: idPreg,
            });
        else if (type === 'respuestaCosto')
            setRespCosto({
                ...respCosto,
                resp_cost_acti: inputActividad.current.value,
                resp_cost_monto: Number(inputMonto.current.value),
                cost_id: idCosto,
            })
    }

    const handleSubmit = () => {
        //e.preventDefault();
        if (idRespuesta !== 0) {
            setIsReadyToSend(true);
            onClicAccion("respuesta");
        } else {
            const idActClave=nanoid();
            dispatch(addRespuesta({
                ...respuesta, resp_id: idActClave,
                modu_nume: modulo,
                canv_id: idCanvas,
                resp_nume: '',
                resp_text: inputTitle.current.value,
                resp_esta: '',
                preg_id: idPreg,
                resp_id_ref:idActClave,
            }));
            if (modulo == 7) {
                dispatch(addRespCosto({
                    resp_cost_id: idActClave,
                    modu_nume: 9,
                    canv_id: idCanvas,
                    cost_id: 1,
                    resp_cost_nume: '',
                    resp_cost_acti: inputTitle.current.value,
                    resp_cost_monto: 0,
                    resp_cost_desc: '',
                    resp_cost_esta: '1',
                    resp_id_ref:idActClave
                }));
            }
            onClose();
        }
    }
    const handleSubmitCosto = (e) => {
        e.preventDefault();
        if (idRespuestaCosto !== 0) {
            setIsReadyToSend(true);
            onClicAccion("respuestaCosto");
        } else {
            
                dispatch(addRespCosto({
                    ...respCosto, resp_cost_id: nanoid(),
                    modu_nume: modulo,
                    canv_id: idCanvas,
                    cost_id: idCosto,
                    resp_cost_nume: '',
                    resp_cost_acti: inputActividad.current.value,
                    resp_cost_monto: Number(inputMonto.current.value),
                    resp_cost_desc: '',
                    resp_cost_esta: '1',
                }));
                
                onClose();
             
        }
    }
    useEffect(() => {
        if (idRespuesta !== 0) {
            const resp = respuestas.find(resp => resp.resp_id === idRespuesta && resp.modu_nume == modulo);
            setRespuesta(resp);
            setIdPreg(resp.preg_id);
            // console.log(respuestas.find(resp => resp.resp_id === idRespuesta && resp.modu_nume == modulo))
        }
        if (idRespuestaCosto !== 0) {
            const resp = respuestasCostos.find(resp => resp.resp_cost_id === idRespuestaCosto && resp.modu_nume == modulo);
            setRespCosto(resp);
            setIdCosto(resp.cost_id);
            // console.log(respuestas.find(resp => resp.resp_id === idRespuesta && resp.modu_nume == modulo))
        }
    }, [idRespuesta, modulo, respuestas, idRespuestaCosto, respuestasCostos])

    useEffect(() => {
        if (idRespuesta !== 0) {
            inputTitle.current.value = respuesta.resp_text;
            //inputDesc.current.value = respuesta.resp_desc;            
            // console.log("ModalCreateEntry .. valor de st respuesta")
            // console.log(respuesta);
            if (isReadyToSend) {
                dispatch(updateRespuesta(respuesta));
                if(modulo==7){
                    const respC=respuestasCostos.find(r=>(r.resp_id_ref==respuesta.resp_id_ref))
                    if(respC!=null){
                        const respCosto7={...respC,resp_cost_acti:respuesta.resp_text,
                        }
                        dispatch(updateRespCosto(respCosto7));
                    }
                }
                setIsReadyToSend(false)
                onClose()
            }
        }
        if (idRespuestaCosto !== 0) {
            inputActividad.current.value = respCosto.resp_cost_acti;
            inputMonto.current.value = respCosto.resp_cost_monto;
            //inputDesc.current.value = respuesta.resp_desc;            
            // console.log("ModalCreateEntry .. valor de st respuesta")
            // console.log(respuesta);
            if (isReadyToSend) {
                dispatch(updateRespCosto(respCosto));
                setIsReadyToSend(false)
                onClose()
            }
        }
        if (respuesta.resp_id === idRespuesta) {
            setReadySelect(true);
            // console.log("readytoselect: " + readySelect);
        }
        if (respCosto.resp_cost_id === idRespuestaCosto) {
            setReadySelect(true);
        }
    }, [respuesta, respCosto, idRespuesta, idRespuestaCosto, isReadyToSend, dispatch])


    if (!isOpen) return null;
    return preguntas != null && ReactDOM.createPortal(
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-2 mx-auto max-w-3xl w-[20rem] md:w-[27rem]">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            {modu_nomb2.modulo} {/*idRespuesta*/}
                        </h3>

                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-redish opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => onClose()}
                        >
                            <span className="bg-transparent text-redish hover:text-red-500 opacity-100 text-3xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>

                    {(costos !== null && (idRespuestaCosto != 0 || (idRespuestaCosto === 0 && modulo === 9 && idRespuesta === 0))) ?
                        <CostoRespuesta onClose={onClose} modulo={modulo} idRespuestaCosto={idRespuestaCosto} costos={costos} readySelect={readySelect} inputActividad={inputActividad} inputMonto={inputMonto} handleSubmit={handleSubmitCosto} respuestasCostos={respuestasCostos} idCosto={idCosto} setIdCosto={setIdCosto} />
                        : <PreguntaRespuesta onClose={onClose} modulo={modulo} idRespuesta={idRespuesta} preguntas={preguntas} readySelect={readySelect} inputTitle={inputTitle} handleSubmit={handleSubmit} respuesta={respuesta} idPreg={idPreg} setIdPreg={setIdPreg} empr_id={empr_id} />
                    }
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ModalCreateEntry;
