import React from 'react';
import { Link } from 'react-router-dom';
import FormIcon from './../../../assets/images/FormIcon02.png';
const Header = ({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}) => {
    return (
        <div className="mt-10 md:mt-0 mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-14"
                    src={FormIcon}/>
            </div>
            <h2 className="mt-2 text-center text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                {linkName}
            </Link>
            </p>
        </div>
    );
}

export default Header;
