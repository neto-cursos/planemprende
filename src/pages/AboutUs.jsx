import React from 'react'

const AboutUs = () => {
    return (
        <section className="bg-white ">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md dark:bg-gray-900 rounded-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Sobre Nosotros</h2>
                <p className="mb-8 lg:mb-3 font-light text-justify text-gray-500 dark:text-gray-400 sm:text-xl"><span className='font-bold text-[1.2rem]'>Mis emprendimientos</span> es una aplicación de la fundación Educar Para La Vida que tiene como objetivo ayudar a pequeños emprendedores a realizar los primeros pasos en su plan de negocios.</p>
                <p className="mb-8 lg:mb-3 font-light text-justify text-gray-500 dark:text-gray-400 sm:text-xl">
                La aplicación web cuenta con dos herramientas para el emprendedor, una de ellas es el lienzo de modelo de negocios canvas y otra el cronograma de actividades. Las tecnologías usadas para el desarrollo de esta aplicación son React.js (front-end) una de las librerías más populares en la actualidad y laravel para garantizar la seguridad y ser el proveedor de las APIs en el backend.</p>

                <p className="mb-8 lg:mb-3 font-light text-justify text-gray-500 dark:text-gray-400 sm:text-xl">
                Esta aplicación fue desarrollada en el marco de los convenios que tiene la fundación Educar Para La Vida y la universidad Franz Tamayo para poder aplicar lo aprendido en las aulas y transformarlo en herramientas útiles para la sociedad.</p>

                <p className="mb-8 lg:mb-3 font-light text-justify text-gray-500 dark:text-gray-400 sm:text-xl">
                La fundación Educar para la vida, es una organización que busca mejorar la calidad de vida y convivencia social de personas, especialmente niños, niñas, adolescentes, jóvenes, y mujeres altamente vulnerables y/o con discapacidad, procurando un equilibrio en sus aspectos emocionales, aprobatorios, corporales, de aprendizaje, y protección de su medioambiente.
                </p>
            </div>
        </section>
    )
}

export default AboutUs