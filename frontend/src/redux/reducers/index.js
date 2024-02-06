
import authReducer from './../slices/auth'
import eventReducer from "../slices/events"
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    // auth: authReducer, 
    events:eventReducer,
     
})

export default rootReducer;