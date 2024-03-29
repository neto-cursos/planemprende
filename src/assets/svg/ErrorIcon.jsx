import React from 'react'

const ErrorIcon = () => {
    //class="bg-gray-700 border-t-4 border-red-600 text-white p-3"
    /*<div className="bg-gray-900 bg-gradient-to-r text-white p-3 rounded mb-3 shadow-lg flex items-center from-red-500 to-pink-500">*/
    //'from-red-500 to-pink-500'
    return (
        <svg
            xShow="toast.type == 'error'"
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="white"
            fillRule="evenodd"
            clipRule="evenodd"
            width="100%"
        >
            <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
            />
        </svg>
    )
}

export default ErrorIcon