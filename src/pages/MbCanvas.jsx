import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Canvas from '../components/Canvas';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { nanoid } from '@reduxjs/toolkit';
import { modulos } from './../constants/modulos'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenu } from '../redux/reducers/menuSlice';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import OutsideAlerter from '../utils/OutsideAlerter';
import calendario from './../assets/icons/calendario.png';
const MbCanvas = () => {

    const [enab, setEnab] = useState(true);
    const canvasSelect = useSelector(state => state.canvas);
    /* */
    const [dropDownCoin, setDropDownCoin] = React.useState(false);
    const [coin, setCoin] = React.useState('Bs');
    const container = useRef(null);
    const { empr_id } = useParams();
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(changeMenu({title:'MENU_CANVAS',empr_id:empr_id,modu_nume:1,bmc_type:'Industria'}))
    //   }, [])


    useEffect(() => {
        if (canvasSelect.idState === 'new') {
            setEnab(false);
        } else {
            setEnab(true);
        }
    }, [canvasSelect.idState])

    const [select, setSelect] = React.useState({
        id: 1, value: `Módulo 1 
    ${modulos.find((nodo => nodo.modu_id == 1)).modulo}`
    });

    const toggleDDC = (mydopMenu) => {
        setDropDownCoin(!dropDownCoin);
        const { left } = container.current.getBoundingClientRect();

    }

    useEffect(() => {
        console.log("selectid");
        console.log(select.id);
        dispatch(changeMenu({ title: 'MENU_CANVAS', empr_id: empr_id, modu_nume: select.id, bmc_type: 'Industria' }));
    }, [select]);


    const handleChange = (e) => {
        // console.log(e.target);
        setSelect({
            id: e.target.value,
            value: `Módulo ${e.target.value} 
        ${modulos.find((nodo => nodo.modu_id == Number(e.target.value))).modulo}`,
        });
    }
    return (
        <motion.div className='flex relative flex-col my-2 pl-2 mb-16'
            initial={{ width: 0, opacity: 0 }} animate={{ width: "100%", opacity: 2 }} exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >

            <h1 className="text-4xl text-darkish text-center">Plan De Negocios</h1>
            <div className='pb-4 flex flex-row justify-left lg:justify-center items-center'>
                {/* <FormControl variant="standard" sx={{ mr: 1, minWidth: 120 }}>
                    <InputLabel id="lblselectmodule">Módulo</InputLabel>
                    <Select key={nanoid()}
                        labelId="lblselectmodule"
                        id="selectmodule"
                        value={select.id}
                        onChange={handleChange}
                        label="Módulo"
                    > */}
                {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
                {/* <MenuItem value={1}>módulo 1</MenuItem>
                        <MenuItem value={2}>módulo 2</MenuItem>
                        <MenuItem value={3}>módulo 3</MenuItem>
                        <MenuItem value={4}>módulo 4</MenuItem>
                        <MenuItem value={5}>módulo 5</MenuItem>
                        <MenuItem value={6}>módulo 6</MenuItem>
                        <MenuItem value={7}>módulo 7</MenuItem>
                        <MenuItem value={8}>módulo 8</MenuItem>
                        <MenuItem value={9}>módulo 9</MenuItem> */}
                {/* </Select>
                </FormControl> */}
                {/* <Link to={`/misemprendimientos/fill/${empr_id}/${select.id}/Industria`}>
                    <button className='text-whitish bg-redish rounded-sm'>
                        Llenar {select.value}
                    </button>
                </Link> */}


                {enab === true && 
                
                <div className="flex justify-center cursor-pointer">
                    <Link className="flex flex-col justify-center w-full px-3 py-0 items-center" to={`/emprendimiento/${empr_id}/cronograma`} >
                        {/* <img src={scheduling} alt="Cronograma imagen"
                            className='object-cover'
                            layout="fill" /> */}

                        <img src={calendario} className="hover:bg-rojo-violeta object-scale-down h-14 rounded-lg w-full" alt="..." />
                        <h3 className="font-sans text-sm font-semibold hover:text-rojo-violeta"> Ver Cronograma</h3>
                    </Link>
                </div>}
                
                


                <span className='p-1 pr-2' ref={container}>
                    <button onClick={() => (toggleDDC('myDropdownCoin'))} className="drop-button text-green-500 py-2 px-2"> <span className="pr-2">Moneda: <MonetizationOnIcon></MonetizationOnIcon></span> </button>
                    {dropDownCoin && (
                        <OutsideAlerter condition={dropDownCoin} setCondition={setDropDownCoin}>
                            <div id="myDropdownCoin" className="dropdownlist absolute bg-gray-800 text-white mr-3 p-3 overflow-auto z-30 rounded-md">
                                <span className="cursor-pointer p-2 hover:bg-gray-800 hover:text-redish text-white text-sm no-underline hover:no-underline block" onClick={() => { setCoin('$'); setDropDownCoin(false); }}><i className="fa fa-user fa-fw"></i> $</span>
                                <span className="cursor-pointer p-2 hover:bg-gray-800 hover:text-redish text-white text-sm no-underline hover:no-underline block" onClick={() => { setCoin('€'); setDropDownCoin(false); }}><i className="fa fa-cog fa-fw"></i> €</span>
                                <span className="cursor-pointer p-2 hover:bg-gray-800 hover:text-redish text-white text-sm no-underline hover:no-underline block" onClick={() => { setCoin('Bs'); setDropDownCoin(false); }}><i className="fa fa-cog fa-fw"></i> Bs</span>
                            </div>
                        </OutsideAlerter>
                    )
                    }
                </span>

            </div>
            <Canvas coin={coin}>
            </Canvas>
            <div></div>
        </motion.div>
    );
}

export default MbCanvas;
