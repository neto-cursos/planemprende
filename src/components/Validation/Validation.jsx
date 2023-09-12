import React from 'react'

const Validation = ({schema,data,setErrores}) => {
    // const [errores, setErrores] = useState(null);
    
    schema.validate(data, { abortEarly: false }).then(function () {
        setErrores(erroresAux);
        setDataSubmitted(data);
    }).catch(function (err) {
        err.inner.forEach(e => {
            erroresAux.push({
                errorKey: e.path,
                errorValue: data[e.path],
                errorMsg: e.errors,
                errorExtra: '',
            })
        });
        setErrores(erroresAux);
    });
  return (
    <div>Validation</div>
  )
}

export default Validation