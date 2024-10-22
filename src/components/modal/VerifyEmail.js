import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  openVerifyEmailModal,
  setSelectedProperty
} from '../../redux/actions/other'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
  login,
  reSendVerificationCode,
  verifyEmail
} from '../../redux/actions/auth'
import { saveGeoJson } from '../../redux/actions/other'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingButton from '@mui/lab/LoadingButton'
import MessageIcon from '@mui/icons-material/Message'
// import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import SendIcon from '@mui/icons-material/Send'
import MapComponent from '../MapComponent'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share'

import { EmailIcon, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share'
import SocialShare from '../SocialShare'

const VerifyEmail = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { isOpenVerifyEmailModal } = useSelector(state => state.other)
  const { selectedProperty } = useSelector(state => state.other)
  const [successful, setSuccessful] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [sending, setSending] = useState(false)

  const close = (event, reason) => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return
    dispatch(openVerifyEmailModal(false))
    setSuccessful(false)
  }

  const viewTimeLine = () => {
    close()
    history.push('/user-timeline')
  }

  const initialValue = {
    email: localStorage.getItem('USERNAME_TO_CONFIRM'),
    code: ''
  }

  const verifyEmailSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address format')
      .required('Required'),
    code: Yup.string().required('Required')
  })

  const handleSubmit = values => {
    setSending(true)

    dispatch(
      verifyEmail(
        values.email,
        values.code,
        localStorage.getItem('REGISTER_TYPE')
      )
    )
      .then(() => {
        toast.success('Your email has been verified!')
        if (selectedProperty?.results) setUploading(true)
        dispatch(
          login(
            localStorage.getItem('USERNAME_TO_CONFIRM'),
            localStorage.getItem('PASSWORD_TO_CONFIRM')
          )
        ).then(() => {
          if (selectedProperty?.results) {
            var params = {
              email: values.email,
              geojson: selectedProperty['results'][0]
            }
            dispatch(saveGeoJson(params)).then(() => {
              dispatch(setSelectedProperty({}))
              setSending(false)
              setUploading(false)
              setSuccessful(true)
            })
          } else {
            setSending(false)
            setSuccessful(true)
          }
        })
      })
      .catch(() => {
        setSending(false)
        setSuccessful(false)
      })
  }

  const resend = () => {
    setSending(true)
    dispatch(
      reSendVerificationCode(localStorage.getItem('USERNAME_TO_CONFIRM'))
    )
      .then(() => {
        setSending(false)
      })
      .catch(() => {
        setSending(false)
        setSuccessful(false)
      })
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={isOpenVerifyEmailModal}
      onClose={close}
      scroll={'body'}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogContent>
        <div className='row'>
          <div className='col-md-7'>
            {selectedProperty?.results ? (
              <MapComponent
                className={'find-property-map'}
                center={[
                  selectedProperty.results[0].properties.latitude,
                  selectedProperty.results[0].properties.longitude
                ]}
                data={selectedProperty['results']}
                zoom={150}
                jpa={false}
              />
            ) : (
              <img
                src={'/img/redwoods.jpg'}
                alt={'register-bg'}
                style={{ width: '100%' }}
              />
            )}
          </div>
          <div className='col-md-5'>
            {successful ? (
              <div>
                <h4>
                  Success!
                  <IconButton
                    className={'float-end p-0'}
                    color='inherit'
                    onClick={close}
                    aria-label='close'
                  >
                    <CloseIcon />
                  </IconButton>
                </h4>
                <small>
                  You're officially part of the Resilient Sierra program and
                  community
                </small>
                <div>
                  <h6 className='mt-3 mb-2'>Share the benefits with others</h6>
                  <SocialShare />
                  <br />
                  <small>
                    Lets your neighbors know that your properties are safer when
                    resilient together
                  </small>
                </div>

                <div className='mt-5'>
                  <small>See what comes next with your analysis</small>
                </div>
                {/* <button
                  onClick={() => viewTimeLine()}
                  className="btn btn-outline-dark form-control w-100 mt-3"
                >
                  VIEW DASHBOARD
                </button> */}
              </div>
            ) : (
              <div>
                <h4>
                  Verify email
                  <IconButton
                    className={'float-end'}
                    color='inherit'
                    onClick={close}
                    aria-label='close'
                  >
                    <CloseIcon />
                  </IconButton>
                </h4>
                <small>( Check you mail box for code )</small>
                <Formik
                  initialValues={initialValue}
                  validationSchema={verifyEmailSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isValidating }) => (
                    <Form className={'mt-5'}>
                      <div className='row'>
                        <div className='col-md-12 mb-3'>
                          <div className='form-group'>
                            <Field
                              name='email'
                              render={({ field }) => (
                                <input
                                  {...field}
                                  className={`form-control`}
                                  disabled={true}
                                  type='text'
                                  placeholder='Email address'
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                          <div className='form-group'>
                            <Field
                              name='code'
                              placeholder='Code'
                              className={`form-control ${
                                touched.code && errors.code ? 'is-invalid' : ''
                              }`}
                            />
                            <ErrorMessage
                              component='div'
                              name='code'
                              className='invalid-feedback'
                            />
                          </div>
                        </div>
                        <div className='col-md-12'>
                          {sending ? (
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
                              SUBMIT
                            </button>
                          )}
                          {!sending ? (
                            <a
                              onClick={resend}
                              style={{ cursor: 'pointer' }}
                              className='text-decoration-underline'
                            >
                              {!sending ? 'Resend' : 'Sending ...'}
                            </a>
                          ) : !uploading ? (
                            'Sending ...'
                          ) : (
                            'Saving your land ...'
                          )}
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VerifyEmail
