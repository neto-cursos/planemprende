import React from 'react';
import {getWindowSize} from './../../utils/checkWindow';
const ChkWindowSize = ({setWindowSize}) => {
    React.useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
}

export default ChkWindowSize;

