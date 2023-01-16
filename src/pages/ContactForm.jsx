import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // Function that displays a success toast on bottom right of the page when form submission is successful
  const toastifySuccess = () => {
    toast('Mensaje Enviado!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast'
    });
  };

  const toastifyError = () => {
    toast('El Mensaje No Fue Enviado!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback error',
      toastId: 'notifyToast'
    });
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    const { name, email, subject, message } = data;
    try {
      const templateParams = {
        name,
        email,
        subject,
        message
      };

      await emailjs.send(
        'service_asfscbm', 'template_imn0nyr',
        // process.env.REACT_APP_SERVICE_ID,
        // process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        // process.env.REACT_APP_USER_ID
        '5DoohRQXbzHpxhwUI'
      );

      reset();
      toastifySuccess();
    } catch (e) {
      toastifyError();
      console.log(e);
    }
  };

  return (

    <section className="bg-white ">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md dark:bg-gray-900 rounded-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contáctanos</h2>
      <p className="mb-8 lg:mb-16 font-light text-justify text-gray-500 dark:text-gray-400 sm:text-xl">¿Encontró algún problema?, ¿Quiere que implementemos una nueva funcionalidad?, ¿Quiere reportarnos su experiencia con las herramientas provistas? o simplemente necesita contactarnos, escribanos por favor.</p>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
              <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre Completo</label>
              <input type="name" id="name" {...register('name', {
                        required: { value: true, message: 'Ingrese su nombre, por favor' },
                        maxLength: {
                          value: 30,
                          message: 'Por favor no use más de 30 carácteres'
                        }
                      })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Nombre(s) y Apellido(s)" required/>
              {errors.name && <span className='text-rojo-dark italic'>{errors.name.message}</span>}
          </div>
          <div>
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Su Correo Electrónico</label>
              <input type="email" id="email" {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                      })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="su correo electrónico" required />
                {errors.email && (
                      <span className='text-rojo-dark italic'>Por favor ingrese un email válido</span>
                    )}
          </div>
          <div>
              <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Asunto</label>
              <input type="text" id="subject" {...register('subject', {
                        required: { value: true, message: 'Por favor ingrese el asunto' },
                        maxLength: {
                          value: 75,
                          message: 'El asunto no puede exceder los 75 carácteres'
                        }
                      })}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="dejenos saber como podemos ayudarlos" required />
                {errors.subject && (
                      <span className='text-rojo-dark italic'>{errors.subject.message}</span>
                    )}
          </div>
          <div className="sm:col-span-2">
              <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Su mensaje</label>
              <textarea id="message" rows="6" {...register('message', {
                        required: true
                      })}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="deje su comentario o mensaje..."></textarea>
              {errors.message && <span className='text-rojo-dark italic'>Por favor ingrese su mensaje</span>}
          </div>
          <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-redish sm:w-fit hover:bg-rojo-light focus:ring-4 focus:outline-none focus:ring-offset-rojo-dark dark:bg-redish dark:hover:bg-rojo-light dark:focus:ring-rojo-dark">Enviar Mensaje</button>
      </form>
  </div>
  <ToastContainer />
</section>

  );
};

export default ContactForm;