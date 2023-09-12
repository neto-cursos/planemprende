import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateUsersPregs, deleteUsersPregs } from "../../../redux/actions/userPreguntaActions";
import { updateUsersPreg, deleteUsersPreg } from "../../../redux/reducers/userPreguntaSlice";
import OutsideAlerter from "./../../../utils/OutsideAlerter";
import SendIcon from '@mui/icons-material/Send';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DeleteConfirmation } from "../../DeleteConfirmation/DeleteConfirmation";
import * as yup from 'yup';
import { trimSingleText } from "../../../utils/trimText";
import { validateForm } from "../../../utils/validateForm";

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
  /* position: absolute; */
  display:flex;
  z-index: 100;
  flex-direction: row;
  /* width: 20rem; */
  box-shadow: 0 0 0 max(100vh,100vw) rgba(0,0,0,.3);
  /* style={{boxShadow: '0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .3)'}} */
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

const PreguntaEdit = ({ options, modulo,
    idPreg, setIdPreg, setEditUsrPreg, editUsrPreg,type = "pregunta" }) => {
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
    });
    const [errores, setErrores] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [trickySol, setTrickySol] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
    const pregTextRef = React.useRef(null);
    const enviar = React.useRef(false);
    const [formInput, setFormInput] = useState(
        () => {
            const pregunta = options.find(preg => preg.usr_preg_id == idPreg && preg.modu_id == modulo);
            // if(pregunta!=null){pregTextRef.current.value=pregunta.usr_preg_text}
            console.log("Pregunta Edit");
            console.log(pregunta);
            return pregunta;
        }
    );
    useEffect(() => {
        pregTextRef.current.focus();
    }, []);
    const dispatch = useDispatch();
    // const updateFormInput = e => {
    //     // e.persist()
    //     setFormInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    // }

    // useEffect(() => {
    //     const aux1 = JSON.parse(sessionStorage.getItem('usr_dt'));
    //     setFormInput({ ...formInput, id: aux1.user_id })
    // }, [])
    // useEffect(() => {
    //     pregTextRef.current.value=formInput.usr_preg_text;
    // }, []);

    const updateUserPregunta = (e) => {
        // e.preventDefault();
        console.log(pregTextRef);
        enviar.current = true;
        setFormInput(prevState => ({ ...prevState, usr_preg_text: trimSingleText(pregTextRef.current.value), }))

    };
    const deleteUserPregunta = (e) => {
        // e.preventDefault();
        enviar.current = true;
        dispatch(deleteUsersPregs({ usr_preg_id: idPreg }));
        dispatch(deleteUsersPreg(idPreg));
        setIsDeleted(true);
    };
    useEffect(() => {
        if (enviar.current === true) {
            validateForm(schema, formInput, setErrores);
            // dispatch(updateUsersPreg(formInput));
            // dispatch(updateUsersPregs(formInput));
            // enviar.current = false;
            // setEditUsrPreg(false);
        } else {
            if (formInput.usr_preg_text) {
                pregTextRef.current.value = formInput.usr_preg_text;
                //setTrickySol(true);
            }
        }
    }, [formInput]);

    useEffect(() => {
        if (errores !== null && enviar.current === true) {
            if (errores.length == 0) {
                dispatch(updateUsersPreg(formInput));
                dispatch(updateUsersPregs(formInput));
                enviar.current = false;
                setEditUsrPreg(false);
            }
            pregTextRef.current.focus();
            enviar.current = false;
            console.log(errores);
        }
    }, [errores]);


    useEffect(() => {
        if (isDeleted === true) {
            enviar.current = false;
            setEditUsrPreg(false);
        }
    }, [isDeleted]);
    // onChange={() => (updateFormInput())}
    //'current' in pregTextRef?'value' in pregTextRef.current?pregTextRef.current.value:'':''
    //<span type="submit" className="cursor-pointer flex items-center" onClick={() => (deleteUserPregunta())}><DeleteForeverIcon></DeleteForeverIcon></span>
    return (
        <DropDownContainer>
            {editUsrPreg && (<OutsideAlerter condition={editUsrPreg} setCondition={setEditUsrPreg}>
            <DropDownListContainer>
                {/* padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500; 
  <span class="input" role="textbox" contenteditable>99</span> hugs</p>
  */}
                <div className="flex flex-col w-5/6 m-0 pl-1">
                <textarea id='txtBox01' rows='2' name='usr_preg_text' className='m-0bg-white box-border text-[#3faffa] text-md font-medium border-solid border-[#e5e5e5] border-2' ref={pregTextRef} required />
                <span className="text-red-500 block">
                    {errores !== null && errores.find(e => e.errorKey === 'usr_preg_text')?.errorMsg}
                </span>
                </div>
                {/* <span name='usr_preg_text' id='usr_preg_text' className='m-0 pl-1 bg-white box-border text-[#3faffa] text-md font-medium border-solid border-[#e5e5e5] border-2' ref={pregTextRef} required contentEditable>{pregTextRef.current!=null?pregTextRef.current.value:''}</span> */}
                <div className="pl-1 w-1/6 flex">
                    <span type="submit" className="cursor-pointer flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" onClick={() => (updateUserPregunta())}><SendIcon></SendIcon></span>
                    <DeleteConfirmation onDelete={deleteUserPregunta}></DeleteConfirmation>

                </div>
                {/* <DropDownList>
                        {options.map(option => (
                            option.modu_id == modulo && type==='pregunta'?
                            <ListItem onClick={onOptionClicked(option.usr_preg_id, option.usr_preg_text)} key={Math.random()}>
                                {option.usr_preg_text}
                            </ListItem>:option.modu_id == modulo && type==='costo'?<ListItem onClick={onOptionClicked(option.cost_id, option.cost_text)} key={Math.random()}>
                                {option.cost_text}
                            </ListItem>:''
                        ))}
                    </DropDownList> */}
            </DropDownListContainer>
            </OutsideAlerter>
            )}
        </DropDownContainer>
    );
}
export default PreguntaEdit;