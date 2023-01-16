
export function getTime(){
    const today = new Date();
    // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const horaActual={
        hora:today.getHours(),
        minutos:today.getMinutes(),
        segundos:today.getSeconds(),
        formato:today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
    }
    return horaActual;
}

export function Salute(){
    const horaActual=getTime();
    if (horaActual.hora<12 && horaActual.hora>4){
        return "Buenos Días"
    }else if(horaActual.hora>=12 && horaActual.hora<19){
        return "Buenas Tardes"
    }else{return "Buenas Noches"}
}