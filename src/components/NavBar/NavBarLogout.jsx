import React from 'react';
import { NavLink } from 'react-router-dom';
import OutsideAlerter from "../../utils/OutsideAlerter";
import { Salute } from '../../utils/GetTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const NavBarLogout = ({ userName, userApellido }) => {

    const [dropDownMenu, setDropDownMenu] = React.useState(false);
    /*Toggle dropdown list*/
    const toggleDD = (mydopMenu) => {
        // document.getElementById(myDropMenu).classList.toggle("invisible");
        setDropDownMenu(!dropDownMenu);
    }
    // function toggleDD(myDropMenu) {
    //     document.getElementById(myDropMenu).classList.toggle("invisible");
    // }
    /*Filter dropdown options*/
    // function filterDD(myDropMenu, myDropMenuSearch) {
    //     var input, filter, ul, li, a, i;
    //     input = document.getElementById(myDropMenuSearch);
    //     filter = input.value.toUpperCase();
    //     div = document.getElementById(myDropMenu);
    //     a = div.getElementsByTagName("a");
    //     for (i = 0; i < a.length; i++) {
    //         if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
    //             a[i].style.display = "";
    //         } else {
    //             a[i].style.display = "none";
    //         }
    //     }
    // }



    return (<>
        <div className="relative inline-block">
            <button onClick={() => (toggleDD('myDropdown'))} className="drop-button text-white py-2 px-2"> <span className="pr-2"><AccountCircleIcon></AccountCircleIcon></span> <span className='text-xs'><p>{Salute()},</p> {userName}&nbsp;{userApellido}</span><svg className="h-3 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg></button>
            {dropDownMenu && (
                <OutsideAlerter condition={dropDownMenu} setCondition={setDropDownMenu}>
                    <div id="myDropdown" className="dropdownlist absolute bg-gray-800 text-white right-0 mt-3 mr-3 p-3 overflow-auto z-30 rounded-md">
                        {/* invisible */}
                        {/* <input type="text" className="drop-search p-2 text-gray-600" placeholder="Search.." id="myInput" onkeyup="filterDD('myDropdown','myInput')" /> */}
                        <a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i className="fa fa-user fa-fw"></i> Mi Cuenta</a>
                        <a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i className="fa fa-cog fa-fw"></i> Opciones</a>
                        <div className="border border-gray-800"></div>
                        <NavLink className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block" to="/logout" onClick={() => { setDropDownMenu(false) }}>
                            <i className="fa fa-sign-out-alt fa-fw"></i> Cerrar Sesión
                        </NavLink>
                    </div>
                </OutsideAlerter>
            )

            }
        </div>


        {/* 
        <span className="text-xs">{userName}&nbsp;{userApellido}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <NavLink className='mr-2 text-xs hover:text-red-900' to="/logout">
            cerrar sesión
        </NavLink> */}
    </>
    );
}

export default NavBarLogout;

