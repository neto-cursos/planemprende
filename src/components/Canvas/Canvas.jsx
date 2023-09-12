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
import { listPreguntas } from './../../redux/actions/preguntaActions';
import { agregarRespuesta, deleteRespuesta, resetRespuesta, resetStateResp } from './../../redux/reducers/respuestaSlice';
import { listRespuestas, updateRespuestas } from './../../redux/actions/respuesta2Actions';
import { listCostos } from './../../redux/actions/CostoActions';
import { agregarRespCosto, deleteRespCosto, resetRespCosto, resetStateRespCosto } from './../../redux/reducers/respuestaCostoSlice';
import { listRespCostos, updateRespCostos } from './../../redux/actions/respuestaCostoActions';
import ModuleBox from './ModuleBox/ModuleBox';
import { useParams, useLocation, useNavigate} from 'react-router-dom';
import { createCanvas, getCanvas } from './../../redux/actions/CanvaActions';
import { setEmpr_id, resetEstado } from './../../redux/reducers/canvasSlice';
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
import { resetUsersPreg } from '../../redux/reducers/userPreguntaSlice';
import { checkInitUsersPregs, initUsersPregs, listUsersPregs } from '../../redux/actions/userPreguntaActions';
import CheckLeaving from './CheckLeaving';
import Printing from '../Printing/Printing';
import "./Canvas.css";
import PrintIcon from '@mui/icons-material/Print';
import CtrlTime from '../CtrlTime/CtrlTime';
import SaveIcon from '@mui/icons-material/Save';
/**function to adapt to screen size */
function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}
const Canvas = ({ coin }) => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Perform actions when route changes
        console.log('Navigated to:', location.pathname);
        // You can put your checkout logic or any other action here
        //navigate(location.pathname);
      }, [location]);
  
    const [browserUnsup, setBrowserUnsup] = React.useState(false)
    // if (isPageDirectiveSupported)
    //     setBrowserUnsup(true);
    const detectChange = useRef(false);
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
    //const preguntas = useSelector(state => state.preguntas);
    const userPregs = useSelector(state => state.usersPregs);
    const respuestasAsist = useSelector(state => state.respuestasAsistidas);
    /**Loading data from costos and respcostos*/
    const { stateRespCosto } = useSelector(state => state.respuestasCostos);
    const respuestasCostos = useSelector(state => state.respuestasCostos.respCostos);
    const costos = useSelector(state => state.costos);

    /**end loading data from costos and respcostos */
    //show notification when success of failing
    const [showNotif, setShowNotif] = useState(false);
    //useRef for image
    const domEl = useRef(null);
    //usestate for DownloadImage
    const [downlImage, setDownlImage] = useState(false);
    const printImage = useRef(false);
    //function for download Image
    const convertToImg = () => {
        // console.log("convert to img")
        setDownlImage(true);
    }
    const printingImage = () => {
        printImage.current = true;
        if (downlImage === false && printImage.current === true)
            setDownlImage(true);
        console.log("entro printiing image");
    };

    //useEffect for download Image
    useEffect(() => {
        console.log("donlwimage_" + downlImage);
        console.log("printImage_" + printImage.current);
        if (downlImage === true && printImage.current === false)
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
    /** check if leaving the page*/
    const [dirty, setDirty] = useState(false)

    /** end check if leaving the page*/
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
    /*** Handle respuesta */
    const [idRespuesta, setIdRespuesta] = useState(0);
    /*** Handle Costo */
    const [idRespuestaCosto, setIdRespuestaCosto] = useState(0);
    const [sendAction, setSendAction] = useState(false);

    const handleModulo = (number) => {
        setOpenp(true);
        setNumeModulo(number);
    }
    const handleEdit = (id, moduloDB, costo = false) => {
        setNumeModulo(moduloDB);
        if (moduloDB === 9 && costo === true) { setIdRespuestaCosto(id) }
        else { setIdRespuesta(id); }
        setOpenp(true);
    }
    const handleDelete = (id, costo = false) => {
        // console.log(id);
        if (costo === true) {
            dispatch(deleteRespCosto(id));
        }
        else {
            dispatch(deleteRespuesta(id))
            const resp1 = respuestas.find(r => (r.resp_id == id));
            if (resp1 != null)
                if (respuestasCostos.find(r => (r.resp_id_ref == resp1.resp_id_ref))) {

                    dispatch(deleteRespCosto(respuestasCostos.find(r => (r.resp_id_ref == resp1.resp_id_ref)).resp_cost_id));
                }
        }
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
        dispatch(resetUsersPreg());
    }, [])
    /**Menu Funcion*/

    useEffect(() => {
        if (funcName !== '') {
            switch (funcName) {
                case 'convertToImg': convertToImg(); break;
                case 'updateTable': updateTable(); break;
                default: break;
            }
            dispatch(asignFunctionName(''));
        }
    }, [funcName]);

    /**checkInitPregs */
    useEffect(() => {
        dispatch(checkInitUsersPregs({ empr_id: empr_id }));
    }, []); //check if userpregs exists if yes change state to "copied" otherwise is "notinitiated"
    /**end checkInitPregs */

    useEffect(() => {
        if (userPregs.estado === 'notinitiated') {
            dispatch(initUsersPregs({ empr_id: empr_id }));
        } else if (userPregs.estado === 'copied') {
            dispatch(listUsersPregs({ empr_id: empr_id }));
        }
    }, [userPregs.estado]);

    useEffect(() => {
        if (canvasSelect.estado === 'ready') {
            dispatch(getCanvas({ empr_id: empr_id }));
            //change idState to new or db y estado to loaded
        }
        if (canvasSelect.estado === 'loading') {
            if (currentCanvas.current != null)
                if (currentCanvas.current.empr_id != empr_id) {
                    dispatch(resetRespuesta()); dispatch(resetRespCosto());
                    dispatch(resetUsersPreg());
                }
            dispatch(setEmpr_id(empr_id));//this put estado in ready
            // if (preguntas.loaded === false)
            //     dispatch(listPreguntas());
            if (costos.loaded === false)
                dispatch(listCostos());
            // if (userPregs.loaded === false)
            //     dispatch(listUsersPregs({ empr_id: empr_id }));
        }
    }, [canvasSelect.estado]);



    useEffect(() => {
        //dispatch(resetRespuesta());
        if (canvasSelect.estado === 'loadedCanvasID' && canvasSelect.idState === 'db' && canvasSelect.datos.empr_id == empr_id) {
            dispatch(listRespuestas({ canv_id: canvasSelect.datos.canv_id }));
            dispatch(listRespCostos({ canv_id: canvasSelect.datos.canv_id }));
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
            dispatch(listRespuestas({ canv_id: canvasSelect.datos.canv_id }));
            dispatch(listRespCostos({ canv_id: canvasSelect.datos.canv_id }));
        }
    }, [canvasSelect.estado, canvasSelect.idState])

    //PAra actualizar las respuestas y respuestas de costos
    useEffect(() => {
        if ((canvasSelect.idState === 'db' || canvasSelect.idState === 'alreadyLoaded') && sendAction === true) {
            if (respuestas.length === 0) {
                console.log("entro a actualizar canvas vacio")
                dispatch(updateRespuestas([{
                    canv_id: canvasSelect.datos.canv_id,
                    resp_id: '',
                }]))
            } else {
                dispatch(updateRespuestas((respuestas)));
                // dispatch(updateRespCostos((respuestasCostos)));
            }

            if (respuestasCostos.length === 0) {
                console.log("entro a actualizar canvas vacio")
                dispatch(updateRespCostos([{
                    canv_id: canvasSelect.datos.canv_id,
                    resp_cost_id: '',
                }]))
            } else {
                // dispatch(updateRespuestas((respuestas)));
                dispatch(updateRespCostos((respuestasCostos)));
            }

        }
    }, [canvasSelect.idState, sendAction]);

    //Si el estado del reducer de respuestas entra en loaded carga la lista de respuestas al reducer.
    useEffect(() => {
        if (stateResp === 'loaded') {
            setShowNotif(true);
            //dispatch(resetRespuesta());
            //dispatch(resetRespCosto());
            dispatch(listRespuestas({ canv_id: canvasSelect.datos.canv_id }));
            dispatch(listRespCostos({ canv_id: canvasSelect.datos.canv_id }));
            return setSendAction(false);
        }
    }, [stateResp]);
    // canvasSelect.datos.canv_id !== "" && preguntas.preguntas.length > 0 && <>
    return (
        canvasSelect.datos.canv_id !== "" && userPregs.usrPregs.length > 0 && <>
            {/* <CheckLeaving when={dirty} /> */}
            {showNotif && <Notifications msgNotif={msgCanvasNotif[0]} showNotif={showNotif} setShowNotif={setShowNotif} severity="info" />}
            <CtrlTime functionSave={updateTable}></CtrlTime>
            {downlImage === true ?
                <div id={browserUnsup ? "micanvasPrint2" : "micanvasPrint"} ref={domEl} className="w-[1280px]  grid gap-1
        grid-cols-5 ">
                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={1} moduloDB={8}
                        imageName={key_partners} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG1 text-canvas1Txt row-span-2 "}
                        nameModulo={'Asociaciones claves'}
                        bgcolor={"bg-canvasBG1dark rounded pl-2 pr-1"}
                        bgborder={"bg-canvasBG1dark"} 
                        preguntas={userPregs.usrPregs}
                        downlImage={downlImage}
                    />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={2} moduloDB={7}
                        imageName={key_activities} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG2 text-canvas2Txt"}
                        nameModulo={"Actividades claves"}
                        bgcolor={"bg-canvasBG2dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG2dark"}
                        preguntas={userPregs.usrPregs}
                        downlImage={downlImage}
                    />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={3} moduloDB={2}
                        imageName={value_propositions} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG3 text-canvas3Txt row-span-2"}
                        nameModulo={"Propuesta de valor"}
                        bgcolor={"bg-canvasBG3dark  rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG3dark"}
                        preguntas={userPregs.usrPregs}
                        downlImage={downlImage}
                    />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={4} moduloDB={4}
                        imageName={customer_relationships} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG4 text-canvas4Txt"}
                        nameModulo={"Relación con los clientes"}
                        bgcolor={"bg-canvasBG4dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG4dark"}
                        preguntas={userPregs.usrPregs}
                        downlImage={downlImage}
                    />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={5} moduloDB={1}
                        imageName={customer_segments} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG5 text-canvas5Txt row-span-2"} 
                        nameModulo={"Segmento de mercado"}
                        bgcolor={"bg-canvasBG5dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG5dark"}
                        preguntas={userPregs.usrPregs}
                        downlImage={downlImage}
                    />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={6} moduloDB={6}
                        imageName={key_resources} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG6 text-canvas6Txt "} 
                        nameModulo={"Recursos claves"}
                        bgcolor={"bg-canvasBG6dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG6dark"}
                        preguntas={userPregs.usrPregs}
                        downlImage={downlImage}
                    />


                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={7} moduloDB={3}
                        imageName={channel} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG7 text-canvas7Txt"} 
                        nameModulo={"Canales"}
                        bgcolor={"bg-canvasBG7dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG7dark"}
                        preguntas={userPregs.usrPregs}
                        downlImage={downlImage}
                    />
                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={8} moduloDB={9}
                        imageName={cost_structure} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG8 text-canvas8Txt col-span-3"}
                        nameModulo={"Estructura de costos"}
                        bgcolor={"bg-canvasBG8dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG8dark"}
                        preguntas={userPregs.usrPregs}
                        downlImage={downlImage}
                        costos={costos.costos}
                        respuestasCostos={respuestasCostos}
                        coin={coin}
                    />
                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={9} moduloDB={5}
                        imageName={revenue_streams} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG9 text-canvas9Txt col-span-2"} 
                        nameModulo={"Fuente de ingresos"}
                        bgcolor={"bg-canvasBG9dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG9dark"}
                        preguntas={userPregs.usrPregs}
                        downlImage={downlImage}
                    />

                    <ModalCreateEntry
                        message="Hello Portal World!"
                        isOpen={openp}
                        onClose={() => { setOpenp(false); setReadySelect(false); setIdRespuesta(0); setIdRespuestaCosto(0); }}
                        modulo={numeModulo}
                        idRespuesta={idRespuesta}
                        idRespuestaCosto={idRespuestaCosto}
                        idCanvas={canvasSelect.datos.canv_id}
                        setIdRespuesta={() => setIdRespuesta(0)}
                        preguntas={userPregs.usrPregs}
                        costos={costos.costos}
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
                        nameModulo={'Asociaciones claves'}
                        bgcolor={"bg-canvasBG1dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG1dark"}
                        preguntas={userPregs.usrPregs}
                    />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={2} moduloDB={7}
                        imageName={key_activities} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG2 text-canvas2Txt"}
                        nameModulo={"Actividades claves"}
                        bgcolor={"bg-canvasBG2dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG2dark"}
                        preguntas={userPregs.usrPregs} />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={3} moduloDB={2}
                        imageName={value_propositions} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG3 text-canvas3Txt row-span-1 md:row-span-2"}
                        nameModulo={"Propuesta de valor"}
                        bgcolor={"bg-canvasBG3dark  rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG3dark"}
                        preguntas={userPregs.usrPregs} />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={4} moduloDB={4}
                        imageName={customer_relationships} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG4 text-canvas4Txt"}
                        nameModulo={"Relación con los clientes"}
                        bgcolor={"bg-canvasBG4dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG4dark"}
                        preguntas={userPregs.usrPregs} />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={5} moduloDB={1}
                        imageName={customer_segments} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG5 text-canvas5Txt row-span-1 md:row-span-2"} 
                        nameModulo={"Segmento de mercado"}
                        bgcolor={"bg-canvasBG5dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG5dark"}
                        preguntas={userPregs.usrPregs} />

                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={6} moduloDB={6}
                        imageName={key_resources} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG6 text-canvas6Txt "} nameModulo={"Recursos claves"}
                        bgcolor={"bg-canvasBG6dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG6dark"}
                        preguntas={userPregs.usrPregs} />


                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={7} moduloDB={3}
                        imageName={channel} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG7 text-canvas7Txt"} nameModulo={"Canales"}
                        bgcolor={"bg-canvasBG7dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG7dark"}
                        preguntas={userPregs.usrPregs} />


                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={8} moduloDB={9}
                        imageName={cost_structure} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG8 text-canvas8Txt col-span-1 md:col-span-3"}
                        nameModulo={"Estructura de costos"}
                        bgcolor={"bg-canvasBG8dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG8dark"}
                        preguntas={userPregs.usrPregs}
                        costos={costos.costos}
                        respuestasCostos={respuestasCostos}
                        coin={coin}
                    />
                    <ModuleBox respuestas={respuestas}
                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                        handleDelete={handleDelete} handleEdit={handleEdit}
                        handleModulo={handleModulo} moduloNumber={9} moduloDB={5}
                        imageName={revenue_streams} buttonActiveHovering={buttonActiveHovering}
                        classExtra={"bg-canvasBG9 text-canvas9Txt col-span-1 md:col-span-2"} 
                        nameModulo={"Fuente de ingresos"}
                        bgcolor={"bg-canvasBG9dark rounded pl-2 pr-1"} 
                        bgborder={"bg-canvasBG9dark"}
                        preguntas={userPregs.usrPregs}
                    />

                    <span className='text-xs p-0 m-0 absolute bottom-0 right-3 italic'>Alexander Osterwalder</span>
                    <ModalCreateEntry
                        message="Hello Portal World!"
                        isOpen={openp}
                        onClose={() => { setOpenp(false); setReadySelect(false); setIdRespuesta(0); setIdRespuestaCosto(0); }}
                        modulo={numeModulo}
                        idRespuesta={idRespuesta}
                        idRespuestaCosto={idRespuestaCosto}
                        idCanvas={canvasSelect.datos.canv_id}
                        setIdRespuesta={() => setIdRespuesta(0)}
                        preguntas={userPregs.usrPregs}
                        costos={costos.costos}
                        readySelect={readySelect}
                        setReadySelect={setReadySelect}
                        empr_id={empr_id}
                    />
                </div>}


            {windowSize.innerWidth > 800 ?
                <div className='text-center absolute right-5 top-10 z-10 text-lg text-canvas4Txt'>
                    {/* <div className="fixed bottom-4 right-4">
                    </div> */}
                    {/* <Printing ref={domEl} trigg={printImage} untrigg={setDownlImage}></Printing> */}
                    {printImage.current === true && downlImage === true && <Printing ref={domEl} trigg={printImage} untrigg={setDownlImage}></Printing>}
                    {/* <button onClick={() => printingImage()}> */}
                    <Fab color="warning" variant="extended" aria-label="imprimir Canvas" onClick={() => printingImage()}>
                        <PrintIcon></PrintIcon>
                    </Fab>
                    {/* </button> */}
                    <Fab color="secondary" variant="extended" aria-label="Actualizar Canvas" onClick={() => updateTable()}>
                        <SaveIcon> </SaveIcon> <span className="text-xs">Guardar</span>
                    </Fab>
                    <Fab color="primary" variant="extended" aria-label="descargar Imagen" onClick={() => convertToImg()}>
                        <DownloadIcon> </DownloadIcon>
                    </Fab>
                </div> : windowSize.innerWidth > 720 ?
                    <div className='text-center absolute right-5 top-10 z-10 text-lg text-canvas4Txt'>
                        {printImage.current === true && downlImage === true && <Printing ref={domEl} trigg={printImage} untrigg={setDownlImage}></Printing>}
                        <button onClick={() => printingImage()}>
                            <PrintIcon></PrintIcon>
                        </button>
                        <Fab color="secondary" variant="extended" aria-label="Actualizar Canvas" onClick={() => updateTable()}>
                            <SaveIcon> </SaveIcon>
                        </Fab>
                        <Fab color="primary" variant="extended" aria-label="descargar Imagen" onClick={() => convertToImg()}>
                            <DownloadIcon> </DownloadIcon>
                        </Fab>
                    </div>
                    : <div className='text-center fixed left-4 top-[120px] z-10 text-lg text-canvas4Txt'>
                        {printImage.current === true && downlImage === true && <Printing ref={domEl} trigg={printImage} untrigg={setDownlImage}></Printing>}
                        <Fab color="warning" variant="extended" aria-label="imprimir Canvas" onClick={() => printingImage()}><PrintIcon></PrintIcon></Fab><br />
                        {/* <button onClick={() => printingImage()}>
                            <PrintIcon></PrintIcon>
                        </button><br /> */}
                        <Fab color="secondary" variant="extended" aria-label="Actualizar Canvas" onClick={() => updateTable()}>
                            <SaveIcon sx={{ fontSize: 20 }}> </SaveIcon>
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
