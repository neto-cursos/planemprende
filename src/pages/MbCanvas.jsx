import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Canvas from '../components/Canvas';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { nanoid } from '@reduxjs/toolkit';
import { modulos } from './../constants/modulos'
import {motion} from 'framer-motion';
import { useDispatch} from 'react-redux';
import { changeMenu } from '../redux/reducers/menuSlice';
const MbCanvas = () => {
    const { empr_id } = useParams();
    const dispatch=useDispatch();
    // useEffect(() => {
    //     dispatch(changeMenu({title:'MENU_CANVAS',empr_id:empr_id,modu_nume:1,bmc_type:'Industria'}))
    //   }, [])
    const [select, setSelect] = React.useState({
        id: 1, value: `Módulo 1 
    ${modulos.find((nodo => nodo.modu_id == 1)).modulo}`
    });
    
    useEffect(() => {
        console.log("selectid");
        console.log(select.id);
        dispatch(changeMenu({title:'MENU_CANVAS',empr_id:empr_id,modu_nume:select.id,bmc_type:'Industria'}));
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
        initial={{width:0,opacity:0}} animate={{width:"100%",opacity:2}} exit={{x:window.innerWidth, transition:{duration:0.1}}}
        >

            <h1 className="text-4xl text-darkish text-center">PLAN NEGOCIOS</h1>
            <div className='pb-4 flex flex-row justify-center items-center'>
                <FormControl variant="standard" sx={{ mr: 1, minWidth: 120 }}>
                    <InputLabel id="lblselectmodule">Módulo</InputLabel>
                    <Select key={nanoid()}
                        labelId="lblselectmodule"
                        id="selectmodule"
                        value={select.id}
                        onChange={handleChange}
                        label="Módulo"
                    >
                        {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
                        <MenuItem value={1}>módulo 1</MenuItem>
                        <MenuItem value={2}>módulo 2</MenuItem>
                        <MenuItem value={3}>módulo 3</MenuItem>
                        <MenuItem value={4}>módulo 4</MenuItem>
                        <MenuItem value={5}>módulo 5</MenuItem>
                        <MenuItem value={6}>módulo 6</MenuItem>
                        <MenuItem value={7}>módulo 7</MenuItem>
                        <MenuItem value={8}>módulo 8</MenuItem>
                        <MenuItem value={9}>módulo 9</MenuItem>
                    </Select>
                </FormControl>
                <Link to={`/misemprendimientos/fill/${empr_id}/${select.id}/Industria`}>
                    <button className='text-whitish bg-redish rounded-sm'>
                        Llenar {select.value}
                    </button>
                </Link>
                
            </div>
            <Canvas>

            </Canvas>
            <div></div>
        </motion.div>
    );
}

export default MbCanvas;
