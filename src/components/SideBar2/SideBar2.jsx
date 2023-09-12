import React, { useEffect, useReducer, useState } from "react";
import OutsideAlerter from "../../utils/OutsideAlerter";
// import { menuPrincipal } from "../../constants/MenuSideBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logofundacion from './../../assets/images/logoFundvida.png';
import FondoMenuSidebar2 from './../../assets/images/FondoMenuSidebar2.jpg';
import { asignFunctionName } from "../../redux/reducers/menuSlice";
const SideBar2 = () => {
    const dispatch = useDispatch();
    
    const menuPrincipal = useSelector(state => state.menus.menu);
    // <NavBar showLogin={true} auth={auth}></NavBar>
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <div className="flex flex-col md:hidden items-center justify-center py-2">
            {showSidebar ? (
                <button
                    className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    x
                </button>
            ) : (<>
                <svg
                    onClick={() => setShowSidebar(!showSidebar)}
                    //fixed
                    className="absolute z-30 flex items-center cursor-pointer right-4 top-4"
                    fill="#e74619"
                    viewBox="0 0 100 100"
                    width="40"
                    height="40"
                >
                    <text y="20" x="5" height="30" width="100" className="font-bold text-xl" opacity="0.3" fill="#000000">Menú</text>
                    <rect width="100" height="10" y="30"></rect>
                    <rect y="60" width="100" height="10"></rect>
                    <rect y="90" width="100" height="10"></rect>
                </svg></>
            )}
            <OutsideAlerter condition={showSidebar} setCondition={setShowSidebar}>
                <div
                    className={` overflow-y-auto cursor-pointer flex flex-col items-start justify-center top-0 left-0 w-[100vw] lg:w-[35vw] bg-gradient-to-b from-rojo-dark via-naranja-dark to-naranja-fondo text-[white] fixed h-full z-50  ease-in-out duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full"
                        }`}

                >
                    <div className="w-[100vw] h-full lg:w-[35vw] bg-fondosidebar2 bg-no-repeat bg-cover bg-left mix-blend-overlay fixed z-0"></div>
                    <div className="p-10 pl-16 z-10">
                        <img className='absolute top-6 left-6 object-scale-down h-14 pl-2 md:pl-2' src={logofundacion} alt="logoFundación" />
                        <button type="button" onClick={() => setShowSidebar(!showSidebar)} className="absolute top-0 right-0 flex flex-row items-center justify-center p-3 m-5 text-xs font-bold"><svg className="w-6 h-6 mr-2 opacity-75 fill-current" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg><span>Cerrar</span></button>

                        <h3 className="flex mt-20 text-4xl font-semibold text-darkish">
                            Menú Principal
                        </h3>
                        <div className="flex w-full">
                            <nav className="flex flex-col w-full ">
                                {menuPrincipal.map((e) => {
                                    if (e.enlace !== 'null')
                                        return <Link key={e.id} to={e.enlace} className="text-darkish block py-3 px-2 font-bold" onClick={() => setShowSidebar(!showSidebar)}>{e.texto}</Link>
                                    else
                                        return <span key={e.id} className="text-darkish block py-3 px-2 font-bold" onClick={() => {
                                            //const fn = new Function(e.funcion);
                                            //fn();
                                            if (e.funcion)
                                                dispatch(asignFunctionName(e.funcion))
                                            setShowSidebar(!showSidebar);
                                        }}>{e.texto}</span>
                                })}
                            </nav>
                        </div>
                    </div>
                </div>
            </OutsideAlerter >
        </div >
    )
}

export default SideBar2