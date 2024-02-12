import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import logger from 'redux-logger'

export const store = configureStore({
  reducer: rootReducer,
  // devTools: true,
  
middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })  




  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  //   serializableCheck: {
  //     ignoredActions: ["TYPE"],
  //     ignoredActionPaths: ['property'],
  //     ignoredPaths:['reducer.property']
  //   } //false
  // }).concat(logger)  
})