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


const user = async () => {
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
  user: user() ? user() : null,
  token: token() ? token() : null,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",

}


// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {    
    const response = await axios.post(API_URL + 'login', user, config); 
    if (response.status == 200) {     
      await AsyncStorage.removeItem('user');
      await AsyncStorage.setItem('user', await JSON.stringify(response.data.user_data))
      await AsyncStorage.removeItem('token');
      await AsyncStorage.setItem('token', await response.data.token);
    }  
    return response.data;
  } catch (error) {
    let message;
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    if (error) {
      message = error.response.data
      if (error.response.status === 400) {         
        return thunkAPI.rejectWithValue(message)
      }
     else if (error.response.status === 500) {
      return thunkAPI.rejectWithValue(message)
      } else {       
        return thunkAPI.rejectWithValue(message)
      }      
    }

    
  }
})  

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
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
      state.message = ""
    },
   
  },
  extraReducers: (builder) => {
    builder     
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false      
        state.user = action.payload.user_data
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false     
        state.user = null
        state.token = ""
        state.message = action.payload
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false      
        state.user = null
        state.token = ""
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false        
      })
       
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer