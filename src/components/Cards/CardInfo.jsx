import React from 'react'

const CardInfo = ({title,value,icon,colorFrom,colorTo,borderColor="border-red-500",bgRound="red-500"}) => {
    //md:w-1/2 xl:w-1/3
    return (
        <div className="md:p-4 sm:p-3 p-1 lg:p-4 xl:p-4">
            <div className={`bg-gradient-to-b ${colorFrom} ${colorTo} border-solid border-b-4 ${borderColor}  rounded-lg shadow-x p-0 md:p-2`}>
                <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-2">
                        <div className={`rounded-full p-0 md:p-2 ${bgRound}`}>
                            <span className='px-2 font-bold text-whitish'>{value}</span>
                            {icon!=null&&(<img></img>)}
                            {/* <i className="fa fa-wallet fa-2x fa-inverse"></i> */}
                            </div>
                    </div>
                    <div className="flex-1 text-right md:text-center overflow-hidden">
                        <h2 className="font-bold uppercase text-gray-600 text-xs md:text-sm">{title}</h2>
                        {/* <p className="font-bold text-2xl">{value}  */}
                        {/* <span className="text-green-600"><i className="fas fa-caret-up"></i></span> */}
                        {/* </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardInfo