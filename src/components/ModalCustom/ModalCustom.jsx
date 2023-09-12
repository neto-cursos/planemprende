import React from 'react';
import ReactDOM from "react-dom";

const ModalCustom = ({ isOpenModal, setIsOpenModal, mensaje }) => {
    const onCloseModal = () => { setIsOpenModal(false); }
    const [openmodal, setOpenModal] = React.useState(isOpenModal);
    if (!isOpenModal) return null;
    return ReactDOM.createPortal(
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-2 mx-auto max-w-3xl w-[20rem] md:w-[27rem]">
                {/*content*/}

                <div className="bg-gray-900 bg-gradient-to-r text-white p-3 rounded mb-3 shadow-lg flex items-center from-red-500 to-pink-500">
                    <svg
                        x-show="toast.type == 'error'"
                        class="w-6 h-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <span>
                        <h5 className='font-semibold italic'>{mensaje.error.message}</h5>
                    </span>

                    <button
                        /**leading-none */
                        className="p-0 ml-auto bg-transparent border-0 text-redish opacity-100 float-right text-2xl font-semibold outline-none focus:outline-none"
                        onClick={() => onCloseModal()}
                    >
                        <span className="bg-transparent text-redish hover:text-red-500 opacity-100 text-2xl block outline-none focus:outline-none">
                            ×
                        </span>
                    </button>


                </div>
                {/* <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-red-500 outline-none focus:outline-none text-center">
                    
                    <div className="flex items-start justify-between border-b border-solid border-red-700 rounded-t text-whitish">
                        <h3 className="text-xl font-semibold">Error
                        </h3>

                        <button
                            
                            className="p-0 ml-auto bg-transparent border-0 text-redish opacity-100 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => onCloseModal()}
                        >
                            <span className="bg-transparent text-redish hover:text-red-500 opacity-100 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>
                    <div>
                        <h5 className='font-semibold italic'>{mensaje.error.message}</h5>
                    </div>

                </div> */}
            </div>
        </div>,
        document.body
    );
}

export default ModalCustom;