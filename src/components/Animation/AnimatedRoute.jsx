import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import {AnimatePresence} from 'framer-motion';
const AnimatedRoute = ({children}) => {
    //console.log("entro animatepresence")    
    return (
        <AnimatePresence>
            
        {children}
        </AnimatePresence>
    );
}

export default AnimatedRoute;
