import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendEmail, sendEmailLTO } from '../../redux/actions/other'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'

const SendEmail = props => {
  const { open, handleClose, email = '', userType } = props
  const dispatch = useDispatch()
  const [sending, setSending] = useState(false)

  const closeModal = (event, reason) => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return
    handleClose(false)
  }

  const initialValue = { email: email, subject: '', body: '', all_users: false }
  const SignInSchema = Yup.object().shape({
    subject: Yup.string().required('Required'),
    body: Yup.string().required('Required')
  })

  const handleSubmit = values => {
    setSending(true)
    if (userType === 'lto') {
      const apiData = {
        body: values?.body,
        email: values?.email,
        subject: values?.subject
      }
      dispatch(sendEmailLTO(apiData))
        .then(data => {
          setSending(false)
          closeModal()
        })
        .catch(() => {
          setSending(false)
        })
    } else {
      dispatch(sendEmail(values))
        .then(data => {
          setSending(false)
          closeModal()
        })
        .catch(() => {
          setSending(false)
        })
    }
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
      onClose={closeModal}
      scroll={'body'}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogContent>
        <div className='row'>
          <div className='col-md-12'>
            <h4 className='mb-5'>
              Send mail
              <IconButton
                className={'float-end p-0'}
                color='inherit'
                onClick={closeModal}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
            </h4>
            <Formik
              initialValues={initialValue}
              validationSchema={SignInSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isValidating }) => (
                <Form>
                  <div className='row'>
                    <div className='col-md-12 mb-3'>
                      <div className='form-group'>
                        <Field
                          name='subject'
                          placeholder='Subject'
                          className={`form-control ${
                            touched.subject && errors.subject
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <ErrorMessage
                          component='div'
                          name='subject'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>
                    <div className='col-md-12 mb-3'>
                      <div className='form-group'>
                        <Field
                          component='textarea'
                          name='body'
                          placeholder='Message'
                          rows='5'
                          cols='50'
                          className={`form-control ${
                            touched.body && errors.body ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          component='div'
                          name='body'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>
                    {userType !== 'lto' && (
                      <div className='col-md-12 mb-3'>
                        <div className='form-group'>
                          <Field type='checkbox' name='all_users' /> All Users
                        </div>
                      </div>
                    )}

                    <div className='col-md-12'>
                      {sending ? (
                        <LoadingButton
                          endIcon={<SendIcon />}
                          className='mb-3 w-100'
                          loading
                          loadingPosition='end'
                          variant='contained'
                        >
                          SENDING...
                        </LoadingButton>
                      ) : (
                        <button
                          type='submit'
                          className='btn btn-primary mb-3 w-100'
                        >
                          SEND
                        </button>
                      )}
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

export default SendEmail
