import React, { useState, useEffect } from "react";


const CtrlTime = () => {
    const [data, setData] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(
        localStorage.getItem("lastUpdated") || null
    );

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(/* call API to get updated data */);
            setLastUpdated(new Date().toISOString());
        }, 150000); // 5 minutes in milliseconds

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            clearInterval(interval);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    function handleManualUpdate() {
        setData(/* call API to get updated data */);
        setLastUpdated(new Date().toISOString());
        localStorage.setItem("lastUpdated", new Date().toISOString());
    }

    function handleBeforeUnload(e) {
        e.preventDefault();
        // setShowModal(true);
        e.returnValue = 'Estás seguro? aún no grabaste tu canvas';
        console.log("no before unload");
        if (lastUpdated) {
            e.preventDefault();
            setShowModal(true);
        }
    }

    function handleModalUpdate() {
        handleManualUpdate();
        setShowModal(false);
    }

    function handleModalCancel() {
        setShowModal(false);
    }
    return (
        <div className="p-4">
            <h2 className="text-lg font-medium mb-2">Data</h2>
            {data ? (
                <div>
                    {/* display data */}
                    <p className="text-sm text-gray-500 mt-2">
                        Last updated:{" "}
                        {lastUpdated ? new Date(lastUpdated).toLocaleString() : "never"}
                    </p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button
                onClick={handleManualUpdate}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Update now
            </button>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>

                        <div
                            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                                    {/* Replace with your own icon */}
                                    <svg
                                        className="h-6 w-6 text-yellow-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3
                                        className="text-lg leading-6 font-medium text-gray-900"
                                        id="modal-headline"
                                    >
                                        Update data?
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Do you want to update the data before leaving the page?
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={handleModalUpdate}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={handleModalCancel}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CtrlTime