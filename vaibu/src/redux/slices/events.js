import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const URL = process.env.NETWORK_URL;
const API_URL = `${URL}events/`

const config = {
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  }
}



const initialState = { 
  event: {},
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
    return response.data;
  } catch (error) {   
    if (error) {  
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message)
    }  
  }
})  


export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    resetEvent: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
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
        state.isError = true
      })
      
       
  },
})

export const { resetEvent } = eventSlice.actions
export default eventSlice.reducer