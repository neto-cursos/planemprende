import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid';
import { menuCanva,menuCanvaAsistente, menuCronograma, menuEmprendimiento, menuPrincipalAuth, menuPrincipalUnauth } from '../../constants/MenuSideBar';
const initialState = {
    funcName:'',
    menu:[
    { id: 1, texto: 'Inicio', enlace: '/', icon: null },
    { id: 2, texto: 'Iniciar Sesión', enlace: "/login", icon: null },
    { id: 3, texto: 'Crear Cuenta', enlace: "/signup", icon: null },
    { id: 4, texto: 'Soporte', enlace: '/soporte', icon: null },
    ]
}

const menuSlice = createSlice({
    name: 'menus',
    initialState,
    reducers: {
        asignFunctionName: (state, action) => {
            state.funcName = action.payload;
            return state;
        },
        reset: (state, action) => {
            state = initialState;
            return state;
        },
        changeMenu: (state, action) => {
            switch (action.payload.title) {
                case 'MENU_UNAUTH':
                    state.menu = menuPrincipalUnauth;
                    break;
                case 'MENU_AUTH':
                    state.menu = menuPrincipalAuth;
                    break;
                case 'MENU_EMPREND':
                    menuEmprendimiento.map(e => {
                        // let text = document.getElementById("demo").innerHTML; 
                        // let result = text.replace(/blue|house|car/gi, function (x) {
                        //   return x.toUpperCase();
                        // });    
                        if (e.enlace.includes(":empr_id"))
                            e.enlace = e.enlace.replace(":empr_id", String(action.payload.empr_id))

                    })
                    state.menu = menuEmprendimiento;
                    break;
                case 'MENU_CANVAS':
                    menuCanva.map(e => {
                        if (e.texto === 'Asistente Canva') {
                            if (e.enlace.includes(":empr_id") && e.enlace.includes(":modu_nume") && e.enlace.includes(":bmc_type")) {
                                e.enlace = e.enlace.replace(":empr_id", String(action.payload.empr_id));
                                e.enlace = e.enlace.replace(":modu_nume", String(action.payload.modu_nume));
                                e.enlace = e.enlace.replace(":bmc_type", String(action.payload.bmc_type));
                            }
                        }
                        
                    })
                    state.menu = menuCanva;
                    break;
                    case 'MENU_CANVAS_ASISTENTE':
                        menuCanvaAsistente.map(e => {   
                            if (e.enlace.includes(":empr_id"))
                                e.enlace = e.enlace.replace(":empr_id", String(action.payload.empr_id))
    
                        })
                        state.menu = menuCanvaAsistente;
                        break;
                case 'MENU_CRONOS':
                    state.menu = menuCronograma;
                    // console.log("YAY te quiero mucho")
                    // console.log(menuCronograma);
                    break;
                default:

                    break;
            }
            return state;
        },

    },
    extraReducers(builder) {

    },

});

export const { changeMenu, reset,asignFunctionName } = menuSlice.actions

export default menuSlice.reducer;
