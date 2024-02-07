
import authReducer from './../slices/auth'
import eventReducer from "../slices/events"
import { combineReducers } from 'redux'
import ticketReducer from '../slices/ticket';

const rootReducer = combineReducers({
    auth: authReducer, 
    events: eventReducer,
    tickets:ticketReducer,
     
})

export default rootReducer;