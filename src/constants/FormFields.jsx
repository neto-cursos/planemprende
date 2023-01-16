export const loginFields=[
    {
        labelText:"Correo Electronico",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"ingrese el email con el que registro su cuenta",
        defaultValue:"",
        msgError:"Debe ingresar su correo electrónico",
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"ingrese su Password",
        defaultValue:"",
        msgError:"Debe ingresar su correo electrónico",   
    }
]

/*{
    labelText:"Confirmar Password",
    labelFor:"confirm-password",
    id:"confirm-password",
    name:"confirm-password",
    type:"password",
    autoComplete:"confirm-password",
    isRequired:true,
    placeholder:"Ingrese nuevamente su Password"   
},*/
export const signupFields=[
    {
        labelText:"Nombre",
        labelFor:"name",
        id:"name",
        name:"name",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Su nombre(s)"   
    },
    {
        labelText:"Apellido(s)",
        labelFor:"apellido",
        id:"apellido",
        name:"apellido",
        type:"text",
        autoComplete:"apellido paterno",
        isRequired:true,
        placeholder:"Ingrese su apellido paterno"   
    },
    {
        labelText:"Email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"su correo electrónico"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Su Password"   
    }    
]

export const emprendimientoFields=[
    {
        labelText:"Nombre De Emprendimiento",
        labelFor:"empr_nomb",
        id:"empr_nomb",
        name:"empr_nomb",
        type:"text",
        autoComplete:"emprendimiento",
        isRequired:false,
        placeholder:"nombre de su emprendimiento"   
    }
]
