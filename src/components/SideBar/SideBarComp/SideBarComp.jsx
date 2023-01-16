import React, { useState } from "react";
import {
  Children,
  SidebarContainer,
  SidebarWrapper,
  SidebarLogoWrapper,
  SidebarLogo,
  SidebarBrand,
  SidebarToggler,
} from "../SideBar.Style";

//import BrandLogo from "./menuLogo.svg";
import BrandLogo from "./../../../assets/icons/MenuLogo";
import SideBarItems from "../SideBarItems";
//mobile_view is true if innerwidth is <468 and false if >=46


export default function SideBarComp({displaySidebar,setDisplaySidebar, children}) {
  //state displaysidebar true if is mobileview or false if is not mobile screen
  
  //Function handleSidebarDisplay check if screen > 468 to set true or false
  const handleSidebarDisplay = (e) => {
    e.preventDefault();
    if (window.innerWidth > 468) {
      setDisplaySidebar(!displaySidebar);
    } else {
      setDisplaySidebar(false);
    }
  };

  return (
    <React.Fragment>
      <SidebarContainer displaySidebar={displaySidebar}>
        <SidebarWrapper>
          <SidebarLogoWrapper displaySidebar={displaySidebar}>
            <SidebarLogo href="#">
              <span className="app-brand-logo demo">
                <BrandLogo color="#b72a2a"></BrandLogo>
              </span>
              <SidebarBrand
                displaySidebar={displaySidebar}
                className="app__brand__text"
              >
                Menú
              </SidebarBrand>
            </SidebarLogo>
            <SidebarToggler
              displaySidebar={displaySidebar}
              onClick={handleSidebarDisplay}
            >
              <div className="outer__circle">
                <div className="inner__circle" />
              </div>
            </SidebarToggler>
          </SidebarLogoWrapper>
          <SideBarItems displaySidebar={displaySidebar} />
        </SidebarWrapper>
      </SidebarContainer>
      {/* <Children displaySidebar={displaySidebar}>{children}</Children> */}
    </React.Fragment>
  );
}
