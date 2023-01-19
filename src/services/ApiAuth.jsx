import axios from 'axios';

const ApiAuth = () => {
    //window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    let token = '';
    token = sessionStorage.getItem('bearertoken') ? sessionStorage.getItem('bearertoken') : '';
    // console.log('token: ' + token);

    const api = axios.create({
        // baseURL: 'http://localhost:8000/api',
        // baseURL: 'http://18.212.164.242/public/api',
        baseURL: 'api',
        withCredentials: true,
        headers: {
            Authorization: `${token}`,
            'X-Requested-With': XMLHttpRequest
        },
    })
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
                console.log(error.response)
                //logOut()
                return Promise.reject(error)
            }
            if (error.response.status === 405) {
                console.log(error.response)
                //logOut()
                return Promise.reject(error)
            }
            if (error.response.status === 404) {
                console.log("Servidor no disponible")
                //logOut()
                return Promise.reject(error)
            }
            if (error.response.status === 401) {
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

        }
        // else{return Promise.reject(new Error('Server unavailable'));}
        return Promise.reject(error)
    })
    return (api);
}


export default ApiAuth;