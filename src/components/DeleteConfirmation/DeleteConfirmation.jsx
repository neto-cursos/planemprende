import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export function DeleteConfirmation({ icon=null,onDelete,parameter=null,msgPreg="¿Está seguro?" }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDelete(parameter);
    setShowModal(false);
  };
//<div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
//overflow-y-auto on 1st div showmodal
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
      >
        <DeleteForeverIcon></DeleteForeverIcon>
      </button>
      {showModal && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50">
        <div className="fixed z-10 inset-0 overflow-hidden shadow" style={{ boxShadow: "0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .3)" }}>
          <div className="flex items-center justify-center min-h-screen">
            
            
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-lg font-bold">{msgPreg}</p>
                <p className="mt-2">Esta acción no puede ser revertida.</p>
              </div>
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
}
