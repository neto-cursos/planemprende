import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import LogoFundVida from '../../assets/svg/LogoFundVida';
//import logofundacion from './../../assets/images/logofundvidatransp.png';
import logofundacion from './../../assets/images/logoFundvida.png';

const BrandLink = ({classes=''}) => {
    return (
        <Link to="/" className={`md:text-2xl font-krona ${classes}`}>
            <img className='object-scale-down h-14 pl-2' src={logofundacion} alt="logoFundación" />
            {/* FundVida */}
        </Link>
    )
    
}
export default BrandLink; 