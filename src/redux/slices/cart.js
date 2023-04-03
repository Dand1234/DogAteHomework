import { createSlice } from '@reduxjs/toolkit';
import { initialCartState } from '../initialValues'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const productInCart = state.find(el => el.id === action.payload)

      if (productInCart) {
        productInCart.count++

        return state
      }

      state.push({
        id: action.payload,
        count: 1,
        isChecked: false,
      })

      return state
    },
    clearCart: () => {
      return initialCartState
    },
    deleteFromCart: (state, action) => {
      return state.filter(el => el.id !== action.payload)
    },
    incrementProduct: (state, action) => {
      const productInCart = state.find(el => el.id === action.payload)

      if (productInCart) {
        productInCart.count++

        return state
      }

      return state
    },
    dicrementProduct: (state, action) => {
      const productInCart = state.find(el => el.id === action.payload)

      if (productInCart) {
        if (productInCart.count === 1) {
          return state.search(el => el.id !== action.payload)
        }
        productInCart.count--

        return state
      }

      return state
    },
    changeCheck: (state, action) => {
      const productInCart = state.find(el => el.id === action.payload._id)

      if (productInCart) {
        productInCart.isChecked = action.payload.isChecked

        return state
      }

      return state
    }
  }
})

export const { addToCart, deleteFromCart, clearCart, incrementProduct, dicrementProduct, changeCheck } = cartSlice.actions

export const cartReducer = cartSlice.reducer
