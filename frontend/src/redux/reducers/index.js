
import authReducer from './../slices/auth'
import eventReducer from "../slices/events"
import { combineReducers } from 'redux'
import ticketReducer from '../slices/ticket';
import orderReducer from "../slices/orders";

const rootReducer = combineReducers({
    auth: authReducer, 
    events: eventReducer,
    tickets: ticketReducer,
    orders:orderReducer,
     
})

export default rootReducer;