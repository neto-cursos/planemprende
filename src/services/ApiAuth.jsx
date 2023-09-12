import axios from 'axios';

const ApiAuth = () => {
    //window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    let token = '';
    token = sessionStorage.getItem('bearertoken') ? sessionStorage.getItem('bearertoken') : '';
    // console.log('token: ' + token);

    const api = axios.create({
        // baseURL: 'http://localhost:8000/api',
        // baseURL: 'http://192.168.1.211:8000/api',
        // baseURL: 'http://192.168.3.13:8000/api',
        // baseURL: 'http://35.173.242.168/public/api',
        baseURL: 'https://educarparalavida.org.bo/be-planemprende/public/api',
        // baseURL: 'api',
        withCredentials: true,
        headers: {
            Authorization: `${token}`,
            //'X-Requested-With': XMLHttpRequest
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })
    // api.interceptors.response.use(
    //     undefined,
    //     (err) => {
    //         // [ ... ]
    //         const config = err.config;
    //         // config.headers is possibly undefined
    //         config.headers = JSON.parse(JSON.stringify(config.headers || {})) as RawAxiosRequestHeaders;
    //         // [ ... ]
    //         return axiosInstance(config);
    //     },
    // );
    api.interceptors.request.use((config) => {
        // Do something before request is sent
        return config;
    }, (error) => {
        // Do something with request error
        console.log("error request axios: ");
        console.log(error);
        return Promise.reject(error);
    });
    api.interceptors.response.use(response => {
        // console.log("response: ");
        // console.log(response);
        return response;
    }, async error => {
        if (error.response) {
            if (error.response.status === 500) {
                console.log(error.response);
                //logOut()
                return Promise.reject(error)
            }
            if (error.response.status === 405) {
                console.log(error.response);
                //logOut()
                return Promise.reject(error)
            }
            if (error.response.status === 404) {
                console.log(error.response);
                console.log("Servidor no disponible 404")
                //logOut()
                return Promise.reject(error)
                // return Promise.resolve(error.response)
            }
            if (error.response.status === 401) {
                console.log(error.response);
                console.log("BUUU")
                //logOut()
                return Promise.reject(error)
            }
            if (error.response.status === 0) {
                // server unavailable
                console.log(error.response);
                console.log("BUUU3")
                return Promise.reject(new Error('Server unavailable'));
            }
            if (error.response && 422 === error.response.status) {
                console.log(error.response);
                console.log("BUUU2")
                // return Promise.reject(() => error.response.data?.map(t => new Error(t)))
                return Promise.reject(error.response.data);
            }
            if (error.response && 419 === error.response.status) {
                //window.location.reload()
                console.log("error 419 mismatch or expired token")
            }
            console.log("errorResponse entro");

        }
        // else{return Promise.reject(new Error('Server unavailable'));}
        // console.log(error);
        return Promise.reject(error)
    })
    return (api);
}


export default ApiAuth;