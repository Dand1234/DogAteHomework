import { createSlice } from '@reduxjs/toolkit';
import { initialSearchState } from '../initialValues'

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    changeSearch: (state, action) => {
      state.search = action.payload
    },
  }
})

export const { changeSearch } = searchSlice.actions

export const searchReducer = searchSlice.reducer
