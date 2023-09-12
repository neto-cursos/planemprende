import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createUsersPregs, listUsersPregs } from "../../../redux/actions/userPreguntaActions";
import { addUsersPreg } from "../../../redux/reducers/userPreguntaSlice";
import OutsideAlerter from "./../../../utils/OutsideAlerter";
import SendIcon from '@mui/icons-material/Send';
import { resetUsersPreg } from '../../../redux/reducers/userPreguntaSlice';
import * as yup from 'yup';
import { trimSingleText } from "../../../utils/trimText";
import Validation from "../../Validation/Validation";
import { validateForm } from "../../../utils/validateForm";
import SaveIcon from '@mui/icons-material/Save';

const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 100vh;
`;

const DropDownContainer = styled("div")`
  width: 90%;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
`;

const DropDownListContainer = styled("div")`
  display:flex;
  z-index: 100;
  flex-direction: row;
  box-shadow: 0 0 0 max(100vh,100vw) rgba(0,0,0,.3);
`;

const DropDownInput = styled("input")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;
const PreguntaAdd = ({ options, modulo,
    idPreg, setIdPreg, setAddUsrPreg, type = "pregunta", empr_id }) => {

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
        usr_preg_text: yup.string().required(),
        // responsable: yup.string().required(),
        // unidad: yup.string().required(),
        // cantidad: yup.number().min(0),
        // costounitario: yup.number().min(0),
    });
    const [errores, setErrores] = useState(null);
    const userPregs = useSelector(state => state.usersPregs);
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
    const pregTextRef = React.useRef(null);
    const enviar = React.useRef(false);
    const [formInput, setFormInput] = useState(
        {
            modu_id: modulo,
            id: '',
            empr_id: empr_id,
            usr_preg_nume: '',
            usr_preg_text: '',
            usr_preg_desc: '',
            usr_preg_esta: '',
            usr_repl_preg_id: 0,
        }
    );
    const dispatch = useDispatch();
    const getUsrPregNume = () => {
        const modu = options.filter(preg => preg.modu_id == modulo);
        if (modu != null) {
            let mayor = -1;
            const value = modu.map((m) => {
                if (m.usr_preg_nume > mayor) {
                    mayor = m.usr_preg_nume;
                }
                return mayor;
            });
            return mayor + 1;
        }
    }
    const createUserPregunta = (e) => {
        // e.preventDefault();
        console.log(pregTextRef);
        enviar.current = true;
        setFormInput(prevState => ({
            ...prevState,
            usr_preg_nume: getUsrPregNume(),
            usr_preg_text: trimSingleText(pregTextRef.current.value),
            usr_preg_desc: '',
            usr_preg_esta: '',
        }));
    };
    useEffect(() => {
        pregTextRef.current.focus();
      }, []);
    useEffect(() => {
        console.log(formInput);
        if (enviar.current === true) {
            validateForm(schema, formInput, setErrores);
            // dispatch(addUsersPreg(formInput));

            // setAddUsrPreg(false);
        }
        // else {
        //     if (formInput.usr_preg_text) {
        //         pregTextRef.current.value = formInput.usr_preg_text;

        //     }
        // }
    }, [formInput]);

    useEffect(() => {
        if (errores !== null && enviar.current === true) {
            if (errores.length == 0) {
                dispatch(createUsersPregs(formInput));
            }
            enviar.current = false;
            console.log(errores);
        }
    }, [errores]);

    useEffect(() => {
        if (userPregs.estado === "addquestions") {
            dispatch(addUsersPreg(formInput));
            console.log("resetting");
            // dispatch(resetUsersPreg());
            // dispatch(listUsersPregs({ empr_id: empr_id }));
            setErrores(null);
            setAddUsrPreg(false);
        }
    }, [userPregs.estado]);



    return (
        <DropDownContainer>
            <DropDownListContainer>
                <div className="flex flex-col w-5/6 m-0 pl-1">
                <textarea id='txtBox01' rows='2' name='usr_preg_text' className='bg-white box-border text-[#3faffa] text-md font-medium border-solid border-[#e5e5e5] border-2' ref={pregTextRef} required />
                
                <span className="text-red-500 block">
                    {errores !== null && errores.find(e => e.errorKey === 'usr_preg_text')?.errorMsg}
                </span>
                </div>
                <span type="submit" className="pl-2 w-1/6 cursor-pointer flex items-center hover:text-green-700" onClick={() => (createUserPregunta())}><SaveIcon></SaveIcon></span>
                
            </DropDownListContainer>
        </DropDownContainer>
    );
}

export default PreguntaAdd