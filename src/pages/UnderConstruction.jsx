import React from 'react'

const UnderConstruction = () => {
    return (
        <div id="divUC" className="container mx-auto">
            <div className="flex flex-col h-screen bg-center bg-cover bg-no-repeat">
                <div className="grid place-items-start text-left md:place-items-center md:text-center w-full mx-auto p-10 my-20 my-auto space-y-5 cursor-pointer">
                    

                    <h1 className="title animate">
                        Esta funcionalidad estará <br />
                        Pronto de retorno
                    </h1>

                    <p className="lead animate">Gracias por tu comprensión</p>
                </div>
            </div>
        </div>

    )
}

export default UnderConstruction