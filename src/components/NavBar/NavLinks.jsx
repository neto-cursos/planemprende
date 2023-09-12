import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logoPage from './../../assets/images/logoPage.png'
const NavLinks = () => {
    const menuPrincipal = useSelector(state => state.menus.menu);
    // console.log("MENU PRINCIPAL")
    // console.log(menuPrincipal);
    const LINKS = [
        {
            path: '/',
            name: 'inicio'
        },
        {
            path: '/ejemplos',
            name: 'ejemplos'
        },
        {
            path: '/tutoriales',
            name: 'tutoriales'
        },
    ]


    return (
        <>
        <div className='flex flex-col items-center pl-8'> 
        {/* <div className='flex flex-row'> {LINKS.map((link, index) => (
            <NavLink className='hover:text-red-900 lowercase md:mr-4 mr-1 text-xs md:text-sm pt-1' to={`${link.path}`} key={`${link.name}-${index}`}>
                {link.name}
            </NavLink>
        ))}</div> */}
            <img className='object-scale-down h-14 pl-2 md:pl-2' src={logoPage} alt="logo página" />

            <div className='flex flex-row'>
            {menuPrincipal.map((e) => {
                return ((e.enable===true)&&
                    <NavLink key={e.id} className='text-center hover:text-red-900 hover:opacity-50 hover:bg-white hover:rounded-md lowercase md:mr-4 mr-1 text-xs md:text-[0.7rem] p-1' to={e.enlace}>
                        {e.texto}
                    </NavLink>)

            })}
            </div>
        </div>
{/* 
            {LINKS.map((link, index) => (
                <NavLink className='hover:text-red-900 lowercase md:mr-4 mr-1 text-xs md:text-sm pt-1' to={`${link.path}`} key={`${link.name}-${index}`}>
                    {link.name}
                </NavLink>
            ))}
            <a className=' hover:text-red-900 lowercase mr-2 md:mr-4 text-xs md:text-sm pt-1' href='http://educarparalavida.org.bo/web/Inicio.html'>Soporte</a> */}
        </>
    );
}

export default NavLinks;
