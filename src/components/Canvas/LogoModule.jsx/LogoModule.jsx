import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import channel from './../../../assets/images/channels.svg'
import plussign from './../../../assets/images/plus-svgrepo-com.svg'

/*const MyLink = React.forwardRef(
  (
    { as, children, href, replace, scroll, shallow, passHref, ...rest }, // extract all next/link props and pass the rest to the anchor tag
    ref,
  ) => (
    <Link as={as} to={href} passHref={passHref} replace={replace}>
      <a {...rest} ref={ref}>
        {children}
      </a>
    </Link>
  ),
);*/

const Logo = ({handleOpenp}) => {
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    //const [openp, setOpenP] = useState(false);
    //classname:flex items-center flex-shrink-0 mr-6
     
    return (
        
        <span
            className="w-1/5 text-right cursor-pointer"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/*<MyLink href="/">*/}
            {isHovering ? (
                <img src={plussign} width={44} height={47} alt="agregar" onClick={handleOpenp(true)}/>

            ) : (
                <img src={channel} width={44} height={47} alt="Canales" />
            )}
            {/*</MyLink>*/}
        </span>
        
    );
};

export default function LogoModule() {
    //classname flex items-center justify-between flex-wrap bg-raisin-black p-6
    return (
        <nav className="">
            <Logo />
        </nav>
    );
}