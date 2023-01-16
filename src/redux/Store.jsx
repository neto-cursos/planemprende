import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import emprendReducer from './reducers/emprendSlice'
import respuestaReducer from './reducers/respuestaSlice'
import respuestasAsistidasReducer from './reducers/respuestaAsistSlice';
import preguntaReducer from './reducers/preguntaSlice';
import canvasReducer from './reducers/canvasSlice';
import sugerenciasReducer from './reducers/sugerenciasSlice';
import cronogramasReducer from './reducers/cronogramaSlice';
import menuReducer from './reducers/menuSlice';
export const Store = configureStore({
    reducer:{
        emprendimientos:emprendReducer,
        respuestas:respuestaReducer,
        usuarios:userSlice,
        respuestasAsistidas:respuestasAsistidasReducer,
        preguntas:preguntaReducer,
        canvas:canvasReducer,
        sugerencias:sugerenciasReducer,
        cronogramas:cronogramasReducer,
        menus:menuReducer,
    }
    
})
