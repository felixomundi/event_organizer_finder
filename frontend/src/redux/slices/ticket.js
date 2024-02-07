import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = `http://192.168.171.110:5000/api/v1/tickets/`

const config = {
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  }
}



const initialState = { 
  ticket: {} ,
  tickets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",

}


// Login user
export const getTickets = createAsyncThunk('tickets/getTickets', async (_, thunkAPI) => {
  try {
    // const response = await axios.get(API_URL, config);    
    // return response.data;
  } catch (error) {   
    
    // if (error) {   
    //   const message = error.response.data.message;
    //   return thunkAPI.rejectWithValue(message)
    // }  
  }
})  


export const ticketSlice = createSlice({
  name: 'tickets',
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
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false      
        state.tickets = action.payload
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false     
        state.tickets = []
        state.isError = true
      })
      
       
  },
})

export const { resetTicket } = ticketSlice.actions
export default ticketSlice.reducer