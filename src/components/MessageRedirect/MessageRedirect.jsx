import React from 'react';
import SuccessMessage from '../MessagesBox/SuccessMessage';
import './../MessagesBox/SuccessMessage.style.css';
const MessageRedirect = ({ message, title }) => {
  /**
   * <div className="w-full md:w-1/3 mx-auto">
   * </div>
   */
  return (

    <div className="flex p-5 rounded-lg shadow bg-white" style={{ boxShadow: "0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .3)" }}>
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
      {/* <div>
        <svg className="w-6 h-6 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" /></svg>
      </div> */}
      <div className="ml-3">
        <h2 className="font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{message}</p>
      </div>
    </div>

  );
}

export default MessageRedirect;
