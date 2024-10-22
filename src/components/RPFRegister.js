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
import Select from 'react-select'
import { Padding } from '@mui/icons-material'

const RPFRegister = ({ changeBottomStepper = () => { }, stepper = 0 }) => {

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
    RPF_number: '',
    email: '',
    address: '',
    city: '',
    zip_code: '',
    selectedCounty: '',
    state: '',
    phone_number: '',
    selectedTimber: [],
    selectedCFIP: '',
    password: '',
  }

  const initialValue1 = {
    selectedCounty: '',
    state: '',
    phone_number: '',
    selectedTimber: [],
    selectedCFIP: '',
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
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    RPF_number: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid email address format')
      .required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    zip_code: Yup.string().required('Required'),
    password: Yup.string()
      .required('Please Enter your password')
      .matches(lengthRegex, 'Must Contain 8 Characters')
      .matches(lowerCaseRegex, 'Must Contain One Lowercase')
      .matches(upperCaseRegex, 'Must Contain One Uppercase')
      .matches(specialCharacterRegex, 'Must Contain One Special Case Character')
      .matches(numberRegex, 'Must Contain One Number'),

  })

  const signUpSchema2 = Yup.object().shape({
    state: Yup.string().required('Required'),
    phone_number: Yup.string()
      .matches(phoneRegex, 'Invalid phone')
      .required('Phone is required'),
    selectedTimber: Yup.array().min(1, "select atlest one option").required("This field is required"),
    selectedCFIP: Yup.string().required("This field is required"),
    selectedCounty: Yup.string().required("This field is required"),
  })

  const handleSubmit = values => {
    setStep(1)
    // setFormValues(values)
  }

  const handleSubmit1 = values => {
    // setFormValues({ ...formValues, values })
    console.log('submited value is:', values)

    const param = {
      first_name: values.first_name || '',
      last_name: values.last_name || '',
      license_number: values.RPF_number || '',
      email: values.email || '',
      address: values.address || '',
      city: values.city || '',
      zip_code: values.zip_code || '',
      county: values.selectedCounty || '',
      state: values.state || '',
      phone: values.phone_number || '',
      timber_region_served: values.selectedTimber || [],
      cfip_stewardship: values.selectedCFIP || '',
      password: values.password || '',
      type: 'RPF',
    };

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


  const [cfipOptions, setCfipOptions] = useState([]);

  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/vitalii-z8i/bbb96d55d57f1e4342c3408e7286d3f2/raw/3b9b1fba8b226359d5a025221bb2688e9807c674/counties_list.json');
        const data = await response.json();

        const californiaCounties = data.filter(county => county.State === 'California');

        const options = californiaCounties.map(county => ({
          value: county.County,
          label: county.County.replace(' County', ''),
        }));

        setCfipOptions(options);
      } catch (error) {
        console.error('Error fetching counties:', error);
      }
    };

    fetchCounties();
  }, []);

  const timberRegion = [
    'Statewide',
    'North Coast',
    'Northern Sierra',
    'Southern Sierra',
    'Cascades',
    'South Coast',
  ]

  return step === 0 ? (
    <Formik
      initialValues={initialValue}
      validationSchema={signUpSchema1}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValidating, values, setFieldValue }) => (
        <Form className='rpf-form'>


          {/* {first name and lastname} */}
          <div className='row'>
            <b className='register_form_label'>Name</b>
            <div className='col-md-6'>
              <div className='form-group mb-3'>
                <Field
                  name='first_name'
                  placeholder='First name'
                  className={`form-control ${touched.first_name && errors.first_name ? 'is-invalid' : ''
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
                  className={`form-control ${touched.last_name && errors.last_name ? 'is-invalid' : ''
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
          {/* {RPF licence number} */}
          <b className='register_form_label'>RPF License Number</b>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className='col-md-11'>
              <div className='form-group mb-3'>
                <Field
                  name='RPF_number'
                  placeholder='RPF License Number'
                  className={`form-control ${touched.RPF_number && errors.RPF_number
                    ? 'is-invalid'
                    : ''
                    }`}
                />

                <ErrorMessage
                  component='div'
                  name='RPF_number'
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
          {/* {email} */}
          <div className='row'>
            <b className='register_form_label'>Email</b>
            <div className='col-md-12 mb-3'>
              <div className='form-group'>
                <Field
                  name='email'
                  placeholder='Email address'
                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''
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
          {/* {address} */}
          <div className='row'>
            <b className='register_form_label'>Address</b>
            <div className='col-md-12 mb-3'>
              <div className='form-group'>
                <Field
                  name='address'
                  placeholder='Address'
                  className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''
                    }`}
                />
                <ErrorMessage
                  component='div'
                  name='address'
                  className='invalid-feedback'
                />
              </div>
            </div>
          </div>
          {/* {city} */}
          <div className='row'>
            <div className='col-md-6'>
              <b className='register_form_label'>City</b>
              <div className='form-group mb-3'>
                <Field
                  name='city'
                  placeholder='City name'
                  className={`form-control ${touched.city && errors.city ? 'is-invalid' : ''
                    }`}
                />
                <ErrorMessage
                  component='div'
                  name='city'
                  className='invalid-feedback'
                />
              </div>
            </div>

            <div className='col-md-6 '>
              <b className='register_form_label'>ZIP Code</b>
              <div className='form-group mb-3'>
                <Field
                  name='zip_code'
                  placeholder='ZIP Code'
                  className={`form-control ${touched.zip_code && errors.zip_code ? 'is-invalid' : ''
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
          {/* {password} */}
          <div className='row'>
            <b className='register_form_label'>Password</b>
            <div className='col-md-12 mb-3'>
              <div className='form-group'>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Password'
                  className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''
                    }`}
                />
                <i
                  className={`fa ${!showPassword ? 'fa-eye' : 'fa-eye-slash'
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
                    className={`${!lengthRegex.test(values.password)
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
                    className={`${!upperCaseRegex.test(values.password) ||
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
                    className={`${!specialCharacterRegex.test(values.password)
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
                    className={`${!numberRegex.test(values.password)
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
              ) :
                <button type='submit' className='btn btn-primary mb-3 w-100'>
                  Submit
                </button>
              }

            </div>
          </div>
        </Form>

      )}
    </Formik>
  ) : (<Formik
    initialValues={initialValue1}
    validationSchema={signUpSchema2}
    onSubmit={handleSubmit1}
  >
    {({ errors, touched, isValidating, values, setFieldValue }) => (

      <Form className='rpf-form'>

        {/* {State} */}
        <div className='row'>
          <b className='register_form_label'>State</b>
          <div className='col-md-12 mb-3'>
            <div className='form-group'>
              <Field
                name='state'
                placeholder='Enter state'
                className={`form-control ${touched.state && errors.state ? 'is-invalid' : ''
                  }`}
              />
              <ErrorMessage
                component='div'
                name='state'
                className='invalid-feedback'
              />
            </div>
          </div>
        </div>
        {/* {Phone number} */}
        <div className='row'>
          <b className='register_form_label'>Phone Number</b>
          <div className='col-md-12 mb-3'>
            <div className='form-group'>
              <Field
                name='phone_number'
                placeholder='Phone Number'
                className={`form-control ${touched.phone_number && errors.phone_number ? 'is-invalid' : ''
                  }`}
              />
              <ErrorMessage
                component='div'
                name='phone_number'
                className='invalid-feedback'
              />
            </div>
          </div>
        </div>
        {/* {Select County} */}
        <div className='row'>
          <b className='register_form_label' htmlFor="selectedCounty">Select County</b>
          <div className='col-md-12 mb-3'>
            <div className='form-group'>
              <Field as="select" name="selectedCounty" className={`form-control ${touched.selectedCounty && errors.selectedCounty ? 'is-invalid' : ''}`}>
                <option value="">Select County</option>
                {cfipOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                component='div'
                name='selectedCounty'
                className='invalid-feedback'
              />
            </div>
          </div>
        </div>
        {/* {Timber Region Served} */}
        <div className='row'>
          <b className='register_form_label'>Timber Region Served</b>
          <div className='col-md-12 mb-3'>

            <Select
              isMulti
              name='selectedTimber'
              options={timberRegion.map((region) => ({
                value: region,
                label: region,
              }))}
              onChange={(selectedOptions) => setFieldValue('selectedTimber', selectedOptions.map(option => option.value))}
              className={`form-control unset-padding ${touched.selectedTimber && errors.selectedTimber ? 'is-invalid' : ''
                }`}
            />
            <ErrorMessage
              component='div'
              name='selectedTimber'
              className='invalid-feedback'
            />
          </div>
        </div>
        {/* {CFIP stewardship} */}
        <div className='row'>
          <b className='register_form_label' htmlFor="selectedCFIP">CFIP Stewardship</b>
          <div className='col-md-12 mb-3'>
            <div className='form-group'>
              <Field as="select" name="selectedCFIP" className={`form-control ${touched.selectedCFIP && errors.selectedCFIP ? 'is-invalid' : ''
                }`}>
                <option value="" label="Select CFIP Stewardship" />
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Field>
              <ErrorMessage
                component='div'
                name='selectedCFIP'
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
            ) :
              <button type='submit' className='btn btn-primary mb-3 w-100'>
                Submit
              </button>
            }
          </div>
        </div>
      </Form>

    )}
  </Formik>)
}

export default RPFRegister
