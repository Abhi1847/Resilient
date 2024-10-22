import React, { Fragment, useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import MapComponent from '../components/MapComponent'
import Grid from '@mui/material/Grid'
import UserInfoCard from '../components/UserInfoCard'
import { authenticate } from '../redux/actions/auth'
import {
  getDataForCard,
  getDataForMap,
  getEmailListing
} from '../redux/actions/other'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import EmailIcon from '@mui/icons-material/Email'
import SendEmail from '../components/modal/SendEmail'
import { toast } from 'react-toastify'
import CardHeader from '@mui/material/CardHeader'
import Skeleton from '@mui/material/Skeleton'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Pagination from '@mui/material/Pagination'
import {
  common_geo_json,
  property_status,
  treatment_filter_options
} from '../helpers/common_data'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LTO from '../components/modal/LTO'
import LtoTab from '../components/LtoTab'
import Inbox from '../components/timeline/Inbox'

const AdminTimeline = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [auth, setAuth] = useState(false)
  const [cardListing, setCardListing] = useState([])
  const [mapListing, setMapListing] = useState([])
  const [geoJson, setGeoJson] = useState(common_geo_json)
  const [openEmailModal, setOpenEmailModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState()
  const [pageSize, setPageSize] = useState(0)
  const [page, setPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState('all')
  const [treatmentFilterStatus, setTreatmentFilterStatus] = useState(
    'estimate_of_biomass_detected_20'
  )
  const [openLTOModal, setOpenLTOModal] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (auth === false) {
      dispatch(authenticate())
        .then(response => {
          setAuth(true)
          loadMapData()
          loadCardData()
        })
        .catch(() => {
          setAuth(false)
        })
    } else {
      loadMapData()
      loadCardData()
    }
  }, [geoJson, filterStatus, page])

  const loadMapData = () => {
    dispatch(getDataForMap({ geojson: geoJson, status: filterStatus }))
      .then(response => {
        // setMapListing(response);
        getDataTreatmentWise(response, treatmentFilterStatus, 'map')
      })
      .catch(() => {})
  }

  const loadCardData = () => {
    setIsLoading(true)
    dispatch(
      getDataForCard({ geojson: geoJson, page: page, status: filterStatus })
    )
      .then(response => {
        // setCardListing(response['data']);
        getDataTreatmentWise(response['data'], treatmentFilterStatus, 'card')
        setPageSize(response['total_page'])
        setPage(response['data'].length > 0 ? response['current_page'] : 1)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  const changedData = data => {
    setGeoJson(data)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const openSendEmailModal = (email = '') => {
    let temp = []
    if (email !== '') {
      setEmail(email)
      setOpenEmailModal(true)
    } else {
      if (cardListing.length > 0) {
        cardListing.map(data => {
          temp.push(data['email'])
        })
        setEmail(temp.toString())
        setOpenEmailModal(true)
      } else {
        setEmail('')
        toast.error('No user found')
      }
    }
  }

  const closeSendEmailModal = () => {
    setEmail('')
    setOpenEmailModal(false)
  }

  const handleChangeFilter = event => {
    setFilterStatus(event.target.value)
  }

  const handleChangeTreatmentFilter = event => {
    setTreatmentFilterStatus(event.target.value)

    getDataTreatmentWise(mapListing, event.target.value, 'map')
    getDataTreatmentWise(cardListing, event.target.value, 'card')
  }

  const getDataTreatmentWise = (data, treatmentType, type) => {
    if (type === 'card') {
      data.forEach(v => {
        v['estimate_of_biomass_detected'] = v[treatmentType]
        if (treatmentType === 'estimate_of_biomass_detected_20') {
          v['branch'] = v['branch_20']
          v['foliage'] = v['foliage_20']
          v['stem_4_to_6'] = v['foliage_20']
          v['stem_6_to_9'] = v['foliage_20']
          v['stem_9_plus'] = v['foliage_20']
        } else {
          v['branch'] = v['branch_40']
          v['foliage'] = v['foliage_40']
          v['stem_4_to_6'] = v['stem_4_to_6_40']
          v['stem_6_to_9'] = v['stem_6_to_9_40']
          v['stem_9_plus'] = v['stem_9_plus_40']
        }
      })
      setCardListing(data)
    } else {
      data.forEach(
        v =>
          (v['properties']['estimate_of_biomass_detected'] =
            v['properties'][treatmentType])
      )
      setMapListing(data)
    }
  }

  const closeLTOModal = () => {
    setOpenLTOModal(false)
  }

  const [emailData, setEmailData] = useState()
  const [selectedEmail, setSelectedEmail] = useState()

  useEffect(() => {
    get_emails()
  }, [])

  const get_emails = () => {
    // dispatch(setLoading(true));
    dispatch(getEmailListing(user?.email))
      .then(response => {
        let valid = true

        if (typeof response == 'object') {
          for (const email of response) {
            if (
              !email.hasOwnProperty('sender') ||
              !email.hasOwnProperty('recipient') ||
              !email.hasOwnProperty('subject') ||
              !email.hasOwnProperty('body') ||
              !email.hasOwnProperty('time')
            ) {
              valid = false
              break
            }
          }
        } else valid = false

        if (valid) {
          // dispatch(setLoading(false));
          setEmailData(response)
          if (response.length > 0) {
            setSelectedEmail(response[0])
          }
        } else
          toast.error(
            response?.data
              ? response?.data
              : 'Oops! Something went wrong. Please try again.'
          )
      })
      .catch(error => {
        console.log('error ===>>>> ', error)
        // dispatch(setLoading(false))
      })
  }

  return (
    <div>
      <div style={{ marginTop: 20, width: '100%' }}>
        {/* // Tabs */}
        <LtoTab
          handleChanges={value => {
            setIndex(value)
          }}
        />
      </div>
      <div style={{ marginTop: 30 }}>
        {index == 0 ? (
          // dashboard
          <>
            {auth ? (
              <>
                <div>
                  <div className='col-sm-12 col-md-8 col-lg-8 left-map-section'>
                    <MapComponent
                      className={'map-page'}
                      center={[36.646755, -118.705333]}
                      data={mapListing}
                      zoom={7}
                      changedData={changedData}
                      jpa={true}
                    />
                  </div>
                  <div
                    className='col-sm-12 col-md-4 col-lg-4 right-list-section'
                    style={{ marginTop: '53px' }}
                  >
                    {user && user['user_type'] !== 'lto' && (
                      <div className='row pt-2'>
                        {/* <div className='col-md-6'>
                      <Button
                        className='w-100 rounded-0 bg-green'
                        style={{ fontSize: '12px' }}
                        variant='contained'
                        startIcon={<CheckCircleIcon />}
                        onClick={() => setOpenLTOModal(true)}
                      >
                        Verify LTO Account
                      </Button>
                    </div> */}
                        <div className='col-md-12'>
                          <Button
                            className='w-100 rounded-0 bg-green'
                            style={{ fontSize: '12px' }}
                            variant='contained'
                            startIcon={<EmailIcon />}
                            onClick={() => openSendEmailModal()}
                          >
                            Send mail to all
                          </Button>
                        </div>
                      </div>
                    )}
                    <div className='row pt-3'>
                      <div
                        className={
                          user && user['user_type'] !== 'lto'
                            ? 'col-md-6'
                            : 'col-md-12'
                        }
                      >
                        <FormControl className='w-100 h-100' size='small'>
                          <InputLabel id='demo-select-small'>
                            Filter by
                          </InputLabel>
                          <Select
                            className={'rounded-0 h-100'}
                            labelId='demo-select-small'
                            id='demo-select-small'
                            value={filterStatus}
                            label='Filter by'
                            onChange={handleChangeFilter}
                          >
                            {property_status().map(
                              (option, index) =>
                                option !== 'sign up' && (
                                  <MenuItem
                                    key={index}
                                    className={'text-capitalize'}
                                    value={option}
                                  >
                                    <Typography
                                      variant='caption'
                                      display='block'
                                    >
                                      {option}
                                    </Typography>
                                  </MenuItem>
                                )
                            )}
                          </Select>
                        </FormControl>
                      </div>
                      {user && user['user_type'] !== 'lto' && (
                        <div className='col-md-6'>
                          <FormControl className='w-100 h-100' size='small'>
                            <InputLabel id='demo-select-small'>
                              Treatment Type
                            </InputLabel>
                            <Select
                              className={'rounded-0 h-100'}
                              labelId='demo-select-small'
                              id='demo-select-small'
                              value={treatmentFilterStatus}
                              label='Treatment Type'
                              onChange={handleChangeTreatmentFilter}
                            >
                              {treatment_filter_options().map((data, index) => (
                                <MenuItem
                                  key={index}
                                  className={'text-capitalize'}
                                  value={data['key']}
                                >
                                  <Typography variant='caption' display='block'>
                                    {data['value']}
                                  </Typography>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      )}
                    </div>
                    <div className='row pt-2'>
                      {isLoading ? (
                        <>
                          {[0, 1]?.map((data, i) => {
                            return (
                              <Grid
                                key={i}
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                container
                              >
                                <Card className={'w-100'}>
                                  <CardHeader
                                    avatar={
                                      <Skeleton
                                        animation='wave'
                                        variant='circular'
                                        width={40}
                                        height={40}
                                      />
                                    }
                                    action={null}
                                    title={
                                      <Skeleton
                                        animation='wave'
                                        height={10}
                                        width='80%'
                                        style={{ marginBottom: 6 }}
                                      />
                                    }
                                    subheader={
                                      <Skeleton
                                        animation='wave'
                                        height={10}
                                        width='40%'
                                      />
                                    }
                                  />
                                  <Skeleton
                                    sx={{ height: 190 }}
                                    animation='wave'
                                    variant='rectangular'
                                  />
                                  <CardContent>
                                    <Fragment>
                                      <Skeleton
                                        animation='wave'
                                        height={10}
                                        style={{ marginBottom: 6 }}
                                      />
                                      <Skeleton
                                        animation='wave'
                                        height={10}
                                        width='80%'
                                      />
                                    </Fragment>
                                  </CardContent>
                                </Card>
                              </Grid>
                            )
                          })}
                        </>
                      ) : (
                        <>
                          {cardListing.length > 0 ? (
                            <>
                              {cardListing?.map((data, i) => {
                                return (
                                  <UserInfoCard
                                    data={data}
                                    key={i}
                                    handleOpen={openSendEmailModal}
                                    loadCardData={loadCardData}
                                  />
                                )
                              })}
                            </>
                          ) : (
                            <>
                              <div className='row'>
                                <div className='col-12 p-5'>
                                  <Typography variant='h4' gutterBottom>
                                    No matching results
                                  </Typography>
                                  <Typography variant='body2' gutterBottom>
                                    Try changing your search.
                                  </Typography>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )}
                      <Pagination
                        className='justify-content-around d-flex shadow-none w-100 mt-2'
                        count={pageSize}
                        page={page}
                        onChange={handlePageChange}
                        variant='outlined'
                        color='primary'
                        shape='rounded'
                      />
                    </div>
                  </div>
                </div>
                {openLTOModal && (
                  <LTO
                    openLTOModal={openLTOModal}
                    closeLTOModal={closeLTOModal}
                  />
                )}
                <SendEmail
                  open={openEmailModal}
                  handleClose={closeSendEmailModal}
                  email={email}
                />
              </>
            ) : null}
          </>
        ) : (
          <Inbox
            email={user?.email}
            emailData={emailData}
            selectedEmail={selectedEmail}
          />
        )}
      </div>
    </div>
  )
}

export default AdminTimeline
