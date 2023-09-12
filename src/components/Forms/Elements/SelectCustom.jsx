import React, { useState } from "react";
import styled from "styled-components";
import OutsideAlerter from "./../../../utils/OutsideAlerter";

const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 100vh;
`;

const DropDownContainer = styled("div")`
  width: 20rem;
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
  position: absolute;
  z-index: 100;
  width: 25rem;
`;

const DropDownList = styled("ul")`
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

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  &:hover {
    color: #fd9e46;
  }
`;

const opciones = ["Mangoes", "Apples", "Oranges"];

const SelectCustom = ({ options, modulo, respuesta, setRespuesta,
    idPreg, setIdPreg, idRespuesta, type = "pregunta" }) => {
    console.log("type "+type);
    // console.log("idRespuesta");
    // console.log(idRespuesta);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(() => {
        // console.log("Respuesta");
        // console.log(respuesta);
        // console.log("idpreg");
        // console.log(idPreg);
        // console.log(idRespuesta);
        if (idRespuesta !== 0 && idPreg !== '') {
            
            const pregunta = type === "pregunta" ? options.find(preg => preg.usr_preg_id == idPreg && preg.modu_id == modulo) : type === "costo" ? options.find(preg => preg.cost_id == idPreg && preg.modu_id == modulo) : '';
            //console.log(pregunta);
            // console.log("pregunta first: ")
            // console.log(pregunta)
            if (pregunta !== null)
                return {
                    preg_id: type === "pregunta" ? pregunta.usr_preg_id : (type === "costo" ? pregunta.cost_id : ''),
                    preg_text: type === "pregunta" ? pregunta.usr_preg_text : (type === "costo" ? pregunta.cost_text : ''),
                };
        }
        else {
            // console.log(options)
            // console.log(modulo)
            const pregunta = options.find(preg => preg.modu_id == modulo)
            //console.log(pregunta);
            return {
                preg_id: type === "pregunta" ? pregunta.usr_preg_id : (type === "costo" ? pregunta.cost_id : ''),
                preg_text: type === "pregunta" ? pregunta.usr_preg_text : (type === "costo" ? pregunta.cost_text : ''),
            };
        }
    });

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (preg_id, text) => () => {
        setSelectedOption({
            preg_id: preg_id,
            preg_text: text
        });
        // console.log(selectedOption);
    };

    React.useEffect(() => {
        // console.log("respuesta: ");
        // console.log(respuesta);
        // if (respuesta.preg_id !== '')
        //     setIsOpen(false);

    }, [respuesta]);

    React.useEffect(() => {

        setIdPreg(selectedOption.preg_id);
        setIsOpen(false);

    }, [selectedOption])

    React.useEffect(() => {
        setSelectedOption(() => {
            // console.log("Respuesta");
            // console.log(respuesta);
            // console.log("idpreg");
            // console.log(idPreg);
            // console.log(idRespuesta);
            if (idRespuesta !== 0 && idPreg !== '') {
                
                const pregunta = type === "pregunta" ? options.find(preg => preg.usr_preg_id == idPreg && preg.modu_id == modulo) : type === "costo" ? options.find(preg => preg.cost_id == idPreg && preg.modu_id == modulo) : '';
                //console.log(pregunta);
                // console.log("pregunta first: ")
                
                if (pregunta !== null)
                    return {
                        preg_id: type === "pregunta" ? pregunta.usr_preg_id : (type === "costo" ? pregunta.cost_id : ''),
                        preg_text: type === "pregunta" ? pregunta.usr_preg_text : (type === "costo" ? pregunta.cost_text : ''),
                    };
            }
            else {
                // console.log(options)
                // console.log(modulo)
                const pregunta = options.find(preg => preg.modu_id == modulo)
                //console.log(pregunta);
                return {
                    preg_id: type === "pregunta" ? pregunta.usr_preg_id : (type === "costo" ? pregunta.cost_id : ''),
                    preg_text: type === "pregunta" ? pregunta.usr_preg_text : (type === "costo" ? pregunta.cost_text : ''),
                };
            }
        });
        //console.log("how many times render")
    }, [])
    
    return (

        <DropDownContainer>
            <DropDownHeader onClick={toggling}>
                {type==='pregunta'?selectedOption.preg_text || respuesta.preg_text:type==='costo'?selectedOption.preg_text || respuesta.cost_text:''
                }
            </DropDownHeader>
            {isOpen && (<OutsideAlerter condition={isOpen} setCondition={setIsOpen}>
                <DropDownListContainer>
                    <DropDownList>
                        {options.map(option => (
                            option.modu_id == modulo && type==='pregunta'?
                            <ListItem onClick={onOptionClicked(option.usr_preg_id, option.usr_preg_text)} key={Math.random()}>
                                {option.usr_preg_text}
                            </ListItem>:option.modu_id == modulo && type==='costo'?<ListItem onClick={onOptionClicked(option.cost_id, option.cost_text)} key={Math.random()}>
                                {option.cost_text}
                            </ListItem>:''
                        ))}
                    </DropDownList>
                </DropDownListContainer></OutsideAlerter>
            )}
        </DropDownContainer>
    );
}
export default SelectCustom;