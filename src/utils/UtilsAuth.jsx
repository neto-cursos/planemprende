import Cookies from 'js-cookie'


export const isLoggedIn = (reqCookies = null) => {
    //it's short way to cast a variable to be a boolean (true or false) value
    //!name - is inverted boolean, like NOT, name is not empty, so !name would be false
    //!!name - convert string to boolean, name is not empty, so !!name is true
    return !!Cookies.get('ticket_management_is_user_logged_in')
}


export const OpLogIn = () => {

    Cookies.set('ticket_management_is_user_logged_in', true, { expires: 86400, sameSite: 'lax' })
    console.log("Se creó el cookie");
}

export const logOut = () => {
    if (typeof window !== 'undefined') {

        Cookies.remove('ticket_management_is_user_logged_in', { expires: 86400, sameSite: 'lax' })
        console.log("logout exitoso")

    }
}