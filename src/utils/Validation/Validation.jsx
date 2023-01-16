import React from 'react';
import * as yup from 'yup';
export const getSchema = (key) => {
   
    let schema;
    switch (key) {
        case 'name':
            schema=yup.object().shape({
                name: yup.string().required(),
            });
            break;
        case 'responsable':
            schema=yup.object().shape({
                responsable: yup.string().required(),
            });
            break;
        case 'unidad':
            schema=yup.object().shape({
                unidad: yup.string().required(),
            });
            break;
        case 'cantidad':
            schema=yup.object().shape({
                cantidad: yup.number().min(0),
            });
            break;
        case 'costounitario':
            schema=yup.object().shape({
                costounitario: yup.number().min(0),
            });
            break;
        default:
            schema=yup.object();
            break;
    }
    return schema;
}

// schema
    //         .isValid(
    //             data
    //         )
    //         .then(function (valid,errors) {
    //             console.log(valid); // => true
    //             console.log(errors);
    //         })

    // schema.isValid(data).then(function (valid) {
        //     console.log(valid); // => true
        //   });
        //dispatch(addCronograma(task));
        // dispatch();
        // const err=data.map(task=>{
        //     schema.validate(task)
        // })

        // schema.validate({
        //     name:data.name,
        //     responsable:data.responsable,
        //     cantidad:data.cantidad,
        //     costounitario:data.costounitario,
        // },{abortEarly:false}).catch(function(err){
        //     console.log("ERRORES:");
        //     console.log(err.errors);
        // })