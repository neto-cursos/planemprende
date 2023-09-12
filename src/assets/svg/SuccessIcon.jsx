import React from 'react'

const SuccessIcon = () => {
    //class="bg-gray-700 border-t-4 border-green-600 text-white p-3"
    //class="bg-gray-900 bg-gradient-to-r text-white p-3 rounded mb-3 shadow-lg flex items-center"
    //'from-green-500 to-green-600'
  return (
    <svg
						xShow="toast.type == 'success'"
						className="w-6 h-6 mr-2"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
  )
}

export default SuccessIcon