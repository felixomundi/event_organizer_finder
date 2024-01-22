import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
const BASE_URL = `http://localhost:5000/api/v1/cart`
const initialState= {
    cartItems: [],   
    isLoading: false,
    cartItem: {},    
}

  
  export const getCartItems = createAsyncThunk('cart/Items',
  async (_,thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
                const config = {
            headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type" : "application/json",
            },
          }
         const response = await axios.get(BASE_URL,config);
          return response.data;
  
      } catch (error) {
      }
      });
  
  const cartSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {      
      reset: (state,action)=>{
        state.totalcartItems = 0
        },
    },
  
    extraReducers: (builder) => {
      builder
        
        .addCase(getCartItems.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload;
        })
        .addCase(getCartItems.rejected, (state, action) => {
          state.isLoading = false;
        })       
     
    }
  });
  export const {  reset } = cartSlice.actions;
  
  export default cartSlice.reducer