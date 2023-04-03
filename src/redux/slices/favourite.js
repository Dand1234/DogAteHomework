import { createSlice } from "@reduxjs/toolkit";
import { initialFavouriteState } from "../initialValues";

export const favSlice = createSlice({
    name: 'favourite',
    initialState: initialFavouriteState,
    reducers: {
        addToFav: (state, action) => {
            const productInFav = state.find(el => el.id === action.payload);

            if (productInFav) return state;

            state.push({
                id:action.payload
            })
            console.log(state.favourite)

            return state
        },

        deleteFromFav: (state, action) => {
            return state.filter(el => el.id !== action.payload)
          },
      }
    })

    export const { addToFav, deleteFromFav } = favSlice.actions

    export const favReducer = favSlice.reducer