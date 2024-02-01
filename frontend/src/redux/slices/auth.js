import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import authService from './authService'
import { toast } from 'react-toastify'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.171.141:5000/api/v1/users/' 



const config = {
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  }
}

// Get user from asyncStorage

getUserFromAsyncStorage = async() =>{
  try {
   return JSON.parse(AsyncStorage.getItem('@user'));
  } catch (error) {
    console.log(error);
  }
}
const user = getUserFromAsyncStorage()

const initialState = {
  user: user ? user : null,
  user:null,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {     
      const response = await axios.post(API_URL + 'register', user, config);
      // AsyncStorage
      console.log(response);
      return response.data;
    } catch (error) { 
      if (error) {
        console.log(error);
      }
      // const message =  error.response.data       
      // return thunkAPI.rejectWithValue(message)
    }
  })

// Login user
// 
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + 'login', user, config);      
    if (response.status === 200) {
      AsyncStorage.setItem('user', JSON.stringify(response.data));      
    }
    console.log(response.data);
    return response.data;
  } catch (error) {        
    // const message = error.response.data;
    // return thunkAPI.rejectWithValue(message)
    console.log(error);
  }
})  

//   // Register user
// export const adduser = createAsyncThunk(
//   'auth/adduser',
//   async (user, thunkAPI) => {
//     try {
//       return await authService.adduser(user)
//     } catch (error) {
//       const message = error.response.data 
//       return thunkAPI.rejectWithValue(message)
//     }
//   })



// // Login user
// export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
//   try {
//     return await authService.login(user)
//   } catch (error) {        
//     const message = error.response.data; 
//     return thunkAPI.rejectWithValue(message)
//   }
// })

// export const logout = createAsyncThunk('auth/logout', async () => {
//   return await authService.logout()
// });


// export const profileUpdate = createAsyncThunk('auth/profile', async (userData, thunkAPI) => {
//   try {
//     const token = thunkAPI.getState().auth.user.token;
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//     const response = await axios.put(API_URL + 'profile', userData, config)
//     if (response.data) {
//       localStorage.setItem('user', JSON.stringify(response.data)) 
//     }
//     return response.data
//   } catch (error) {   
//     if (error.response.status === 401) {
//       localStorage.removeItem('user')
//     }
//     const message = error.response.data;    
//     return thunkAPI.rejectWithValue(message)
//   }
// });

// export const updateUserDetails = createAsyncThunk('auth/updateUserDetails',
//   async ({ id, updatedUserData},thunkAPI) => {
//   try {
//     const token = thunkAPI.getState().auth.user.token
//       return await authService.updateUserDetails(updatedUserData, id, token)
//   } catch (error) {
//     const message = error.response.data; 
//     return thunkAPI.rejectWithValue(message);
//   }  
// });

// // Fetch all users by admin 
// export const getUsers = createAsyncThunk('auth/all',
//   async(_, thunkAPI) => {
//   try {    
//     const token = thunkAPI.getState().auth.user.token
//     return await authService.getUsers(token)
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString()
//     return thunkAPI.rejectWithValue(message)
//   }
// });

// // Get a User
// export const getUser = createAsyncThunk(
//   "auth/getUser",
//   async (id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await authService.getUser(id,token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       console.log(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const updatedUserPassword = createAsyncThunk("auth/changePassword",async(data, thunkAPI) => {
//   try {
//     const token = thunkAPI.getState().auth.user.token;
//      return await authService.updatedUserPassword(data, token);
//   } catch (error) {
//     let message;
//     if (error.response) {
//       if (error.response.status === 404) {
//         message = error.response.data.message;
//         toast.error(message);
//       }
//       if (error.response.status === 400) {
//         message = error.response.data.message;
//         toast.error(message);
//       }
//     }
//     return thunkAPI.rejectWithValue(message);
//   } 
 
// })

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
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        // state.isSuccess = true
        // state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        // state.isError = true
        // state.message = action.payload
        // state.user = null
      })

    //   .addCase(adduser.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(adduser.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.user = action.payload
    //   })
    //   .addCase(adduser.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    //     state.user = null
    //   })
    //   .addCase(login.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(login.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.user = action.payload
    //   })
    //   .addCase(login.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    //     state.user = null
    //   })      
    //   .addCase(logout.fulfilled, (state) => {
    //     state.user = null
    //   })
    // .addCase(profileUpdate.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(profileUpdate.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.user = action.payload
    //     toast.success('Profile updated successfully')
    //   })
    //   .addCase(profileUpdate.rejected, (state, action) => {
    //     state.isLoading = false
    //   })
    //   .addCase(getUsers.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getUsers.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.isError = false;       
    //     state.users = action.payload;
    //   })
    //   .addCase(getUsers.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload;
    //     toast.error(action.payload);
    //   })
    // // get single User
    // .addCase(getUser.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getUser.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.isError = false;      
    //   state.user = action.payload
    // })
    // .addCase(getUser.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    //   toast.error(action.payload);
    // })
    // .addCase(updateUserDetails.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(updateUserDetails.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.isError = false;
    //  state.users = state.users.map((item) =>
    //     item.id === action.payload.id ? action.payload : item
    //   );
    //   toast.success('User update Success')
      
    // })
    // .addCase(updateUserDetails.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    //   toast.error(action.payload);
    // })
    // .addCase(updatedUserPassword.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(updatedUserPassword.fulfilled, (state, action) => {
    //   state.isLoading = false;    
    //   state.message = action.payload.message
    //   toast.success(state.message)
    //   state.isSuccess = true;
      
    // })
    // .addCase(updatedUserPassword.rejected, (state, action) => {
    //   state.isLoading = false;     
    // })
       
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer