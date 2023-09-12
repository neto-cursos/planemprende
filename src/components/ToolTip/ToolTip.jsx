import React from 'react';
import OutsideAlerter from '../../utils/OutsideAlerter';

const ToolTip = ({initialValue=false,currentValue,title='',msg=''}) => {
    const [showButton,setShowButton]=React.useState(initialValue);
    return (
        <>
            <div className="ml-2 flex focus:outline-none focus:ring-gray-300 rounded-full focus:ring-offset-2 focus:ring-2 focus:bg-gray-200 relative mt-6 md:mt-0"
                onClick={() => setShowButton(currentValue)}>
                <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#A0AEC0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="12" cy="12" r="9" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                        <polyline points="11 12 12 12 12 16 13 16" />
                    </svg>
                </div>
                {showButton === currentValue &&
                    <OutsideAlerter condition={showButton} setCondition={setShowButton}
                        initialValue={initialValue}>
                        <div className="z-20 -mt-10 w-44 absolute transition duration-150 ease-in-out left-0 ml-8 shadow-lg bg-white p-2 rounded">
                            <svg className="absolute left-0 -ml-2 bottom-0 top-0 h-full" width="9px" height="16px" viewBox="0 0 9 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Tooltips-" transform="translate(-874.000000, -1029.000000)" fill="#000000">
                                        <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
                                            <g id="Group-2" transform="translate(24.000000, 0.000000)">
                                                <polygon id="Triangle" transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) " points="4.5 57.5 12.5 66.5 -3.5 66.5"></polygon>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <p className="text-sm font-bold text-gray-800 pb-1">{title}</p>
                            <p className="text-xs leading-4 text-gray-600 pb-3 text-justify">{msg}</p>
                            {/* <div className="flex justify-between">
                                <div className="flex items-center">
                                    <span className="text-xs font-bold text-indigo-700">Step 1 of 4</span>
                                </div>
                                <div className="flex items-center">
                                    <button className="focus:outline-none  focus:text-gray-400 text-xs text-gray-600 underline mr-2 cursor-pointer">Skip Tour</button>
                                    <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-400 focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-5 py-1 text-xs">Next</button>
                                </div>
                            </div> */}
                        </div>
                    </OutsideAlerter>}
            </div>
        </>
    );
}

export default ToolTip;
