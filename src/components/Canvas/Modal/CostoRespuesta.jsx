import React from 'react'
import SelectCustom from "../../Forms/Elements/SelectCustom";
const CostoRespuesta = ({ onClose, handleSubmit, modulo, costos, readySelect, idRespuestaCosto, respuestasCostos, idCosto, inputTitle, setIdCosto,inputActividad,inputMonto }) => {
    console.log("readySelect");
    console.log(readySelect);
    return (<>
        {/*body*/}
        <div className="relative p-2 flex flex-col">
            {((readySelect && idRespuestaCosto !== 0) || idRespuestaCosto === 0) && <SelectCustom options={costos} modulo={modulo} respuesta={respuestasCostos} idPreg={idCosto} setIdPreg={setIdCosto} idRespuesta={idRespuestaCosto} type={"costo"}
            ></SelectCustom>}
            <div className='flex flex-row'>
                <div className="my-4 text-slate-500 text-lg leading-relaxed w-2/3">
                    <label>Actividad</label>
                    <textarea id="message" rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Su respuesta..." ref={inputActividad}></textarea>
                </div>
                <div className="my-4 text-slate-500 text-lg leading-relaxed w-1/3">
                    <label htmlFor="monto">Monto</label>
                    <input type='number' id="monto" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="El Monto..." ref={inputMonto}/>
                </div>
            </div>
        </div>
        {/*footer*/}
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
            >
                Cerrar
            </button>
            <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSubmit}
            >
                Guardar Cambios
            </button>
        </div>
    </>
    )
}

export default CostoRespuesta