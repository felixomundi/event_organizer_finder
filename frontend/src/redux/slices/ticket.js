import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const URL = process.env.NETWORK_URL;
const API_URL = `${URL}tickets/`

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
  total: 0,
  // totalTicketItems: 0,

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
// cart totals
export const cartTotal = createAsyncThunk("tickets/cartTotal", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    const response = await axios.get(`${API_URL}cart-total`, config);   
    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);   
  }
});
// total items
// export const totalItems = createAsyncThunk("tickets/totalItems", async (_, thunkAPI) => {
//   try {
//     const token = thunkAPI.getState().auth.token;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//     const response = await axios.get(`${API_URL}total-items`, config);
//     return response.data;
//   } catch (error) {
//     const message =
//       (error.response &&
//         error.response.data &&
//         error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });


//clear cart
export const clearCart = createAsyncThunk('tickets/clearCart', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    const response = await axios.get(`${API_URL}/clear-cart`, config);
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
        message = "Error in clearing tickets"
        return thunkAPI.rejectWithValue(message)
      }
    }   
  }
});
// delete cart item
export const deleteCartItem = createAsyncThunk("tickets/deleteCartItem", async (cartId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }   
    const response = await axios.post(`${API_URL}delete-cart-item`, { cartId: cartId }, config);
    return response.data;
  } catch (error) {
    let message
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
        message = "Error in clearing tickets"
        return thunkAPI.rejectWithValue(message)
      }
    
  }  
    
  }
});

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
        state.ticket = action.payload.ticket
      })
      .addCase(addTicketToCart.rejected, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(cartTotal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartTotal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.total = action.payload.total;
      })
      .addCase(cartTotal.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload
      })
      // .addCase(totalItems.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(totalItems.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.totalTicketItems = action.payload;
      // })
      // .addCase(totalItems.rejected, (state, action) => {
      //   state.isLoading = false;
      // })
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload
      })
       
  },
})

export const { resetTicket } = ticketSlice.actions
export default ticketSlice.reducer