import React from 'react';
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import EmprendForm from './EmprendForm';
import EmprendList from './EmprendList';

const CrudEmprend = (linkaddr, id) => {
    const location = useLocation();
    let isEdit = false;
    let editId = '';
    const emprendState = useSelector(state => state.emprendimientos)
    // console.log(emprendState);
    // console.log("linksaddr:" + linkaddr)
    const addrReq1 = '/misemprendimientos/edit/';
    if (location.pathname.startsWith(addrReq1)) {
        isEdit = true;
        editId = location.pathname.slice(addrReq1.length);
        // console.log("length:" + addrReq1.length)
        // console.log("editId:" + editId)
    }
    return (
        <>
            <div>
                STATING
            </div>
            {isEdit ?
                <EmprendForm editId={id}></EmprendForm>
                :
                linkaddr === 'EmprendForm' ?
                    <EmprendForm></EmprendForm> :
                    <EmprendList></EmprendList>
            }
        </>
    );
}

export default CrudEmprend;
