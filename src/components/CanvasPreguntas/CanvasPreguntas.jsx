import React, { useEffect, useLayoutEffect, useRef, createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import AddEntry from './../../assets/icons/addEntry';
import EditEntry from './../../assets/icons/editEntry';
import EraseEntry from './../../assets/icons/eraseEntry';
import { getPreguntas } from './../../redux/actions/preguntaActions';
import { addRespuesta, addRespuestaBatch, resetRespuestaAsistida, deleteRespuesta, respAsistChgEmprId, changeResp2Send, reset }
    from './../../redux/reducers/respuestaAsistSlice';
import { agregarRespuesta } from './../../redux/reducers/respuestaSlice';
// import { nanoid } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { getSugerencias } from './../../redux/actions/sugerenciaActions';
import { modulosConDesc } from './../../constants/modulos'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Divider from '@mui/material/Divider';
import { accordionSummaryClasses } from '@mui/material';
import ToolTip from '../ToolTip/ToolTip';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ToolTipBasic from '../ToolTip/ToolTipBasic';
import VideoModal from '../VideoPlayer/VideoModal';
import { Modal } from '@mui/material';
import { asignFunctionName } from '../../redux/reducers/menuSlice';
import { listUsersPregs } from '../../redux/actions/userPreguntaActions';

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}
const ModelCanvasPreguntas = () => {

    const [windowSize, setWindowSize] = React.useState(getWindowSize());
    React.useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    //funcion name of the menu for mobile
    const { funcName } = useSelector(state => state.menus);

    const videoDatos = useRef('');

    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
        setIsOpen(false);
    }
    const [yt, setYt] = useState(false);
    const [showButton, setShowButton] = useState(0);

    const theme = useTheme();

    const { empr_id, user_id, modu_nume, bmc_type = '' } = useParams();
    //multiple useRefs
    const [count, setCount] = useState(0);
    const inputRespRefs = useRef([]);
    const respuestasRefs = useRef([]);
    const [refreshInputs, setRefreshInputs] = useState(false);
    /**userPregs */
    const userPregs = useSelector(state => state.usersPregs);
    useLayoutEffect(() => {
        console.log("userPregs:" + userPregs.usrPregs.length);
        if (userPregs.usrPregs.length == 0) {
            dispatch(listUsersPregs({ empr_id: empr_id }));
        }
        if (userPregs.usrPregs.length > 0) {

            setCount(userPregs.usrPregs.filter((p) => (p.modu_id == modu_nume))?.length);

        }
    }, [userPregs.usrPregs]);
    /**End userPregs */
    useEffect(() => {
        console.log("count: " + count);
    }, [count])
    // console.log("modu_nume:", modu_nume);
    const modu_nomb2 = modulosConDesc.find((nodo => nodo.modu_id == modu_nume));

    let contador=0;
    const [txtActive, setTxtActive] = useState(-1);
    //const preguntas = useSelector(state => state.preguntas);
    const preguntas = useSelector(state => state.usersPregs);
    const { estado } = useSelector(state => state.respuestasAsistidas);
    const respuestas = useSelector(state => state.respuestasAsistidas.respAsist);
    const respuestasEstado = useSelector(state => state.respuestasAsistidas.estado);
    const canvasSelect = useSelector(state => state.canvas);
    const sugerencias = useSelector(state => state.sugerencias);
    const respuestasOriginales = useSelector(state => state.respuestas.respuestas);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (funcName !== '') {
            switch (funcName) {
                case 'saveAnswers': saveAnswers(); break;
                default: break;
            }
            dispatch(asignFunctionName(''));
        }
    }, [funcName]);

    useEffect(() => {
        inputRespRefs.current = Array(count).fill().map((_, i) => inputRespRefs.current[i] || createRef());
        setRefreshInputs(true);
        respuestasRefs.current = Array(count).fill().map((_, i) => ({
            resp_id: '',
            preg_id: '',
            modu_nume: '',
            canv_id: canvasSelect.datos.canv_id,
            resp_nume: '',
            resp_text: '',
            resp_desc: '',
            resp_esta: ''
        }));
    }, [count]);

    const [formInput, setFormInput] = useState({
        resp_id: '',
        preg_id: '',
        modu_nume: '',
        canv_id: canvasSelect.datos.canv_id,
        resp_nume: '',
        resp_text: '',
        resp_desc: '',
        resp_esta: ''
    });
    const [isReady, setIsReady] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const updateFormInput = (suge, preguntaid, index) => {
        console.log(inputRespRefs.current[index].current.value);
        inputRespRefs.current[index].current.value += suge;
    }

    const comparePregsId = (p_id) => {
        console.log(p_id);
        const pregunta = userPregs.usrPregs.find(preg => preg.usr_repl_preg_id == p_id)
        console.log(pregunta);
        if (pregunta != null)
            return pregunta.usr_preg_id;
        else
            return p_id;
    };

    const addResponse = (p_id, index, inputRef) => {
        console.log("index: "+index);
        console.log(inputRef);
        const currentValue=inputRespRefs.current[index].current.value;
        setFormInput(prevState => ({ ...prevState, resp_id: nanoid(), preg_id: p_id, modu_nume: modu_nume, resp_text: currentValue }));
        inputRespRefs.current[index].current.value='';
        //setIsReady(true);
        setTxtActive(index);
    }

    useEffect(() => {
        //if (isReady === true)
        if (txtActive > -1) {
            dispatch(addRespuesta(formInput));
            return setTxtActive(-1);
        }
    }, [txtActive]);

    useEffect(() => {


    }, [formInput]);


    useEffect(() => {
        console.log("resetRespAsist");
        dispatch(respAsistChgEmprId(empr_id));
        dispatch(resetRespuestaAsistida());
        if (preguntas.loaded === false && preguntas.byModule === false || (preguntas.actualModule != modu_nume)) {
            dispatch(getPreguntas({ modu_nume: modu_nume }))
        }
        dispatch(getSugerencias({ modu_nume: modu_nume }));
    }, []);

    const handleEdit = () => {
        return null;
    };

    const handleDelete = (id) => {
        dispatch(deleteRespuesta(id))
    };

    const checkB4Save = () => {

        let emptyInput = true;
        inputRespRefs.current.map((refInput) => {
            // console.log(refInput.current.getAttribute("preg_id"));
            if (refInput.current.value != '') {
                emptyInput = false;
            }
        })
        console.log(emptyInput);
        if (!emptyInput) {
            let formInputAux = [];
            inputRespRefs.current.map((refInput, index) => {
                if (refInput.current.value != '') {
                    formInputAux.push({ resp_id: nanoid(), preg_id: refInput.current.getAttribute("preg_id"), modu_nume: modu_nume, canv_id: canvasSelect.datos.canv_id, resp_text: refInput.current.value });
                }
            });
            console.log(formInputAux)
            dispatch(addRespuestaBatch(formInputAux));
        }
        else
            saveAnswers();
    }

    useEffect(() => {
        if (respuestasEstado == 'ready')
            saveAnswers();
    }, [respuestasEstado])


    const saveAnswers = () => {
        const respAux = respuestas.map((r) => {
            return { ...r, preg_id: comparePregsId(r.preg_id) };
        });
        console.log(respAux);
        dispatch(changeResp2Send(respAux));
        dispatch(agregarRespuesta(respAux));
        dispatch(reset());
        setRedirect(true);
    };

    const navigate = useNavigate();
    const handleFocus = (event) => {
        const index = event.target.dataset.index;
        console.log(index)
        inputRespRefs.current[index].current.focus();
        // console.log(inputRespRefs.current[index].current)
        console.log(event);
    }
    const handleBlur = (event) => {
        const index = event.target.dataset.index;
        console.log()
        // inputRespRefs.current[index].current.focus();
        // console.log(inputRespRefs.current[index].current)
        console.log(event);
    }
    const contadorInc=()=>{contador=contador+1}
    useEffect(() => {
        if (redirect === true)
            navigate(`/emprendimiento/${empr_id}/bmc`);
    }, [redirect])

    return (
        <>
            <section className="grid gap-1 grid-cols-2 md:grid-cols-2">
                <div className="py-3 pr-3 pl-10 col-span-2 md:col-span-2 bg-whitish rounded-md">
                    <h3 className='text-center text-2xl font-bold'>
                        Módulo {modu_nume}: {modu_nomb2.modulo}
                    </h3>
                    <h3 className="p-2 font-thin">{modu_nomb2.desc}</h3>

                    {inputRespRefs.current.length > 0 && preguntas.usrPregs.map((pregunta, index) => {
                        console.log(index);
                        return pregunta.modu_id == modu_nume && <>
                            <div className=''>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    {pregunta.usr_preg_text}
                                </label>
                            </div>
                            {respuestas.length > 0 && respuestas.map((resp) => {

                                return pregunta.usr_preg_id == resp.preg_id && (
                                    <div className="flex flex-row text-left" key={resp.resp_id}>
                                        <div className='w-11/12'>
                                            <div className="flex items-center border-b border-teal-500 py-2">
                                                <input value={resp.resp_text} key={nanoid()} className="italic appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="su respuesta" aria-label="Respuesta" disabled={true} required />
                                            </div>
                                        </div>
                                        <div className='w-1/12 text-right flex items-end justify-end'>
                                            <button className="flex" type="button" onClick={() => {
                                                return handleDelete(resp.resp_id)
                                            }}>
                                                <EraseEntry></EraseEntry></button>&nbsp;&nbsp;&nbsp;
                                            {/*<button className='flex' onClick={() => handleEdit('respuesta.id, moduloDB')}>
                                                <EditEntry color="blue"></EditEntry></button>*/}
                                        </div>
                                    </div>
                                )
                            })}
                            
                            <div className="">
                                <div className='col-span-2 row-span-2'>
                                    <div className="flex items-center border-b border-teal-500 py-2">
                                        <textarea id="respuesta" key={`key${index}`} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" data-index={contador} placeholder="su respuesta" aria-label="Respuesta" name="resp_text" ref={inputRespRefs.current[contador]} preg_id={pregunta.usr_preg_id} tabIndex={`${index +1}`} onFocus={handleFocus} onBlur={handleBlur}/>
                                        <button className="flex bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-1 text-white rounded" type="button" onClick={() => addResponse(pregunta.usr_preg_id, contador,inputRespRefs.current[contador])}>
                                            <AddEntry></AddEntry>
                                        </button>
                                    </div>
                                </div>
                                {contadorInc()}
                                {sugerencias.map((suge) => {
                                    return <>
                                        {(suge.preg_id == pregunta.usr_repl_preg_id && suge.suge_tipo == 'Ejemplo' && (<>
                                            <button className="h-4 text-[0.5rem] bg-blue-500 hover:bg-blue-700 text-white mx-[0.1rem] my-0 py-0 px-0 rounded" key={suge.suge_id} onClick={() => updateFormInput(suge.suge_text, suge.preg_id, index)}>
                                                {suge.suge_text}
                                            </button>
                                        </>))}
                                    </>
                                })}
                                {sugerencias.map((suge) => {
                                    return <>

                                        {(suge.preg_id == pregunta.usr_repl_preg_id && suge.suge_tipo == 'Video' && (<>
                                            <ToolTipBasic tooltip={suge.suge_text}>
                                                {/* <Link to={`/videoplayer/${suge.suge_id}`}> */}
                                                <button className="key={suge.suge_id} text-white p-0 m-0 bg-rojo-dark rounded" onClick={() => { videoDatos.current = suge.suge_link; setIsOpen(true) }}>
                                                    <YouTubeIcon></YouTubeIcon>
                                                </button>
                                                {/* </Link> */}
                                            </ToolTipBasic>
                                        </>
                                        ))}
                                    </>
                                })}
                            </div>
                        </>
                    })}



                </div>

                <div className="col-span-6 text-center">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-12 rounded" onClick={() => checkB4Save()}>GUARDAR</button>
                </div>
                <p className="mb-8"></p>
            </section>
            {/* {playVideo.play === true && playVideo.id !== null && <ModalVideos playVideo={playVideo} setPlayVideo={setPlayVideo}></ModalVideos>}
            <PreguntasBmc user_id={user_id} modu_nume={modu_nume} bmc_type={bmc_type}></PreguntasBmc> */}


            <Modal
                open={isOpen}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >

                <div className='pl-16 pt-32 md:pl-32 lg:pl-64 md:pt-16 text-center'>
                    <div className='text-whitish pl-32 text-2xl cursor-pointer' onClick={handleClose}>X</div>
                    <iframe
                        id="video"
                        width={windowSize.innerWidth > 640 ? "640" : "230"}
                        height={windowSize.innerWidth > 640 ? "480" : "154"}
                        src={"https://www.youtube.com/embed/" + videoDatos.current}
                        frameBorder="0"
                        allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="pl-2"
                    />

                </div>



            </Modal>



        </>
    );
}

export default ModelCanvasPreguntas;
