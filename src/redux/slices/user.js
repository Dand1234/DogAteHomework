import { createSlice } from '@reduxjs/toolkit';
import { initialUserState } from '../initialValues'

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    changeUserAvatar: (_, action) => {
      return{
        ..._,
        avatar: action.payload.avatar,
      }
    },
    changeUserData: (_, action) => {
      return{
        ..._,
        name: action.payload.name,
        about: action.payload.about
      }
    },
    setUser: (_, action) => {
      return action.payload
    },
    removeUser: () => {
      return initialUserState
    }
  }
})

export const { setUser, removeUser, changeUserAvatar, changeUserData } = userSlice.actions

export const userReducer = userSlice.reducer
