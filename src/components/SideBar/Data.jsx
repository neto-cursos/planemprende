import {
    HomeIcon,
    LayoutIcon,
    CalendarIcon,
    InvoiceIcon,
    UserIcon,
    RolesIcon,
    PagesIcon,
    AuthIcon,
    WizardIcon,
    ModalIcon,
    IdeasIcon,
    UserIcon2,
    LogOutIcon,
  } from "./Icons";
  
  export const SIDEBAR_DATA = [
    {
      id: 1,
      name: "Panel Control",
      path: "welcome",
      icon: <UserIcon2 />,
    },
    {
      id: 2,
      name: "Nuevo Emprendimiento",
      path: "nuevoemprendimiento",
      icon: <WizardIcon />,
    },
    {
      id: 3,
      name: "Mis Emprendimientos",
      path: "misemprendimientos",
      icon: <IdeasIcon />,
    },
    {
      id: 4,
      name: "Salir",
      path: "Logout",
      icon: <LogOutIcon />,
    },    
  ];
  