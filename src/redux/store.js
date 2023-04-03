import { getInitialValues } from './initialValues';
import { searchReducer } from './slices/search';
import { userReducer } from './slices/user';
import { cartReducer } from './slices/cart';
import { configureStore } from '@reduxjs/toolkit'
import { favReducer } from './slices/favourite';

export const store = configureStore({
    preloadedState: getInitialValues(),
    reducer:{
        user: userReducer,
        search: searchReducer,
        cart: cartReducer,
        favourite: favReducer
    }
})

store.subscribe(() => {
    localStorage.setItem ('reduxState',
    JSON.stringify(store.getState()))
})