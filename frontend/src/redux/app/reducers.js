import authReducer from '../features/auth/authSlice'
// import cartReducer from '../features/cart/cartSlice'
// import productReducer from '../features/products/productSlice'
// import contactReducer from '../features/contact/contactSlice'
// import couponReducer from '../features/coupons/couponSlice'
// import orderReducer from '../features/orders/order'
// import subscribeReducer from '../features/subscribe/subscribe'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    // cart: cartReducer,
    // products: productReducer,
    // contact: contactReducer,
    // coupon: couponReducer,
    // order: orderReducer,
    // subscriber:subscribeReducer,
  
})

export default rootReducer;