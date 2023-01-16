import { setLocale } from "yup";

// console.log("setLocale");

setLocale({
    mixed:{
        required:"ERRROS"
    },
    string:{
        default:'nooo q hiciste',
        required:'Este campo es requerido',
    },
    number: {
        min: 'Deve ser maior que ${min}',
    },
});