import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import ChkWindowSize from '../components/ChkWindowSize';
import { getWindowSize } from './../utils/checkWindow';
import bmcportada from './../assets/images/img_business_model_canvas.jpg';
import { motion } from 'framer-motion';
import { changeMenu } from '../redux/reducers/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import home_img01 from './../assets/images/home_img01s.png';
import estrategia from './../assets/icons/estrategia.png';
import calendario from './../assets/icons/calendario.png';
import support from './../assets/icons/support.png';
import tutorial from './../assets/icons/tutorial.png';
const Home = () => {
    const { auth } = useSelector(state => state.usuarios);
    const dispatch = useDispatch();
    /**Menu auth */
    useEffect(() => {
        if (auth)
            dispatch(changeMenu({ title: 'MENU_AUTH', empr_id: '' }))
        else
            dispatch(changeMenu({ title: 'MENU_UNAUTH', empr_id: '' }))
    }, [])
    /**fin Menu auth */
    const [windowSize, setWindowSize] = React.useState(getWindowSize());
    const clase1 = `md:h-full container flex items-center flex-row`;
    const clase2 = `md:h-full flex items-center flex-row`;
    //     los planes de negocios pueden ayudar a los empresarios a obtener financiamiento o atraer nuevos socios ya que los
    // inversionistas desean tener la confianza de que su inversión redituará el plan de negocios es el instrumento que se puede utilizar para convencer a
    // las partes interesadas que invertir en la empresa es una opción inteligente formatos de planes de negocio 

    // El plan de negocios sirve como mapa de ruta para estructurar operar y hacer crecer el negocio. 
    //                             Es una forma de considerar en detalle los elementos clave de un negocio. 
    // no hay forma correcta incorrecta de redactar un plan de negocios lo importante es que el plan satisfaga las necesidades.
    return (
        <>
            <div className="container mx-auto px-4 py-6 relative">
                <div className="flex flex-wrap -mx-4">
                    <div className="p-4 w-full lg:w-5/12">
                        <img src={home_img01} className="object-scale-down rounded-lg w-full" alt="..." />
                        <div className='flex justify-center'>
                            <Link to="/login" className='py-2 bg-redish hover:text-whitish hover:bg-rojo-dark rounded-xl font-bold font-krona px-4 text-md text-darkish'>
                                Inicio
                            </Link>
                        </div>
                    </div>

                    <div className="mx-auto p-4 w-full lg:w-6/12">
                        <h2 className="font-medium mb-1 text-primary-500 text-justify text-sm">Un plan de negocios es fundamental para todo emprendimiento</h2>
                        <h3 className="font-bold mb-2 text-4xl text-gray-800">Crea Tu Plan De Negocios</h3>
                        <p className="mb-6 text-justify">
                            Crea de manera rápida el plan de negocios para tu emprendimiento, cronogramas, presupuesto y mucho más.
                        </p>
                        <div className="flex flex-wrap -mx-3">
                            <div className="p-2 w-full sm:w-6/12">
                                <div className="bg-gray-100 p-6 text-center">
                                    {/* <h2 className="font-bold mb-2 text-4xl text-primary-500">150+</h2> */}
                                    <Link to="/login">
                                        <img src={estrategia} className="object-scale-down h-14 rounded-lg w-full" alt="..." />
                                        <h3 className="font-sans text-sm">Modelo De Negocios Canvas</h3>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-2 w-full sm:w-6/12">
                                <div className="bg-gray-100 p-6 text-center">
                                    {/* <h2 className="font-bold mb-2 text-4xl text-primary-500">100%</h2> */}
                                    <Link to="/login">
                                        <img src={calendario} className="object-scale-down h-14 rounded-lg w-full" alt="..." />
                                        <h3 className="font-sans">Cronogramas</h3>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-2 w-full sm:w-6/12">
                                <div className="bg-gray-100 p-6 text-center">
                                    {/* <h2 className="font-bold mb-2 text-4xl text-primary-500">270+</h2> */}
                                    <Link to="/login">
                                        <img src={tutorial} className="object-scale-down h-14 rounded-lg w-full" alt="..." />
                                        <h3 className="font-sans">Tutoriales</h3>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-2 w-full sm:w-6/12">
                                <div className="bg-gray-100 p-6 text-center">
                                    {/* <h2 className="font-bold mb-2 text-4xl text-primary-500">99%</h2> */}
                                    <Link to="/login">
                                        <img src={support} className="object-scale-down h-14 rounded-lg w-full" alt="..." />
                                        <h3 className="font-sans">Soporte</h3>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>




            {/* <ChkWindowSize setWindowSize={setWindowSize}></ChkWindowSize>
            <motion.div className={`${windowSize.innerWidth > 640 ? clase2 : clase1}`}
                initial={{ width: 0, opacity: 0 }} animate={{ width: "100%", opacity: 2 }} exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
            >





                <div className='rounded-3xl bg-naranja-fondo mx-2 my-2 px-12 py-16 w-full md:w-1/2 items-center md:h-full'>
                    <h1 className='font-krona text-lg mb-2 mt-10 md:mt-32'>
                        Crea tu Plan de Negocios
                    </h1>
                    <p className='text-sm mb-6'>
                        Crea de manera rápida el plan de negocios para tu emprendimiento, cronogramas, presupuesto y mucho más
                    </p>
                    <Link to="/login" className='py-2 bg-grayish hover:text-whitish hover:bg-rojo-dark rounded-xl font-bold font-krona px-4 text-md text-darkish'>
                        Inicio
                    </Link>
                    <p className='mb-32'></p>
                </div>

                {windowSize.innerWidth > 640 && <div className='mx-2 my-2 overflow-hidden rounded-3xl w-full md:w-1/2 md:h-full bg-fondoimghome'>
                    <img className='mx-auto object-fill h-full sm:object-scale-down' src={bmcportada} alt="Modelo de negocios canvas" />
                </div>}
            </motion.div> */}
        </>
    );
}

export default Home;
