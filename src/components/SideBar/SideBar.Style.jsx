import styled from "styled-components";

// Children Component
export const Children = styled.div`
  width: 100vw;
  //height: 100%;
  position:relative;
  padding-left: ${({ displaySidebar,sidebar }) => {
    if(displaySidebar && sidebar) return "15rem" 
    else if(!displaySidebar && sidebar)return  "6rem"
    else return "0rem"
    }
};
  //position:${({ displaySidebar }) => (displaySidebar ? "absolute" : "static")};
  //left: ${({ displaySidebar }) => (displaySidebar ? "15rem" : "5rem")};
  @media (max-width: 468px) {
    padding-left: ${({ displaySidebar,sidebar }) => {
    if(displaySidebar && sidebar) return "0rem" 
    else if(!displaySidebar && sidebar)return  "0rem"
    else return "0rem"
    }}
   
  }
`;
//div siderbarwrapper w-max h-max flex direction column font-size 0.9rem
export const SidebarWrapper = styled.div`
  width: 100%;
  //height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
`;

export const SidebarLogoWrapper = styled.div`
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: ${({ displaySidebar }) =>
    displaySidebar ? "space-between" : "center"};
  align-items: center;

  @media (max-width: 468px) {
    justify-content: center;
  }
`;
//a enlaces
export const SidebarLogo = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 468px) {
    display: none;
  }
`;

//spans
export const SidebarBrand = styled.span`
  display: ${({ displaySidebar }) => (displaySidebar ? "block" : "none")};
`;
//boton
export const SidebarToggler = styled.button`
  cursor: pointer;
  display: ${({ displaySidebar }) => (displaySidebar ? "block" : "none")};

  @media (max-width: 468px) {
    display: block;
  }
`;

// SidebarItem styles lists
export const ItemsList = styled.ul`
  list-style: none;
`;
//elements of the list
export const ItemContainer = styled.li`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.25rem;
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    background: #eaeced;
  }

  &.active {
    background-color: #dbe4f3;
  }
`;
//div items
export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #7c7788;
`;
//spans Itemname
export const ItemName = styled.span`
  margin-left: ${({ displaySidebar }) => (displaySidebar ? "0.5rem" : "0")};
  display: ${({ displaySidebar }) => (displaySidebar ? "block" : "none")};
  text-transform: capitalize;
`;

// Sidebar Container div position absolute, left 0, width:15rem or 5 rem
// boxshadow 
export const SidebarContainer = styled.div`
  z-index:50;
  position: absolute;
  left: 0;
  top:4rem;
  width: ${({ displaySidebar }) => (displaySidebar ? "15rem" : "5rem")};
  height: auto;
  padding: 0.75rem;
  background: #f3f4f4;
  transition: width 350ms ease;
  border-right: 1px solid #d4d8dd;
  overflow-x: hidden;
  ${({ displaySidebar }) =>
    displaySidebar && "box-shadow: 8px 0px 12px 0px rgba(0,0,0,0.1)"};

  ${ItemWrapper} {
    justify-content: ${({ displaySidebar }) => !displaySidebar && "center"};
  }

  &:hover {
    ${({ displaySidebar }) =>
      !displaySidebar && "box-shadow: 8px 0px 12px 0px rgba(0,0,0,0.1)"};

    @media (min-width: 468px) {
      width: ${({ displaySidebar }) => !displaySidebar && "15rem"};

      ${SidebarLogoWrapper} {
        justify-content: ${({ displaySidebar }) =>
          !displaySidebar && "space-between"};
      }

      ${SidebarBrand} {
        display: ${({ displaySidebar }) => !displaySidebar && "block"};
      }

      ${SidebarToggler} {
        display: ${({ displaySidebar }) => !displaySidebar && "block"};
      }

      ${ItemWrapper} {
        justify-content: ${({ displaySidebar }) =>
          !displaySidebar && "flex-start"};
      }

      ${ItemName} {
        display: ${({ displaySidebar }) => !displaySidebar && "block"};
        margin-left: ${({ displaySidebar }) => !displaySidebar && "0.5rem"};
      }
    }
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 3px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #eaeced;

    &:hover {
      background: #d5e0f3;
    }
  }

  @media (max-width: 468px) {
    width: 5rem;
  }
`;
