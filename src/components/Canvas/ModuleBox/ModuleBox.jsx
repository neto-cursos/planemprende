import React from 'react';
import plussign from './../../../assets/images/plus-svgrepo-com.svg'
import EditEntry from './../../../assets/icons/editEntry';
import EraseEntry from './../../../assets/icons/eraseEntry';
import { nanoid } from 'nanoid';
import EditIcon from '@mui/icons-material/Edit';
const ModuleBox = ({ respuestas, onMouseEnter, onMouseLeave, handleDelete, handleEdit, handleModulo, moduloNumber, moduloDB, imageName, buttonActiveHovering, classExtra, nameModulo, bgcolor, bgborder,preguntas,
    downlImage, costos = null, respuestasCostos = null,coin='Bs' }) => {

    // console.log("costos")
    // console.log(costos)
    // console.log("__________preguntas")
    // console.log(preguntas);
    let pregIdOld = null;
    let costoTotal=0;
    // console.log("modulos: ")
    // console.log(moduloDB)s
    // console.log("modulo ")
    // console.log(moduloNumber)
    return (
        <>
            <div className={`text-lg font-black text-center rounded-lg ${classExtra}`}>
                <div className='flex flex-row pr-2 text-left pb-2 pt-1 pl-1'>
                    <h3 className='w-4/5'>
                        <span className={`text-3xl font-bold rounded-2xl text-center pl-1`}>{moduloDB==2?1:moduloDB==1?2:moduloDB}&nbsp;</span>
                        {nameModulo}                        
                    </h3>
                    {/*'icon'*/}
                    <span
                        className="w-1/5 text-right cursor-pointer"
                        onMouseEnter={() => onMouseEnter(moduloNumber)}
                        onMouseLeave={() => onMouseLeave(moduloNumber)}
                    >
                        {/*<MyLink href="/">*/}                        
                        {(moduloDB!=9&&buttonActiveHovering === moduloNumber) ? (
                            <img src={plussign} width={44} height={47} alt="agregar" onClick={() => handleModulo(moduloDB)} />
                        ) : (
                            <img src={imageName} width={44} height={47} alt={nameModulo} />
                        )}
                        {/*</MyLink>*/}
                    </span>
                    {/*<LogoModule handleOpenp={setOpenp}></LogoModule>*/}

                </div>
                <div className='text-left pl-2 text-sm'>
                    {preguntas != null && preguntas.map((pregunta) => {
                        pregIdOld = 0;
                        return <>
                            {
                                pregunta.modu_id == moduloDB && <>{
                                    respuestas.map((respuesta) => {
                                        if (respuesta.modu_nume == moduloDB && respuesta.preg_id == pregunta.usr_preg_id) {
                                            pregIdOld = pregIdOld + 1;
                                            return (
                                                <>{pregIdOld === 1 ? <span key={nanoid()}>{pregunta.usr_preg_text}</span> : ''}
                                                    <div key={respuesta.resp_id} className={`pt-1 py-1 ${bgcolor}`}>
                                                        <div className='flex justify-between '>
                                                            <h3 className='hover:text-red-700 cursor-pointer focus:ring-blue-500 text-bluenavish' onClick={() => handleEdit(respuesta.resp_id, moduloDB)}>{respuesta.resp_text}</h3>
                                                            {!downlImage && <div className='bg-transparent flex text-xs items-center gap-2'>
                                                            <button name="botonedit" className="hover:text-naranja-dark" onClick={() => handleEdit(respuesta.resp_id, moduloDB)}>
                                                                <EditIcon></EditIcon>
                                                                </button>
                                                                <button name="botondel" className='flex' onClick={() => {
                                                                    return handleDelete(respuesta.resp_id)
                                                                }}><EraseEntry color="redish"></EraseEntry>&nbsp;</button>&nbsp;&nbsp;
                                                                {/*
                                                    <button className='flex' onClick={() => handleEdit(respuesta.resp_id,moduloDB)}>
                                                    <EditEntry color="blue"></EditEntry></button> */}
                                                            </div>}
                                                        </div>
                                                        <div className='flex'>
                                                            <p>{respuesta.resp_desc}</p>
                                                        </div>
                                                    </div>
                                                </>)
                                        }
                                    })
                                }</>
                            }</>
                    }
                    )}
                </div>
                {respuestasCostos!=null&&
                <div className='text-left pl-2 text-sm'>
                    {(respuestasCostos.length>0&&costos != null)&& costos.map((pregunta) => {
                        //console.log(pregunta);
                        pregIdOld = 0;
                        costoTotal=0;
                        return <div className='flex justify-center'><table key={nanoid()} className='w-4/5'>
                            <thead className="">
                                <tr>
                                    <th className="p-1 text-sm font-semibold tracking-wide text-left">Actividad</th>
                                    <th className="p-1 text-sm font-semibold tracking-wide text-left">Monto</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100'>

                                {
                                    pregunta.modu_id == moduloDB && <>{
                                        respuestasCostos.map((respuesta) => {
                                            if (respuesta.modu_nume == moduloDB && respuesta.cost_id == pregunta.cost_id) {
                                                pregIdOld = pregIdOld + 1;
                                                return (<>
                                                    <tr key={respuesta.resp_cost_id}
                                                        className={`hover:text-red-700 cursor-pointer focus:ring-blue-500 text-bluenavish ${bgcolor}`}
                                                    >
                                                        <td className='pl-3 py-1 text-sm whitespace-pre-wrap' onClick={() => handleEdit(respuesta.resp_cost_id, moduloDB, true)}>{respuesta.resp_cost_acti}</td>
                                                        <td className='pl-3 py-1 text-sm whitespace-nowrap' onClick={() => handleEdit(respuesta.resp_cost_id, moduloDB, true)}>{respuesta.resp_cost_monto} {coin} <span className='hidden'>{costoTotal+=respuesta.resp_cost_monto}</span></td>
                                                        <td>
                                                        <div className='flex justify-between '>
                                                            {!downlImage && <div className='bg-transparent flex text-xs items-center gap-2'>
                                                                <button name="botonedit" className="hover:text-naranja-dark" onClick={() => handleEdit(respuesta.resp_cost_id, moduloDB, true)}>
                                                                <EditIcon></EditIcon>
                                                                </button>
                                                                <button name="botondel" className='flex' onClick={() => {
                                                                    return handleDelete(respuesta.resp_cost_id,true)
                                                                }}><EraseEntry color="redish"></EraseEntry>&nbsp;</button>&nbsp;&nbsp;
                                                                {/*
                                                    <button className='flex' onClick={() => handleEdit(respuesta.resp_id,moduloDB)}>
                                                    <EditEntry color="blue"></EditEntry></button> */}
                                                            </div>}
                                                        </div></td>
                                                        {/* <div className='flex'>
                                                            <p>{respuesta.resp_desc}</p>
                                                        </div> */}
                                                    </tr></>)
                                            }
                                        })
                                    }</>
                                }<tr className={`text-bluenavish`}><td className="p-3 text-sm whitespace-pre-wrap">Total: </td><td className="p-3 text-sm whitespace-pre-wrap">{costoTotal} {coin}</td></tr></tbody></table></div>
                    }
                    )}
                </div>}

            </div>
        </>


    );
}

export default ModuleBox;
