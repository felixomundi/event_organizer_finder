
import authReducer from './../slices/auth'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,   
  
})

export default rootReducer;