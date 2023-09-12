import React from 'react'
import './SuccessMessage.style.css';
const SuccessMessage = () => {
    return (
        <div className="flex justify-center text-center p-5 rounded-lg shadow bg-white" style={{ boxShadow: "0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .3)" }}>
            <div className="svg-box">
                <svg className="circular green-stroke flex justify-center">
                    <circle className="path" cx="75" cy="75" r="50" fill="none" strokeWidth="5" strokeMiterlimit="10" />
                </svg>
                <svg className="checkmark green-stroke">
                    <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
                        <path className="checkmark__check" fill="none" d="M616.306,283.025L634.087,300.805L673.361,261.53" />
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default SuccessMessage