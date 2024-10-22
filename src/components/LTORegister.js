import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openRegisterModal, openVerifyEmailModal } from '../redux/actions/other'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { register } from '../redux/actions/auth'
import * as Yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp'
import Tooltip from '@mui/material/Tooltip'

const LTORegister = ({ changeBottomStepper = () => {}, stepper = 0 }) => {
  console.log('stepper ====>>> ', stepper)
  const dispatch = useDispatch()
  const { selectedProperty } = useSelector(state => state.other)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (stepper === 0) {
      setStep(0)
    }
  }, [stepper])

  useEffect(() => {
    changeBottomStepper(step)
  }, [step])

  const lengthRegex = /^(?=.{8,})/
  const lowerCaseRegex = /^(?=.*[a-z])/
  const upperCaseRegex = /^(?=.*[A-Z])/
  const specialCharacterRegex = /^(?=.*[!@#\$%\^&\*])/
  const numberRegex = /^(?=.{6,20}$)\D*\d/

  const initialValue = {
    first_name: '',
    last_name: '',
    // name: '',
    operator_number: '',
    email: '',
    // address: '',
    city: '',
    zip_code: '',
    phone: '',
    password: '',
    company_name: '',
    company_address: '',
    country: ''
  }

  const initialValue1 = {
    company_name: '',
    company_address: '',
    zip_code: '',
    country: ''
  }

  if (selectedProperty?.query) {
    // initialValue["address"] = selectedProperty["query"]["address"];
    // initialValue["zip_code"] = selectedProperty["query"]["zip"];
    // initialValue["country"] = "United States";
  }

  const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  )

  const signUpSchema1 = Yup.object().shape({
    company_name: Yup.string().required('Required'),
    company_address: Yup.string().required('Required'),
    zip_code: Yup.string().required('Required'),
    country: Yup.string().required('Required')
  })

  const signUpSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    operator_number: Yup.string().required('Required'),
    // address: Yup.string().required('Required'),
    // city: Yup.string().required('Required'),

    // phone: Yup.string()
    //   .matches(phoneRegex, 'Invalid phone')
    //   .required('Phone is required'),
    email: Yup.string()
      .email('Invalid email address format')
      .required('Required'),
    password: Yup.string()
      .required('Please Enter your password')
      .matches(lengthRegex, 'Must Contain 8 Characters')
      .matches(lowerCaseRegex, 'Must Contain One Lowercase')
      .matches(upperCaseRegex, 'Must Contain One Uppercase')
      .matches(specialCharacterRegex, 'Must Contain One Special Case Character')
      .matches(numberRegex, 'Must Contain One Number')
  })

  const [formValues, setFormValues] = useState(initialValue)

  const handleSubmit = values => {
    setStep(1)
    // setFormValues(values)
  }

  const handleSubmit1 = values => {
    // setFormValues({ ...formValues, values })

    let param = values
    param['type'] = 'LTO'

    setLoading(true)

    dispatch(register(param))
      .then(() => {
        setLoading(false)
        dispatch(openRegisterModal(false))
        dispatch(openVerifyEmailModal(true))
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return step === 1 ? (
    <Formik
      initialValues={initialValue1}
      validationSchema={signUpSchema1}
      onSubmit={handleSubmit1}
    >
      {({ errors, touched, isValidating, values }) => (
        <Form>
          <div className='row'>
            <b className='register_form_label'>Company Name</b>
            <div className='col-md-12 mb-3'>
              <div className='form-group'>
                <Field
                  name='company_name'
                  placeholder='Company name'
                  className={`form-control ${
                    touched.company_name && errors.company_name
                      ? 'is-invalid'
                      : ''
                  }`}
                />
                <ErrorMessage
                  component='div'
                  name='company_name'
                  className='invalid-feedback'
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <b className='register_form_label'>Company Address</b>
            <div className='col-md-12 mb-3'>
              <div className='form-group'>
                <Field
                  name='company_address'
                  placeholder='Company address'
                  className={`form-control ${
                    touched.company_address && errors.company_address
                      ? 'is-invalid'
                      : ''
                  }`}
                />
                <ErrorMessage
                  component='div'
                  name='company_address'
                  className='invalid-feedback'
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <b className='register_form_label'>ZIP/Postal Code</b>
            <div className='col-md-12 mb-3'>
              <div className='form-group'>
                <Field
                  name='zip_code'
                  placeholder='ZIP/Postal code'
                  className={`form-control ${
                    touched.zip_code && errors.zip_code ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage
                  component='div'
                  name='zip_code'
                  className='invalid-feedback'
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <b className='register_form_label'>Country</b>
            <div className='col-md-12 mb-3'>
              <div className='form-group'>
                <Field
                  name='country'
                  placeholder='Country'
                  className={`form-control ${
                    touched.country && errors.country ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage
                  component='div'
                  name='country'
                  className='invalid-feedback'
                />
              </div>
            </div>
          </div>
          <div className='row'>
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
                <button type='submit' className='btn btn-primary mb-3 w-100'>
                  ENROLL
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  ) : (
    <Formik
      initialValues={initialValue}
      validationSchema={signUpSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValidating, values }) => (
        <Form>
          <div className='row'>
            <b className='register_form_label'>Name</b>
            <div className='col-md-6'>
              <div className='form-group mb-3'>
                <Field
                  name='first_name'
                  placeholder='First name'
                  className={`form-control ${
                    touched.first_name && errors.first_name ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage
                  component='div'
                  name='first_name'
                  className='invalid-feedback'
                />
              </div>
            </div>
            <div className='col-md-6 mb-3'>
              <div className='form-group'>
                <Field
                  name='last_name'
                  placeholder='Last name'
                  className={`form-control ${
                    touched.last_name && errors.last_name ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage
                  component='div'
                  name='last_name'
                  className='invalid-feedback'
                />
              </div>
            </div>
          </div>
          <b className='register_form_label'>Timber Operator License Number</b>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className='col-md-11'>
              <div className='form-group mb-3'>
                <Field
                  name='operator_number'
                  placeholder='Timber Operator License Number'
                  className={`form-control ${
                    touched.operator_number && errors.operator_number
                      ? 'is-invalid'
                      : ''
                  }`}
                />

                <ErrorMessage
                  component='div'
                  name='operator_number'
                  className='invalid-feedback'
                />
              </div>
            </div>
            <div style={{ marginLeft: 10, cursor: 'pointer' }}>
              <Tooltip title='Question' arrow>
                <HelpOutlineSharpIcon />
              </Tooltip>
            </div>
          </div>
          <div className='row'>
            <b className='register_form_label'>Email</b>
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
          </div>
          <div className='row'>
            {/* <b className="register_form_label">Address</b>
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <Field
                                    name="address"
                                    placeholder="Address"
                                    className={`form-control ${
                                        touched.address && errors.address ? "is-invalid" : ""
                                    }`}
                                />
                                <ErrorMessage component="div" name="address" className="invalid-feedback"/>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <Field
                                    name="city"
                                    placeholder="City"
                                    className={`form-control ${
                                        touched.city && errors.city ? "is-invalid" : ""
                                    }`}
                                />
                                <ErrorMessage component="div" name="city" className="invalid-feedback"/>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <Field
                                    name="zip_code"
                                    placeholder="Zip code"
                                    className={`form-control ${
                                        touched.zip_code && errors.zip_code ? "is-invalid" : ""
                                    }`}
                                />
                                <ErrorMessage
                                    component="div"
                                    name="zip_code"
                                    className="invalid-feedback"
                                />
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <Field
                                    // type={'number'}
                                    name="phone"
                                    placeholder="Phone"
                                    className={`form-control ${
                                        touched.phone && errors.phone ? "is-invalid" : ""
                                    }`}
                                />
                                <ErrorMessage component="div" name="phone" className="invalid-feedback"/>
                            </div>
                        </div> */}
            <b className='register_form_label'>Password</b>
            <div className='col-md-12 mb-3'>
              <div className='form-group'>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Password'
                  className={`form-control ${
                    touched.password && errors.password ? 'is-invalid' : ''
                  }`}
                />
                <i
                  className={`fa ${
                    !showPassword ? 'fa-eye' : 'fa-eye-slash'
                  } fa-lg password_eye`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
          </div>
          <div className='row pass-requirements'>
            <div className='col-md-6'>
              <ul>
                <>
                  <li
                    style={{ fontSize: '12px' }}
                    className={`${
                      !lengthRegex.test(values.password)
                        ? touched.password && errors.password
                          ? 'password_error'
                          : ''
                        : 'password_success'
                    }`}
                  >
                    At least 8 Characters
                  </li>
                  <li
                    style={{ fontSize: '12px' }}
                    className={`${
                      !upperCaseRegex.test(values.password) ||
                      !lowerCaseRegex.test(values.password)
                        ? touched.password && errors.password
                          ? 'password_error'
                          : ''
                        : 'password_success'
                    }`}
                  >
                    Upper & lower case
                  </li>
                </>
              </ul>
            </div>
            <div className='col-md-6'>
              <ul>
                <>
                  <li
                    style={{ fontSize: '12px' }}
                    className={`${
                      !specialCharacterRegex.test(values.password)
                        ? touched.password && errors.password
                          ? 'password_error'
                          : ''
                        : 'password_success'
                    }`}
                  >
                    Special character
                  </li>
                  <li
                    style={{ fontSize: '12px' }}
                    className={`${
                      !numberRegex.test(values.password)
                        ? touched.password && errors.password
                          ? 'password_error'
                          : ''
                        : 'password_success'
                    }`}
                  >
                    At least one number
                  </li>
                </>
              </ul>
            </div>
          </div>
          <div className='row'>
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
                <button type='submit' className='btn btn-primary mb-3 w-100'>
                  NEXT
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LTORegister
