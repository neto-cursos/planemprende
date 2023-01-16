import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import LogoModule from './LogoModule.jsx/LogoModule';
import ModalCreateEntry from "./Modal/ModalCreateEntry";
import channel from './../../assets/images/channels.svg';
import cost_structure from './../../assets/images/cost_structure.svg';
import customer_relationships from './../../assets/images/customer_relationships.svg';
import customer_segments from './../../assets/images/customer_segments.svg';
import key_activities from './../../assets/images/key_activities.svg';
import key_partners from './../../assets/images/key_partners.svg';
import key_resources from './../../assets/images/key_resources.svg';
import revenue_streams from './../../assets/images/revenue_streams.svg';
import value_propositions from './../../assets/images/value_propositions.svg';
import DownloadIcon from '@mui/icons-material/Download';
import { useDispatch, useSelector } from 'react-redux';
import { agregarRespuesta, deleteRespuesta, resetRespuesta, resetStateResp } from './../../redux/reducers/respuestaSlice';
import ModuleBox from './ModuleBox/ModuleBox';
import { useParams, useNavigate } from 'react-router-dom';
import { listRespuestas, updateRespuestas } from './../../redux/actions/respuesta2Actions';
import { createCanvas, getCanvas } from './../../redux/actions/CanvaActions';
import { setEmpr_id, resetEstado } from './../../redux/reducers/canvasSlice';
import { listPreguntas } from './../../redux/actions/preguntaActions';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import * as htmlToImage from 'html-to-image';
import Notifications from '../Notifications';
import { msgCanvasNotif } from '../../constants/canvasNotifications';
import { reset as resetRespAsist } from './../../redux/reducers/respuestaAsistSlice';
import { asignFunctionName } from '../../redux/reducers/menuSlice';
/**function to adapt to screen size */
function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}
const Canvas = ({ }) => {
    //funcion name of the menu for mobile
    const { funcName } = useSelector(state => state.menus);
    //useState for managin window size
    const [windowSize, setWindowSize] = React.useState(getWindowSize());
    //useEffect for managing resizing window
    React.useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    const currentCanvas = useRef(null);
    const { empr_id } = useParams();
    /**
     * Selectors
     */
    const dispatch = useDispatch();
    const canvasSelect = useSelector(state => state.canvas);
    const { stateResp } = useSelector(state => state.respuestas);
    const respuestas = useSelector(state => state.respuestas.respuestas);
    const preguntas = useSelector(state => state.preguntas);
    const respuestasAsist = useSelector(state => state.respuestasAsistidas);
    //show notification when success of failing
    const [showNotif, setShowNotif] = useState(false);
    //useRef for image
    const domEl = useRef(null);
    //usestate for DownloadImage
    const [downlImage, setDownlImage] = useState(false);
    //function for download Image
    const convertToImg = () => {
        // console.log("convert to img")
        setDownlImage(true);
    }
    //useEffect for download Image
    useEffect(() => {
        if (downlImage === true)
            downloadImage();
    }, [downlImage])
    //function for download Image
    const downloadImage = async () => {
        const copyCanvas = domEl.current.cloneNode(true);
        const dataUrl = await htmlToImage.toPng(domEl.current);
        // download image
        const link = document.createElement('a');
        link.download = "MiModeloDeNegocios.png";
        link.href = dataUrl;
        link.click();
        setDownlImage(false);
    }
    //when using back button key in the browser
    window.onpopstate = () => {
        //navigate("/");
        dispatch(resetEstado());
    }
    /**
     * estados para controlar modals y hoverings
     */
    const [buttonActiveHovering, setButtonActiveHovering] = useState(0);
    const [numeModulo, setNumeModulo] = useState(0);
    const [openp, setOpenp] = useState(false);
    const [readySelect, setReadySelect] = useState(false);
    const onMouseEnter = (id) => {
        setButtonActiveHovering(id);
    }
    const onMouseLeave = (id) => {
        setButtonActiveHovering(0);
    }
    /**
     * Handle respuesta
     */
    const [idRespuesta, setIdRespuesta] = useState(0);
    const [sendAction, setSendAction] = useState(false);

    const handleModulo = (number) => {
        setOpenp(true);
        setNumeModulo(number);
    }
    const handleEdit = (id, moduloDB) => {
        setIdRespuesta(id);
        setNumeModulo(moduloDB);
        setOpenp(true);
    }
    const handleDelete = (id) => {
        // console.log(id);
        dispatch(deleteRespuesta(id));
    }
    const updateTable = () => {
        //is not necessary to JSON.stringify since Axios takes charge of that
        if (canvasSelect.idState === 'new') {
            dispatch(createCanvas(canvasSelect.datos));
        }
        setSendAction(true);
    }
    /**
     * use effects */
    useLayoutEffect(() => {
        if (sessionStorage.getItem('current_canvas')) {
            currentCanvas.current = JSON.parse(sessionStorage.getItem('current_canvas'));
            // if(currentCanvas.empr_id!=empr_id){
            //     dispatch(resetEstado());    
            // }
        }
        dispatch(resetEstado());
    }, [])
    /**Menu Funcion*/
    useEffect(() => {
        if (funcName !== '') {
            switch(funcName){
                case 'convertToImg':convertToImg();break;
                case 'updateTable':updateTable();break;
                default:break;
            }
            // if (funcName == 'convertToImg')
            //     convertToImg();

            //console.log(funcName)
            // const fn = new Function(funcName+'()');
            // fn();
            // funcName();
            dispatch(asignFunctionName(''));
        }

    }, [funcName]);

    useEffect(() => {
        if (canvasSelect.estado === 'ready') {
            dispatch(getCanvas({ empr_id: empr_id }));
            //change idState to new or db y estado to loaded
        }
        if (canvasSelect.estado === 'loading') {
            if (currentCanvas.current != null)
                if (currentCanvas.current.empr_id != empr_id)
                    dispatch(resetRespuesta());
            dispatch(setEmpr_id(empr_id));//this put estado in ready
            if (preguntas.loaded === false)
                dispatch(listPreguntas());
        }
    }, [canvasSelect.estado])

    useEffect(() => {
        //dispatch(resetRespuesta());
        if (canvasSelect.estado === 'loadedCanvasID' && canvasSelect.idState === 'db' && canvasSelect.datos.empr_id == empr_id) {
            dispatch(listRespuestas({ canv_id: canvasSelect.datos.canv_id }))
            if (respuestasAsist.respAsist.length > 0 && respuestasAsist.empr_id == empr_id) {
                dispatch(agregarRespuesta(respuestasAsist.respAsist));
            }
            // dispatch(resetRespAsist())
        }
        if (canvasSelect.idState === 'new') {
            dispatch(createCanvas(canvasSelect.datos));
        }
        // console.log("respuestas::::::")
        // console.log(respuestas.length)
        if (canvasSelect.idState === 'alreadyLoaded' && respuestas.length === 0) {
            // console.log("entro wey")
            dispatch(listRespuestas({ canv_id: canvasSelect.datos.canv_id }))
        }
    }, [canvasSelect.estado, canvasSelect.idState])

    useEffect(() => {
        if ((canvasSelect.idState === 'db' || canvasSelect.idState === 'alreadyLoaded') && sendAction === true) {
            if (respuestas.length === 0) {
                console.log("entro a actualizar canvas vacio")
                dispatch(updateRespuestas([{
                    canv_id: canvasSelect.datos.canv_id,
                    resp_id: '',
                }]))
            } else
                dispatch(updateRespuestas((respuestas)));
        }
    }, [canvasSelect.idState, sendAction]);

    useEffect(() => {
        if (stateResp === 'loaded') {
            setShowNotif(true);
            dispatch(resetRespuesta());
            dispatch(listRespuestas({ canv_id: canvasSelect.datos.canv_id }));
            return setSendAction(false);
        }
    }, [stateResp]);

    return (
        canvasSelect.datos.canv_id !== "" && preguntas.preguntas.length > 0 && <>
            {showNotif && <Notifications msgNotif={msgCanvasNotif[0]} showNotif={showNotif} setShowNotif={setShowNotif} severity="info" />}
            {downlImage === true ?
                <div id="micanvas" ref={domEl} className="w-[1280px]  grid gap-1
        grid-cols-5 ">
                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={1} moduloDB={8}
                        imageName={key_partners} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG1 text-canvas1Txt row-span-2 "}
                        nameModulo={'Asociaciones Claves'}
                        bgcolor={"bg-canvasBG1dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas}
                        downlImage={downlImage}
                    />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={2} moduloDB={7}
                        imageName={key_activities} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG2 text-canvas2Txt"}
                        nameModulo={"Actividades Claves"}
                        bgcolor={"bg-canvasBG2dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas}
                        downlImage={downlImage}
                    />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={3} moduloDB={2}
                        imageName={value_propositions} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG3 text-canvas3Txt row-span-2"}
                        nameModulo={"Propuesta de valor"}
                        bgcolor={"bg-canvasBG3dark  rounded pl-2 pr-1"} preguntas={preguntas.preguntas}
                        downlImage={downlImage}
                    />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={4} moduloDB={4}
                        imageName={customer_relationships} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG4 text-canvas4Txt"}
                        nameModulo={"Relación con los clientes"}
                        bgcolor={"bg-canvasBG4dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas}
                        downlImage={downlImage}
                    />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={5} moduloDB={1}
                        imageName={customer_segments} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG5 text-canvas5Txt row-span-2"} nameModulo={"Segmento De Mercado"}
                        bgcolor={"bg-canvasBG5dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas}
                        downlImage={downlImage}
                    />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={6} moduloDB={6}
                        imageName={key_resources} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG6 text-canvas6Txt "} nameModulo={"Recursos Claves"}
                        bgcolor={"bg-canvasBG6dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas}
                        downlImage={downlImage}
                    />


                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={7} moduloDB={3}
                        imageName={channel} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG7 text-canvas7Txt"} nameModulo={"Canales"}
                        bgcolor={"bg-canvasBG7dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas}
                        downlImage={downlImage}
                    />


                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={8} moduloDB={9}
                        imageName={cost_structure} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG8 text-canvas8Txt col-span-3"}
                        nameModulo={"Estructura de costos"}
                        bgcolor={"bg-canvasBG8dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas}
                        downlImage={downlImage}
                    />
                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={9} moduloDB={5}
                        imageName={revenue_streams} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG9 text-canvas9Txt col-span-2"} nameModulo={"Fuente de ingresos"}
                        bgcolor={"bg-canvasBG9dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas}
                        downlImage={downlImage}
                    />


                    <ModalCreateEntry
                        message="Hello Portal World!"
                        isOpen={openp}
                        onClose={() => { setOpenp(false); setReadySelect(false); setIdRespuesta(0) }}
                        modulo={numeModulo}
                        idRespuesta={idRespuesta}
                        idCanvas={canvasSelect.datos.canv_id}
                        setIdRespuesta={() => setIdRespuesta(0)}
                        preguntas={preguntas.preguntas}
                        readySelect={readySelect}
                        setReadySelect={setReadySelect}
                    />

                </div> :
                <div id="micanvas" ref={domEl} className="grid grid-cols-1 gap-1 md:grid-cols-2 
        lg:grid-cols-5  md:gap-1 lg:gap-1 pr-2
        sm:grid-cols-1">
                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={1} moduloDB={8}
                        imageName={key_partners} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG1 text-canvas1Txt row-span-1 md:row-span-2 "}
                        nameModulo={'Asociaciones Claves'}
                        bgcolor={"bg-canvasBG1dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas}
                    />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={2} moduloDB={7}
                        imageName={key_activities} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG2 text-canvas2Txt"}
                        nameModulo={"Actividades Claves"}
                        bgcolor={"bg-canvasBG2dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={3} moduloDB={2}
                        imageName={value_propositions} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG3 text-canvas3Txt row-span-1 md:row-span-2"}
                        nameModulo={"Propuesta de valor"}
                        bgcolor={"bg-canvasBG3dark  rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={4} moduloDB={4}
                        imageName={customer_relationships} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG4 text-canvas4Txt"}
                        nameModulo={"Relación con los clientes"}
                        bgcolor={"bg-canvasBG4dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={5} moduloDB={1}
                        imageName={customer_segments} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG5 text-canvas5Txt row-span-1 md:row-span-2"} nameModulo={"Segmento De Mercado"}
                        bgcolor={"bg-canvasBG5dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={6} moduloDB={6}
                        imageName={key_resources} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG6 text-canvas6Txt "} nameModulo={"Recursos Claves"}
                        bgcolor={"bg-canvasBG6dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />


                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={7} moduloDB={3}
                        imageName={channel} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG7 text-canvas7Txt"} nameModulo={"Canales"}
                        bgcolor={"bg-canvasBG7dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />


                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={8} moduloDB={9}
                        imageName={cost_structure} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG8 text-canvas8Txt col-span-1 md:col-span-3"}
                        nameModulo={"Estructura de costos"}
                        bgcolor={"bg-canvasBG8dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />
                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={9} moduloDB={5}
                        imageName={revenue_streams} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG9 text-canvas9Txt col-span-1 md:col-span-2"} nameModulo={"Fuente de ingresos"}
                        bgcolor={"bg-canvasBG9dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />

                    <span className='text-xs p-0 m-0 absolute bottom-0 right-3 italic'>Alexander Osterwalder</span>
                    <ModalCreateEntry
                        message="Hello Portal World!"
                        isOpen={openp}
                        onClose={() => { setOpenp(false); setReadySelect(false); setIdRespuesta(0) }}
                        modulo={numeModulo}
                        idRespuesta={idRespuesta}
                        idCanvas={canvasSelect.datos.canv_id}
                        setIdRespuesta={() => setIdRespuesta(0)}
                        preguntas={preguntas.preguntas}
                        readySelect={readySelect}
                        setReadySelect={setReadySelect}
                    />
                </div>}


            {windowSize.innerWidth > 640 ?
                <div className='text-center absolute right-5 top-10 z-10 text-lg text-canvas4Txt'>
                    <Fab color="secondary" variant="extended" aria-label="Actualizar Canvas" onClick={() => updateTable()}>
                        <AddIcon> </AddIcon> <span className="text-xs">Actualizar Canvas</span>
                    </Fab>
                    <Fab color="primary" variant="extended" aria-label="descargar Imagen" onClick={() => convertToImg()}>
                        <DownloadIcon> </DownloadIcon>
                    </Fab>
                </div> :
                <div className='text-center fixed left-4 top-[120px] z-10 text-lg text-canvas4Txt'>
                    <Fab color="secondary" variant="extended" aria-label="Actualizar Canvas" onClick={() => updateTable()}>
                        <AddIcon sx={{ fontSize: 20 }}> </AddIcon>
                    </Fab><br />
                    <Fab color="primary" variant="extended" aria-label="descargar Imagen" onClick={() => convertToImg()}>
                        <DownloadIcon sx={{ fontSize: 20 }}> </DownloadIcon>
                    </Fab>

                </div>


            }
            {/* <button onClick={() => updateTable()}>
            Actualizar Canvas
        </button> */}



        </>

    );
}

export default Canvas;
