import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  SET_DISPLAY_LOADER
} from './types'
import sha256 from 'crypto-js/sha256'

import AuthService from '../../services/auth.service'
import { toast } from 'react-toastify'
import { history } from '../../helpers/history'

export const register = params => dispatch => {
  const { password, ...rest } = params

  return AuthService.register({
    ...rest,
    password: sha256(password).toString()
  }).then(
    response => {
      localStorage.setItem('USERNAME_TO_CONFIRM', params.email)
      localStorage.setItem('PASSWORD_TO_CONFIRM', params.password)
      localStorage.setItem('REGISTER_TYPE', params.type)

      dispatch({
        type: REGISTER_SUCCESS
      })

      dispatch({
        type: SET_MESSAGE,
        payload: response
      })

      return Promise.resolve()
    },
    error => {
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString()

      dispatch({
        type: REGISTER_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      console.error(message)
      toast.error('Oops! Something went wrong. Please try again.')

      return Promise.reject()
    }
  )
}

export const verifyEmail = (email, code, type) => dispatch => {
  return AuthService.verifyEmail(email, code, type).then(
    response => {
      dispatch({
        type: REGISTER_SUCCESS
      })

      dispatch({
        type: SET_MESSAGE,
        payload: response
      })

      return Promise.resolve()
    },
    error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      dispatch({
        type: REGISTER_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      console.error(message)
      toast.error('Oops! Something went wrong. Please try again.')

      return Promise.reject()
    }
  )
}

export const reSendVerificationCode = email => dispatch => {
  return AuthService.reSendVerificationCode(email).then(
    response => {
      dispatch({
        type: SET_MESSAGE,
        payload: response.data
      })

      toast.success(response.data)

      return Promise.resolve()
    },
    error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      console.error(message)
      toast.error('Oops! Something went wrong. Please try again.')

      return Promise.reject()
    }
  )
}

export const login = (email, password) => dispatch => {
  return AuthService.login(email, sha256(password).toString()).then(
    response => {
      if (response.data.access_token) {
        let data = response.data
        let userTypeObject = JSON.parse(atob(data.access_token.split('.')[1]))

        data['email'] = email
        localStorage.setItem('user', JSON.stringify(data))

        // Stored in state to verify user type
        data['user_type'] = userTypeObject['custom:user_type']
      }

      localStorage.removeItem('USERNAME_TO_CONFIRM')
      localStorage.removeItem('PASSWORD_TO_CONFIRM')
      localStorage.removeItem('REGISTER_TYPE')

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response.data }
      })

      return Promise.resolve(response.data)
    },
    error => {
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString()

      if (message === 'Email is not verified') {
        localStorage.setItem('USERNAME_TO_CONFIRM', email)
        localStorage.setItem('PASSWORD_TO_CONFIRM', password)
      }

      dispatch({
        type: LOGIN_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      console.error(message)
      toast.error(message)

      return Promise.reject()
    }
  )
}

export const logout = () => dispatch => {
  AuthService.logout()

  dispatch({
    type: LOGOUT
  })

  history.push('/home')
}

export const forgotPassword = email => dispatch => {
  return AuthService.forgotPassword(email).then(
    response => {
      localStorage.setItem('USERNAME_TO_CONFIRM', email)
      toast.success(response.data)
      return Promise.resolve()
    },
    error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      console.error(message)
      toast.error('Oops! Something went wrong. Please try again.')
      return Promise.reject()
    }
  )
}

export const resetPassword = (email, password, code) => dispatch => {
  return AuthService.resetPassword(
    email,
    sha256(password).toString(),
    code
  ).then(
    response => {
      localStorage.removeItem('USERNAME_TO_CONFIRM')
      toast.success(response.data)
      return Promise.resolve()
    },
    error => {
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString()
      console.error(message)
      toast.error('Oops! Something went wrong. Please try again.')
      return Promise.reject()
    }
  )
}

export const authenticate = () => dispatch => {
  return AuthService.authenticate().then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const errorHandling = (error, dispatch) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()

  if (error.response.status === 401 || error.response.status === 0) {
    dispatch(logout())
  }
  toast.error('Oops! Something went wrong. Please try again.')
  console.error(message)
}

export const setDisplayLoader = displayLoader => dispatch => {
  dispatch({
    type: SET_DISPLAY_LOADER,
    payload: displayLoader
  })
}
