import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../redux/actions/message'
import {
  openForgotPasswordModal,
  openLoginModal,
  openVerifyEmailModal
} from '../../redux/actions/other'
import * as Yup from 'yup'
import { login, reSendVerificationCode } from '../../redux/actions/auth'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { message } = useSelector(state => state.message)
  const { isOpenLoginModal } = useSelector(state => state.other)
  const [loading, setLoading] = useState(false)

  const close = (event, reason) => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return
    dispatch(openLoginModal(false))
    dispatch(clearMessage())
  }

  const openVerifyModal = () => {
    dispatch(
      reSendVerificationCode(localStorage.getItem('USERNAME_TO_CONFIRM'))
    ).then(() => {
      dispatch(clearMessage())
      dispatch(openLoginModal(false))
      dispatch(openVerifyEmailModal(true))
    })
  }

  const initialValue = { email: '', password: '' }
  // const initialValue = {email: 'maulik.naik@scalecapacity.com', password: 'Maulik@123'};
  // const initialValue = {email: 'kavan.patel.admin@scalecapacity.com', password: 'Admin@123'};
  // const initialValue = {email: 'kavan.patel@scalecapacity.com', password: 'Admin@123'};
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address format')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password must be 8 characters at minimum')
      .required('Required')
  })

  const handleSubmit = (values, { setSubmitting }) => {
    setLoading(true)
    dispatch(clearMessage())

    dispatch(login(values.email, values.password))
      .then(data => {
        setLoading(false)
        dispatch(openLoginModal(false))
        if (data.user_type === 'lto') {
          history.push('/lto-timeline')
        } else if (data.user_type === 'jpa') {
          history.push('/admin-timeline')
        } else if(data.user_type === 'rpf'){
          history.push('/admin-timeline')
        }else {
          history.push('/user-timeline')
        }
      })
      .catch(() => {
        setLoading(false)
      })
    setSubmitting(false)
  }

  const forgotPassword = () => {
    dispatch(clearMessage())
    dispatch(openLoginModal(false))
    dispatch(openForgotPasswordModal(true))
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={false}
      id='popupDialog'
      open={isOpenLoginModal}
      onClose={close}
      scroll={'body'}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogContent class='popup'>
        <div class='flex-row exit-button'>
          <IconButton
            className={'float-end p-0'}
            color='inherit'
            onClick={close}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className='flex-row'>
          <div className='popup-img'>
            {/* <img src={'/img/register_login_bg.png'} alt={'register-bg'} style={{width: '100%'}}/> */}
          </div>
          <div className='popup-content'>
            <h2 className='mb-5'>Welcome Back!</h2>
            <Formik
              initialValues={initialValue}
              validationSchema={SignInSchema}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                touched,
                isValidating,
                isSubmitting,
                handleSubmit
              }) => (
                <Form onKeyDown={e => e.key === 'Enter' && handleSubmit()}>
                  <div className='row'>
                    <b>Email</b>
                    <div className='col-md-12 mb-3'>
                      <div className='form-group'>
                        <Field
                          name='email'
                          placeholder='Email address'
                          className={`form-control ${
                            touched.email && errors.email ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          component='div'
                          name='email'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>
                    <b>Password</b>
                    <div className='col-md-12 mb-3'>
                      <div className='form-group'>
                        <Field
                          type='password'
                          name='password'
                          placeholder='Password'
                          className={`form-control ${
                            touched.password && errors.password
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <ErrorMessage
                          component='div'
                          name='password'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (!isSubmitting) {
                          forgotPassword()
                        }
                      }}
                      type='button'
                      style={{ cursor: 'pointer' }}
                      id='forgot-pass'
                      className='greenLinkBtn'
                    >
                      Forgot password?
                    </button>
                    <div className='col-md-12'>
                      {loading ? (
                        <LoadingButton
                          endIcon={<SendIcon />}
                          className='mb-3 w-100'
                          loading
                          loadingPosition='end'
                          variant='contained'
                        >
                          LOADING..
                        </LoadingButton>
                      ) : (
                        <button
                          type='submit'
                          className='btn btn-primary mt-5 mb-4 w-100'
                        >
                          SIGN IN
                        </button>
                      )}
                    </div>
                    {message && message === 'Email is not verified' && (
                      <div className='form-group'>
                        <div className={'alert alert-danger'} role='alert'>
                          To verify your email{' '}
                          <a
                            onClick={openVerifyModal}
                            style={{ cursor: 'pointer' }}
                            className='text-decoration-underline'
                          >
                            {' '}
                            click here
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Login
