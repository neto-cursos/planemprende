import React, { Component } from 'react'
import BrandLinkText from './BrandLinkText'
import IconFacebook from './../../assets/icons/iconFacebook';
import IconYoutube from './../../assets/icons/iconYoutube';
import IconInstagram from './../../assets/icons/iconInstagram';
import IconWhatsapp from './../../assets/icons/iconWhatsapp';
import IconTwitter from './../../assets/icons/iconTwitter';
import FondoFooter from '../../assets/svg/FondoFooter';
import ChkWindowSize from '../ChkWindowSize';
import { getWindowSize } from '../../utils/checkWindow';
const Footer = ({windowSize}) => {
//p-2
// const [windowSize, setWindowSize] = React.useState(getWindowSize());
    return (<>
        
        <footer className='bg-darkish'>
        <div className='py-0 my-0 align-middle'>
            
            <FondoFooter></FondoFooter>    
                </div>
            

            <div className='container relative justify-between flex items-center py-4'>
            
            
                <BrandLinkText classes='text-bglogotext' />
                {windowSize.innerWidth > 920 && <div className='text-xs md:text-2xl text-bglogotext'>Fundación Educar para la vida 2022</div>}
                <div className='flex text-bglogotext'>
                    <a className="hover:bg-blue-300 rounded-md" href='https://www.facebook.com/Fundaci%C3%B3n-Educar-para-La-Vida-108972277335908'>
                        <IconFacebook></IconFacebook>
                    </a>
                    <a className="hover:bg-green-300 rounded-md" href='https://api.whatsapp.com/send?phone=%3C59172087186%3E'>
                        <IconWhatsapp></IconWhatsapp>
                    </a>
                    <a className="hover:bg-red-400 rounded-md" href='https://www.instagram.com/fundeducarparalavida/'>
                        <IconInstagram></IconInstagram>
                    </a>
                    <a className="hover:bg-sky-400 rounded-md" href='https://twitter.com/FUNDVIDA2'>
                        <IconTwitter></IconTwitter>
                    </a>
                </div>
            </div>
        </footer></>
    )
}
export default Footer; 