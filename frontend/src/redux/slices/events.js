import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = 'http://192.168.171.172:5000/api/v1/events/' 

const config = {
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  }
}



const initialState = { 
  event: {} ,
  events: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",

}


// Login user
export const getEvents = createAsyncThunk('events/getEvents', async (_, thunkAPI) => {
  try {
      const response = await axios.get(API_URL, config);    
      console.log(response.data);
    // if (response.status == 200) {
    //   const data =  JSON.stringify(response.data.user_data);
    //   await AsyncStorage.removeItem('user')
    //   await AsyncStorage.setItem('user', data)
    // }  
    return response.data;
  } catch (error) {        
    // const message = error.response.data;
    // return thunkAPI.rejectWithValue(message)
    console.log(error);
  }
})  


export const authSlice = createSlice({
  name: 'events',
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
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false      
        state.events = action.payload
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false     
        state.events = []
      })
      
       
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer