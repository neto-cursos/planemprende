export const menuPrincipal =
    [
        { id: 1, texto: 'Inicio', enlace: '/', icon: null, textoAlt:'',enable:false, },
        { id: 2, texto: 'Panel De Control', enlace: '/welcome', icon: null, textoAlt:'Panel De Control',enable:true, },
        { id: 3, texto: 'Registro Nuevo Emprendimiento', enlace: '/nuevoemprendimiento', icon: null, textoAlt:'Nuevo Emprendimiento',enable:true, },
        { id: 4, texto: 'Emprendimientos Registrados', enlace: '/misemprendimientos', icon: null, textoAlt:'Emprendimientos Registrados',enable:true, },
        { id: 5, texto: 'Cerrar Sesión', enlace: '/logout', icon: null, textoAlt:'',enable:false, },
    ];

export const menuPrincipalAuth =
    [
        { id: 1, texto: 'Inicio', enlace: '/', icon: null, textoAlt:'',enable:false, },
        { id: 2, texto: 'Panel De Control', enlace: '/welcome', icon: null, textoAlt:'Panel De Control',enable:true, },
        { id: 3, texto: 'Registro Nuevo Emprendimiento', enlace: '/nuevoemprendimiento', icon: null, textoAlt:'Nuevo Emprendimiento',enable:true, },
        { id: 4, texto: 'Emprendimientos Registrados', enlace: '/misemprendimientos', icon: null, textoAlt:'Emprendimientos Registrados',enable:true, },
        { id: 5, texto: 'Cerrar Sesión', enlace: '/logout', icon: null, textoAlt:'',enable:false, },
    ];

    export const menuPrincipalUnauth =
    [
        { id: 1, texto: 'Inicio', enlace: '/', icon: null,textoAlt:'',enable:true, },
        { id: 2, texto: 'Iniciar Sesión', enlace: '/welcome', icon: null,textoAlt:'',enable:false, },
        { id: 3, texto: 'Crear Cuenta', enlace: '/logout', icon: null,textoAlt:'',enable:false, },
        { id: 3, texto: 'Sobre Nosotros', enlace: '/sobrenosotros', icon: null,textoAlt:'',enable:true, },
        { id: 4, texto: 'Soporte', enlace: '/contacto', icon: null,textoAlt:'Soporte',enable:true, },
        
    ];

    export const menuEmprendimiento =
    [
        { id: 1, texto: 'Inicio', enlace: '/', icon: null,textoAlt:'',enable:true, },
        { id: 2, texto: 'Panel De Control', enlace: '/welcome', icon: null,textoAlt:'Panel De Control',enable:true, },
        { id: 3, texto: 'Modelo De Negocios', enlace: '/emprendimiento/:empr_id/bmc', icon: null,textoAlt:'Modelo De Negocios',enable:true, },
        { id: 4, texto: 'Cronograma', enlace: '/emprendimiento/:empr_id/cronograma', icon: null,textoAlt:'Cronograma',enable:true, },
        { id: 5, texto: 'Cerrar Sesión', enlace: '/logout', icon: null,textoAlt:'',enable:false, },
    ];

    export const menuCanva =
    [
        { id: 1, texto: 'Inicio', enlace: '/', icon: null,textoAlt:'',enable:true, },
        { id: 2, texto: 'Panel De Control', enlace: '/welcome', icon: null,textoAlt:'Panel De Control',enable:true, },
        { id: 3, texto: 'Asistente Canva', enlace: '/misemprendimientos/fill/:empr_id/:modu_nume/:bmc_type', icon: null,textoAlt:'Asistente Canva',enable:false, },
        { id: 4, texto: 'Guardar Canva', enlace: 'null', icon: null,textoAlt:'',enable:false, funcion:'updateTable'},
        { id: 5, texto: 'Descargar Canva', enlace: 'null', icon: null,textoAlt:'',enable:false, funcion:'convertToImg'},
        { id: 6, texto: 'Cerrar Sesión', enlace: '/logout', icon: null,textoAlt:'',enable:false, },
    ];
    export const menuCanvaAsistente =
    [
        { id: 1, texto: 'Inicio', enlace: '/', icon: null,textoAlt:'',enable:true, },
        { id: 2, texto: 'Panel De Control', enlace: '/welcome', icon: null,textoAlt:'Panel De Control',enable:true, },
        { id: 3, texto: 'Modelo De Negocios', enlace: '/emprendimiento/:empr_id/bmc', icon: null,textoAlt:'Modelo De Negocios',enable:true, },
        { id: 4, texto: 'Guardar Respuestas', enlace: 'null', icon: null,textoAlt:'',enable:false,funcion:'saveAnswers' },
        { id: 5, texto: 'Cerrar Sesión', enlace: '/logout', icon: null,textoAlt:'',enable:false, },
    ];

    export const menuCronograma =
    [
        { id: 1, texto: 'Inicio', enlace: '/', icon: null,textoAlt:'',enable:true, },
        { id: 2, texto: 'Panel De Control', enlace: '/welcome', icon: null,textoAlt:'Panel De Control',enable:true, },
        { id: 3, texto: 'Nueva Actividad', enlace: 'null', icon: null,textoAlt:'',enable:false, },
        { id: 4, texto: 'Guardar Cronograma', enlace: 'null', icon: null,textoAlt:'',enable:false, },
        { id: 5, texto: 'Descargar Cronograma', enlace: 'null', icon: null,textoAlt:'',enable:false, },
        { id: 6, texto: 'Cerrar Sesión', enlace: '/logout', icon: null,textoAlt:'',enable:false, },
    ];
