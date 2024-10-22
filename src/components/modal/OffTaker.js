import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addUpdateOffTaker,
  assignOffTaker,
  deleteOffTaker,
  getOffTakerListing,
  getLTOsListing,
  setLoading,
  inviteLTOOperators
} from '../../redux/actions/other'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import EnhancedTableHead from '../table/EnhancedTableHead'
import EnhancedTableToolbar from '../table/EnhancedTableToolbar'
import { getComparator, stableSort } from '../../helpers/common_data'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import Stack from '@mui/material/Stack'
import swal from 'sweetalert'
import EmailIcon from '@mui/icons-material/Email'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'

const ltoHeadCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email'
  },
  {
    id: 'company_name',
    numeric: false,
    disablePadding: false,
    label: 'Company name'
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'Address'
  },
  {
    id: 'license_number',
    numeric: false,
    disablePadding: false,
    label: 'License Number'
  },
  {
    id: 'distance_from_site',
    numeric: false,
    disablePadding: false,
    label: 'Distance'
  }
]
const OffTaker = ({
  openOffTakerModal,
  closeOffTakerModal,
  email,
  property_id
}) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [data, setData] = useState([])
  const [formType, setFormType] = React.useState('list')
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('first_name')
  const [selected, setSelected] = React.useState('')
  const initialValue = {
    first_name: '',
    last_name: '',
    personal_email: '',
    personal_contact: '',
    company_name: '',
    company_email: '',
    company_contact: '',
    distance_from_site: ''
  }
  const [offTakerInitialValue, setOffTakerInitialValue] =
    React.useState(initialValue)
  const offTakerSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    personal_email: Yup.string()
      .email('Invalid email address format')
      .required('Required'),
    personal_contact: Yup.string().required('Required'),
    company_name: Yup.string().required('Required'),
    company_email: Yup.string()
      .email('Invalid email address format')
      .required('Required'),
    company_contact: Yup.string().required('Required')
  })
  const [q, setQ] = useState('')
  const [searchParam] = useState(['name', 'company_name'])

  const ltoSearchList = search(stableSort(data, getComparator(order, orderBy)))

  useEffect(() => {
    getList()
  }, [])

  function search (items) {
    return items.filter(item => {
      return searchParam.some(newItem => {
        return (
          item[newItem]?.toString()?.toLowerCase()?.indexOf(q?.toLowerCase()) >
          -1
        )
      })
    })
  }

  // Get Off taker list
  const getList = () => {
    dispatch(setLoading(true))
    // dispatch(getOffTakerListing())
    dispatch(getLTOsListing({ property_id: property_id }))
      .then(response => {
        setData(response)
        // let valid = true

        // if (typeof response == 'object') {
        //   for (const offtaker of response) {
        //     if (
        //       !offtaker.hasOwnProperty('name') ||
        //       !offtaker.hasOwnProperty('email') ||
        //       !offtaker.hasOwnProperty('company_name') ||
        //       !offtaker.hasOwnProperty('address') ||
        //       !offtaker.hasOwnProperty('license_number')
        //     ) {
        //       valid = false
        //       break
        //     }
        //   }
        // } else valid = false
        // console.log('response =====>>>> ', valid, response)

        // if (valid) {
        //   setData(response)
        // } else toast.error('Oops! Something went wrong. Please try again.')

        dispatch(setLoading(false))
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }

  // On close modal of off taker list
  const onClose = (event, reason) => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return
    setSelected([])
    setOffTakerInitialValue(initialValue)
    closeOffTakerModal(false)
  }

  // Handle table sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  let status = []
  // Handle select single off taker
  const handleSelectOffTaker = (event, email, index) => {
    // single selection
    // const selectedIndex = selected.indexOf(email)
    // let newSelected = selectedIndex === -1 ? email : ''
    // setSelected(newSelected)

    // multiple selection
    status = data
    let updateAry = [...data]
    updateAry[index].check = !updateAry[index]?.check
    status = updateAry
    setSelected(status)
  }

  // Check off taker is selected or not
  const isSelectedOffTaker = email => selected.indexOf(email) !== -1

  // Update selected off taker to particular property
  const submitSelectedOffTaker = () => {
    const filteredEmail = selected.filter(item => item.check === true)
    let selectedEmails = []
    filteredEmail.map(item => {
      let em = item.email
      selectedEmails.push(em)
    })
    dispatch(setLoading(true))
    dispatch(
      inviteLTOOperators({
        email: selectedEmails,
        jpa_email: user.email,
        property_id: property_id
      })
    )
      .then(response => {
        setSelected('')
        closeOffTakerModal(true)
        dispatch(setLoading(false))
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }

  // Open add off taker form
  const addForm = () => {
    setOffTakerInitialValue(initialValue)
    setFormType('add')
  }

  // Open edit off taker form
  const editForm = param => {
    setOffTakerInitialValue({
      first_name: param['first_name'],
      last_name: param['last_name'],
      personal_email: param['personal_email'],
      personal_contact: param['personal_contact'],
      company_name: param['company_name'],
      company_email: param['company_email'],
      company_contact: param['company_contact']
    })
    setFormType('modify')
  }

  // Delete off taker
  const remove = email => {
    swal({
      title: 'Are you sure want to delete?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Yes']
    }).then(async willDelete => {
      if (willDelete) {
        dispatch(setLoading(true))
        dispatch(deleteOffTaker({ company_email: email }))
          .then(() => {
            const filteredPeople = data.filter(
              item => item.company_email !== email
            )
            setData(filteredPeople)
            dispatch(setLoading(false))
          })
          .catch(() => {
            dispatch(setLoading(false))
          })
      }
    })
  }

  // Submit Add/Edit off taker form
  const handleSubmit = values => {
    dispatch(setLoading(true))
    dispatch(addUpdateOffTaker(values, formType))
      .then(() => {
        if (formType === 'add') toast.success('Offtaker added successfully!')
        else if (formType === 'modify')
          toast.success('Offtaker updated successfully!')
        getList()
        setFormType('list')
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }
  const listData = search(stableSort(data, getComparator(order, orderBy)))

  return (
    <Dialog
      fullWidth={true}
      maxWidth={false}
      id='popupDialog'
      open={openOffTakerModal}
      onClose={onClose}
      scroll={'body'}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogContent>
        <div className='row'>
          <div className='col-md-12'>
            <h4 className='m-0 mb-2'>
              {formType === 'list' && <> Licensed Timber Operator </>}
              {formType === 'add' && 'Add Offtaker'}
              {formType === 'modify' && 'Update Offtaker'}
              <IconButton
                className={'float-end p-0'}
                color='inherit'
                onClick={onClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
            </h4>
            {formType === 'list' && (
              <div className='row mb-2'>
                <div className='col-md-8' />
                <div className='col-md-4'>
                  <div className='form-group d-flex justify-content-between'>
                    <input
                      type='search'
                      className='form-control rounded-0 w-100' // if button is displayed then w-75
                      placeholder='Search for...'
                      value={q}
                      onChange={e => setQ(e.target.value)}
                    />
                    {/* <Button className={'rounded-0'}
                                            variant="contained" onClick={() => addForm()}>
                                        New
                                    </Button> */}
                  </div>
                </div>
              </div>
            )}
            <Box sx={{ width: '100%' }}>
              {formType === 'list' ? (
                <>
                  <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
                    {/* {selected !== '' && (
                      <EnhancedTableToolbar
                        selectedOffTaker={selected}
                        submitOffTaker={submitSelectedOffTaker}
                      />
                    )} */}
                    <TableContainer sx={{ maxHeight: 500 }}>
                      <Table
                        stickyHeader
                        sx={{ minWidth: 750 }}
                        aria-labelledby='tableTitle'
                        size={'medium'}
                      >
                        <EnhancedTableHead
                          order={order}
                          orderBy={orderBy}
                          headCells={ltoHeadCells}
                          onRequestSort={handleRequestSort}
                          rowCount={data.length}
                        />
                        <TableBody>
                          {ltoSearchList.map((row, index) => {
                            // const isItemSelected = row?.check
                            // isSelectedOffTaker(
                            //   row.company_email
                            // )
                            const labelId = `enhanced-table-checkbox-${index}`
                            return (
                              <TableRow
                                hover
                                aria-checked={row?.check}
                                tabIndex={-1}
                                key={index}
                                selected={row?.check}
                              >
                                <TableCell padding='checkbox'>
                                  <Checkbox
                                    color='primary'
                                    checked={row?.check}
                                    onClick={event => {
                                      handleSelectOffTaker(
                                        event,
                                        row.email,
                                        index
                                      )
                                    }}
                                    inputProps={{
                                      'aria-labelledby': labelId
                                    }}
                                  />
                                </TableCell>
                                <TableCell style={{ minWidth: 150 }}>
                                  {row.name === 'None None' || row.name === ''
                                    ? '-'
                                    : row.name}
                                </TableCell>
                                <TableCell>{row?.email || '-'}</TableCell>
                                <TableCell>
                                  {row?.company_name || '-'}
                                </TableCell>
                                <TableCell>{row?.address || '-'}</TableCell>
                                <TableCell>
                                  {row?.license_number || '-'}
                                </TableCell>
                                <TableCell>
                                  {row?.distance_from_site || 'Not available'}
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                  {selected !== '' && (
                    <Button
                      className='rounded-0 align-self-end float-end'
                      variant='contained'
                      onClick={() => submitSelectedOffTaker()}
                      startIcon={<DoneIcon />}
                    >
                      Invite
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Formik
                    initialValues={offTakerInitialValue}
                    validationSchema={offTakerSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                  >
                    {({ errors, touched, resetForm, handleReset }) => (
                      <Form>
                        <div className='row'>
                          <div className='col-md-3 mb-3'>
                            <div className='form-group'>
                              <label>First name</label>
                              <Field
                                name='first_name'
                                placeholder=''
                                className={`form-control w-100 ${
                                  touched.first_name && errors.first_name
                                    ? 'is-invalid'
                                    : ''
                                }`}
                              />
                              <ErrorMessage
                                component='div'
                                name='first_name'
                                className='invalid-feedback'
                              />
                            </div>
                          </div>
                          <div className='col-md-3 mb-3'>
                            <div className='form-group'>
                              <label>Last name</label>
                              <Field
                                name='last_name'
                                placeholder=''
                                className={`form-control w-100 ${
                                  touched.last_name && errors.last_name
                                    ? 'is-invalid'
                                    : ''
                                }`}
                              />
                              <ErrorMessage
                                component='div'
                                name='last_name'
                                className='invalid-feedback'
                              />
                            </div>
                          </div>
                          <div className='col-md-3 mb-3'>
                            <div className='form-group'>
                              <label>Personal email</label>
                              <Field
                                name='personal_email'
                                placeholder=''
                                className={`form-control w-100 ${
                                  touched.personal_email &&
                                  errors.personal_email
                                    ? 'is-invalid'
                                    : ''
                                }`}
                              />
                              <ErrorMessage
                                component='div'
                                name='personal_email'
                                className='invalid-feedback'
                              />
                            </div>
                          </div>
                          <div className='col-md-3 mb-3'>
                            <div className='form-group'>
                              <label>Personal contact</label>
                              <Field
                                name='personal_contact'
                                placeholder=''
                                className={`form-control w-100 ${
                                  touched.personal_contact &&
                                  errors.personal_contact
                                    ? 'is-invalid'
                                    : ''
                                }`}
                              />
                              <ErrorMessage
                                component='div'
                                name='personal_contact'
                                className='invalid-feedback'
                              />
                            </div>
                          </div>
                          <div className='col-md-3 mb-3'>
                            <div className='form-group'>
                              <label>Company name</label>
                              <Field
                                name='company_name'
                                placeholder=''
                                className={`form-control w-100 ${
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
                          <div className='col-md-3 mb-3'>
                            <div className='form-group'>
                              <label>Company email</label>
                              <Field
                                name='company_email'
                                placeholder=''
                                disabled={formType === 'modify'}
                                className={`form-control w-100 ${
                                  touched.company_email && errors.company_email
                                    ? 'is-invalid'
                                    : ''
                                }`}
                              />
                              <ErrorMessage
                                component='div'
                                name='company_email'
                                className='invalid-feedback'
                              />
                            </div>
                          </div>
                          <div className='col-md-3 mb-3'>
                            <div className='form-group'>
                              <label>Company contact</label>
                              <Field
                                name='company_contact'
                                placeholder=''
                                className={`form-control w-100 ${
                                  touched.company_contact &&
                                  errors.company_contact
                                    ? 'is-invalid'
                                    : ''
                                }`}
                              />
                              <ErrorMessage
                                component='div'
                                name='company_contact'
                                className='invalid-feedback'
                              />
                            </div>
                          </div>
                          <div className='col-md-12'>
                            <Button
                              className={'rounded-0'}
                              variant='contained'
                              type='submit'
                            >
                              Save
                            </Button>
                            <Button
                              className={'rounded-0 ms-2'}
                              variant='outlined'
                              type='submit'
                              onClick={() => {
                                handleReset(resetForm)
                                setFormType('list')
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
            </Box>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OffTaker
