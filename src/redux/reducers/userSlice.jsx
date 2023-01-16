import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid';
import {
    checkLoggedIn, getUserDetails, logOutSession,
    registerUser, userLogin
} from '../actions/userActions';
import { logOut, OpLogIn } from './../../utils/UtilsAuth'


const initialState = {
    loading: false,
    successLogin: false,
    successRegister:false,
    successLogout:false,
    userInfo: {
        user_name: '',
        user_id: '',
        user_apellido: '',
        access_token: '',
        access_type: ''
    },
    userToken: null,
    auth: false,
    status: 'idle',//idle|loading|succeeded|failed
    error: null,
    errores: [{ id: '', msg: '' }],
    //success: authValue,
}


const userSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: { 
        reset:(state,action) => {
            state=initialState;
            return state;
        },
        changeSuccessRegister: (state, action) => {
            state.successRegister = action.payload;
            return state;
        },
        changeSuccessLogOut: (state, action) => {
            state.successLogout = action.payload;
            return state;
        },
        changeSuccessLogin: (state, action) => {
            state.successLogin = action.payload;
            return state;
        },
        logout: (state) => {
            sessionStorage.removeItem('bearerToken');
            state = initialState;
            logOut();
            return state;
        },
        updateLoading: (state, action) => {
            state.loading = action.payload;
            return state;
        },
        updateAuth: (state, action) => {
            // console.log("update Auth Action.payload");
            // console.log(typeof(action.payload));
            state.auth = action.payload;
            if(action.payload===true){
                // console.log(sessionStorage.getItem('usr_dt'))
                sessionStorage.setItem('auth', state.auth);
            }
            
            return state;
        },
        setDataFromLocalSave: {
            reducer(state, action) {
                const userInfo = sessionStorage.getItem('usr_dt') ?
                    JSON.parse(sessionStorage.getItem('usr_dt')) :
                    { user_name: '', user_id: '', user_apellido: '', access_token: '', token_type: '' };
                state = {
                    ...state, userInfo: {
                        ...state.userInfo,
                        user_name: userInfo.user_name,
                        user_id: userInfo.user_id,
                        user_apellido: userInfo.user_apellido,
                        access_token: userInfo.access_token,
                        access_type: userInfo.token_type
                    }, auth: sessionStorage.getItem('auth') ? JSON.parse(sessionStorage.getItem('auth')) : false,
                };
                // console.log("State CHANGED");
                // console.log(state);
                // console.log("CHANGED FINISHED");
                return state;
            }
        }
    },
    extraReducers(builder) {
        // login user
        builder
            .addCase(userLogin.pending, (state, action) => {
                // console.log('USERLOGIN PENDING');
                state.loading = true;
                state.error = null;
                state.auth = false;
                state.errores = [{}];
                sessionStorage.removeItem('usr_dt');
                sessionStorage.setItem('auth', state.auth);

            })
            .addCase(userLogin.fulfilled, (state, action) => {
                // console.log('USERLOGIN FULLFLLLED');
                state = {
                    ...state,
                    loading: false,
                    successLogin: true,
                    userInfo: {
                        user_name: action.payload.user_name,
                        user_id: action.payload.user_id,
                        user_apellido: action.payload.user_apellido,
                        access_token: action.payload.access_token,
                        access_type: action.payload.token_type
                    },
                    userToken: `Bearer ${action.payload['access_token']}`,
                    // auth : true,
                    errores: [{}]
                }
                sessionStorage.setItem('usr_dt', JSON.stringify(state.userInfo));
                
                OpLogIn();
                return state;
            })
            .addCase(userLogin.rejected, (state, action) => {
                // console.log('USERLOGIN REJECTEDS');
                // console.log(action);
                sessionStorage.removeItem('usr_dt');
                sessionStorage.setItem('auth', state.auth);
                // console.log('STATEERROR')
                if (action.error)
                    // console.log(action);
                if (action.error.message === 'Request failed with status code 401') {
                    state = {
                        ...state, successLogin: false, loading: false,
                        error: action, auth: false,
                        errores: [{ id: nanoid(), msg: 'usuario o password incorrecto' }]
                    }
                } else {
                    state = {
                        ...state, successLogin: false, loading: false,
                        error: action, auth: false,
                    }
                }
                return state;

            })
            // register user
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.auth = false;
                state.errores = [{}];
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.successRegister = true // registration successful
                // console.log('USERLOGIN FULLFLLLED');
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                // console.log('USERLOGIN REJECTEDS');
                // console.log(action);
                state.successRegister = false;
                state.loading = false;
                state.error = action.error;
                // console.log('STATEERROR')
                if (action.error)
                    // console.log(action);
                if (action.error.message)
                    state.errores = [{ id: nanoid(), msg: action.error.message }]


            })
            // get user details
            .addCase(getUserDetails.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getUserDetails.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload
            })
            .addCase(getUserDetails.rejected, (state, { payload }) => {
                state.loading = false
            })
            // check if user is loggedIn
            .addCase(checkLoggedIn.pending, (state, action) => {
                state.loading = true
            })
            .addCase(checkLoggedIn.fulfilled, (state, { payload }) => {
                state.loading = false
                state.auth = payload.user === 'auth' ? true : false;
                state.user_id = payload.user_id != null ? payload.user_id : '';

            })
            .addCase(checkLoggedIn.rejected, (state, { payload }) => {
                state.loading = false
                state = {
                    ...state,
                    loading: false,
                    userInfo: { user_name: '', user_id: '', user_apellido: '', access_token: '', access_type: '' },
                    userToken: null,
                    error: null,
                    errores: [{ id: '', msg: '' }],
                    auth: false
                };
                return state;
            })
            //check if user is loggout
            .addCase(logOutSession.pending, (state, action) => {
                state.loading = true
                // console.log("LOGOUT SESSION PENDIENTE");
            })
            .addCase(logOutSession.fulfilled, (state, { payload }) => {
                // console.log("LOGOUT SESSION EXITOSA");
                state = {
                    ...state,
                    loading: false,
                    userInfo: { user_name: '', user_id: '', user_apellido: '', access_token: '', access_type: '' },
                    userToken: null,
                    error: null,
                    errores: [{ id: '', msg: '' }],
                    auth: false
                };
                // console.log("USERSLICE STATE");
                // console.log(state);
                return state;
            })
            .addCase(logOutSession.rejected, (state, { payload }) => {
                state = { ...state, loading: false, auth: false };
                // console.log("LOGOUT SESSION FALLÍDA");
                return state;
            })
    },

});

export const { logout, updateLoading, setDataFromLocalSave, updateAuth, 
    changeSuccessLogin,changeSuccessRegister,changeSuccessLogout,reset } = userSlice.actions
export const getauth = (state) => state.usuarios.auth;
export default userSlice.reducer;
