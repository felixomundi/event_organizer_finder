import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_URL = `http://192.168.171.110:5000/api/v1/users/` 

const config = {
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  }
}


const token_value = async() => {
  try {
    return await AsyncStorage.getItem('token')
  } catch (error) {
    
  }
}

const USER = async () => {
  try {
    return await JSON.parse(AsyncStorage.getItem('user'));
  } catch (error) {
    
  }
}
const token = async() => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    
  }
}


const initialState = { 
  user: USER ? USER : {},
  token: token() ? token() : '',
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",

}


// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    let token;
    const response = await axios.post(API_URL + 'login', user, config);    
    console.log(response.data);
    if (response.status == 200) {
      const data = JSON.stringify(response.data.user_data);
      token = JSON.stringify(response.data.token)
      // await AsyncStorage.removeItem('user');
      // await AsyncStorage.setItem('user', data)
      await AsyncStorage.removeItem('token');
      // await AsyncStorage.setItem('token', token);
    }  
    return response.data;
  } catch (error) {        
    // const message = error.response.data;
    // return thunkAPI.rejectWithValue(message)
    console.log(error);
  }
})  

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await AsyncStorage.removeItem('user')
  } catch (error) {
    console.log(error);
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
   
  },
  extraReducers: (builder) => {
    builder     
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false      
        // state.user = action.payload.user_data
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false     
        // state.user = null
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false      
        // state.user = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        
      })
       
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer