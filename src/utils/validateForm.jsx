export function validateForm(schema,data,setErrores){
    let erroresAux = [];
    schema.validate(data, { abortEarly: false }).then(function () {
        setErrores(erroresAux);
        //setDataSubmitted(data);
    }).catch(function (err) {
        console.log(err);
        err.inner.forEach(e => {
            erroresAux.push({
                errorKey: e.path,
                errorValue: data[e.path],
                errorMsg: e.errors,
                errorExtra: '',
            })
        });
        console.log(erroresAux);
        setErrores(erroresAux);
    });
}