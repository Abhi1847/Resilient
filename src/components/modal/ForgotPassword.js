import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  openForgotPasswordModal,
  openLoginModal,
  openResetPasswordModal
} from '../../redux/actions/other'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { forgotPassword } from '../../redux/actions/auth'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { isOpenForgotPasswordModal } = useSelector(state => state.other)
  const [loading, setLoading] = useState(false)

  const close = (event, reason) => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return
    dispatch(openForgotPasswordModal(false))
  }

  const initialValue = { email: '' }

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address format')
      .required('Required')
  })

  const handleSubmit = values => {
    setLoading(true)

    dispatch(forgotPassword(values.email))
      .then(() => {
        setLoading(false)
        dispatch(openForgotPasswordModal(false))
        dispatch(openResetPasswordModal(true))
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={false}
      id='popupDialog'
      open={isOpenForgotPasswordModal}
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
            <h2>Password Reset</h2>
            <p>
              Submit your account email below to recive a code you can then use
              to reset your password
            </p>
            <Formik
              initialValues={initialValue}
              validationSchema={forgotPasswordSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isValidating }) => (
                <Form className={'mt-3'}>
                  <div className='row'>
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
                    <div className='col-md-12'>
                      {loading ? (
                        <LoadingButton
                          endIcon={<SendIcon />}
                          className='mb-3 w-100'
                          loading
                          loadingPosition='end'
                          variant='contained'
                        >
                          LOADING...
                        </LoadingButton>
                      ) : (
                        <button
                          type='submit'
                          className='btn btn-primary mb-3 w-100'
                        >
                          SEND RESET CODE
                        </button>
                      )}
                    </div>

                    <div
                      style={{
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                    >
                      <div
                        style={{
                          cursor: 'pointer',
                          alignItems: 'center',
                          display: 'flex'
                        }}
                        className='greenLinkBtn'
                        onClick={() => {
                          dispatch(openForgotPasswordModal(false))
                          dispatch(openLoginModal(true))
                        }}
                      >
                        <KeyboardArrowLeft />
                        <span>Back to Login</span>
                      </div>
                    </div>
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

export default ForgotPassword
