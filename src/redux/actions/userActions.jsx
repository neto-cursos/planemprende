import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiAuth from '../../services/ApiAuth';

export const userLogin = createAsyncThunk('usuarios/login',  
  async (datos) => {
        const data=await ApiAuth().post('/auth/token',datos).then(response => {
        return response.data;
    });
    //.catch(error=>{console.log(error); return []})
    if(typeof(data)==='object'){
     if (data.hasOwnProperty('access_token'))
     {
      console.log("YAY");
     }else{console.log("NO YAY");}
    }else console.log("no es un objeto");
      // const token = data['access_token']?`Bearer ${data['access_token']}`:'';
      // sessionStorage.setItem('bearertoken',token);  
      return data
  }
)

export const checkLoggedIn = createAsyncThunk('usuarios/checkloggedin',  
  async (datos) => {
        const data=await ApiAuth().post('/auth/islogged',).then(response => {
        console.log("response userAction isLogged:")
        console.log(response);
        return response.data;
    })
      return data
  }
)

export const logOutSession = createAsyncThunk('usuarios/logOutSession',  
  async (datos) => {
        const data=await ApiAuth().post('/auth/logout',).then(response => {
        console.log("response userAction isLoggedOut:")
        console.log(response);
        return response.data;
    })
      return data
  }
)


export const registerUser = createAsyncThunk('usuarios/register',  
  async (datos) => {
        const data=await ApiAuth().post('/auth/registro',datos).then(response => {
        return response.data;
    });
      return data
  }
)
export const registerUser2 = createAsyncThunk(
  'user/register',
  async ({ firstName, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState()

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

