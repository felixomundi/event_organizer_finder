import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = `http://192.168.171.114:5000/api/v1/tickets/`

const config = {
  headers: {
    "Content-Type": "application/json"   
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


// get user tickets
export const getTickets = createAsyncThunk('tickets/getTickets', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token   
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }    
    const response = await axios.get(API_URL + 'getMyTickets', config); 
    return response.data;
  } catch (error) {  
    let message;    
    if (error) {
      message = error.response.data.message
      if (error.response.status === 404) {        
        return thunkAPI.rejectWithValue(message)
      }
      else if (error.response.status === 400) {
        return thunkAPI.rejectWithValue(message)
      }
     else if (error.response.status === 401) {
        return thunkAPI.rejectWithValue(message)
      }
     else if (error.response.status === 500) {
        return thunkAPI.rejectWithValue(message)
      } else {
        message = "Error in fetching tickets"
        return thunkAPI.rejectWithValue(message)
      }
    }      
  }
}) 

// add ticket to cart
export const addTicketToCart = createAsyncThunk('tickets/addTicketToCart', async (event, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token   
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }    
    const response = await axios.post(API_URL,  event , config);     
    return response.data;
    
  } catch (error) {  
    let message;    
    if (error) {
      message = error.response.data.message
      if (error.response.status === 404) {        
        return thunkAPI.rejectWithValue(message)
      }
      else if (error.response.status === 400) {
        return thunkAPI.rejectWithValue(message)
      }
     else if (error.response.status === 401) {
        return thunkAPI.rejectWithValue(message)
      }
     else if (error.response.status === 500) {
        return thunkAPI.rejectWithValue(message)
      } else {
        message = "Error in booking event ticket"
        return thunkAPI.rejectWithValue(message)
      }
    }      
  }
}) 

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    resetTicket: (state) => {
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
        state.tickets = action.payload.tickets
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false     
        state.tickets = []
        state.isError = true
        state.message = action.payload
      })
      .addCase(addTicketToCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addTicketToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload.message
        console.log(state.message);
        state.ticket = action.payload.ticket
      })
      .addCase(addTicketToCart.rejected, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
      
       
  },
})

export const { resetTicket } = ticketSlice.actions
export default ticketSlice.reducer