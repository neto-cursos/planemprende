import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const BrandLinkText = ({classes=''}) => {
    return (
        <Link to="/" className={`text-2xl font-krona ${classes}`}>
            FundVida
        </Link>
    )
    
}
export default BrandLinkText; 