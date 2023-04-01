import { getInitialValues } from './initialValues';
import { searchReducer } from './slices/search';
import { userReducer } from './slices/user';
import { cartReducer } from './slices/cart';
import { configureStore, createReducer } from '@reduxjs/toolkit'

export const store = configureStore({
    preloadedState: getInitialValues(),
    reducer:{
        user: userReducer,
        search: searchReducer,
        cart: cartReducer
    }
})

store.subscribe(() => {
    localStorage.setItem ('reduxState',
    JSON.stringify(store.getState()))
})