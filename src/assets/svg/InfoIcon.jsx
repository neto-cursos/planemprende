import React from 'react'

const InfoIcon = () => {
    //class="bg-gray-700 border-t-4 border-blue-600 text-white p-3"
    //class="bg-gray-900 bg-gradient-to-r text-white p-3 rounded mb-3 shadow-lg flex items-center"
    //'from-blue-500 to-blue-600'
    return (
        <svg
            xShow="toast.type == 'info'"
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
            />
        </svg>
    )
}

export default InfoIcon