import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_DISPLAY_LOADER
} from '../actions/types'

let user = null
try {
  user = JSON.parse(localStorage.getItem('user'))
  if (user && user.access_token) {
    const decodedToken = JSON.parse(atob(user.access_token.split('.')[1]))
    const user_type = decodedToken['custom:user_type']
    user = { ...user, user_type }
  }
} catch (error) {
  console.error('Authentication token is invalid.')
}

const initialState = user
  ? { isLoggedIn: true, user, displayLoader: true }
  : { isLoggedIn: false, user: null }

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false
      }
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    case SET_DISPLAY_LOADER:
      return {
        ...state,
        displayLoader: payload
      }
    default:
      return state
  }
}
