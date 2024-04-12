import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const URL = process.env.NETWORK_URL;
const API_URL = `${URL}orders/`

const config = {
  headers: {
    "Content-Type": "application/json"   
  }
}
const initialState = { 
  order: {} ,
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}


// get user orders
export const getOrders = createAsyncThunk('orders/getOrders', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token   
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }    
    const response = await axios.get(API_URL + 'user/orders', config); 
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
        message = "Error in fetching orders"
        return thunkAPI.rejectWithValue(message)
      }
    }      
  }
}) 
export const createOrder = createAsyncThunk('orders/createOrder', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token   
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }    
    const response = await axios.post(API_URL + 'create', {}, config); 
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
        message = "Error in creating an order"
        return thunkAPI.rejectWithValue(message)
      }
    }      
  }
}) 
export const orderPayment = createAsyncThunk('orders/orderPayment', async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token   
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }    
    const data = payload;
    const response = await axios.post(API_URL + 'pay', data, config); 
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
        message = "Error in creating an order"
        return thunkAPI.rejectWithValue(message)
      }
    }      
  }
}) 


export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderStore: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
   
  },
  extraReducers: (builder) => {
    builder     
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false      
        state.orders = action.payload.orders
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false     
        state.orders = []
        state.isError = true
        state.message = action.payload
      })    
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload.message       
        state.order = action.payload.order
        isSuccess = true             
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false    
        state.message = action.payload
      })    
      .addCase(orderPayment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(orderPayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload.message                   
      })
      .addCase(orderPayment.rejected, (state, action) => {
        state.isLoading = false    
        state.message = action.payload
      })    
       
  },
})

export const { resetOrderStore } = orderSlice.actions
export default orderSlice.reducer