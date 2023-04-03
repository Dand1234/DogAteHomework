export const getInitialValues = () => {
  const ls_store = localStorage.getItem('reduxState')
  
  if (ls_store) {
    return JSON.parse(ls_store)
  }
  
  return {
    user: initialUserState,
    search: initialSearchState,
    cart: initialCartState
  }
}
  
export const initialUserState = {
  token: '',
  name: '',
  about: '',
  avatar: '',
  _id: '',
  email: '',
  group: '',
  __v: 0
  }
  
export const initialSearchState = {
  search: '',
 }
  
export const initialCartState = []

export const initialFavouriteState = []