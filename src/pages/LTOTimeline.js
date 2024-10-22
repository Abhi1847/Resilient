import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import Grid from '@mui/material/Grid'
import UserInfoCard from '../components/UserInfoCard'
import { authenticate, setDisplayLoader } from '../redux/actions/auth'
import {
  getActiveContractListing,
  getEmailListing,
  getLTOListingData
} from '../redux/actions/other'
import { useDispatch, useSelector } from 'react-redux'
import EmailIcon from '@mui/icons-material/Email'
import { toast } from 'react-toastify'
import { common_geo_json } from '../helpers/common_data'
import DirectionsIcon from '@mui/icons-material/Directions'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import JPAFooter from '../components/layout/JPAFooter'
import AddIcon from '@mui/icons-material/Add'
import { BaseColor } from '../styles/Colors'
import { makeStyles } from '@mui/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import LTODetailModal from '../components/modal/LTODetailModal'
import Pagination from '@mui/material/Pagination'
import SendEmail from '../components/modal/SendEmail'
import ImagePreview from '../components/modal/ImagePreview'
import moment from 'moment'
import LtoTab from '../components/LtoTab'
import Inbox from '../components/timeline/Inbox'

const useStyles = makeStyles({
  customCheckbox: {
    '&.Mui-checked': {
      color: BaseColor.lemonGreen // Change this to the desired color
    },
    '&.MuiCheckbox-root': {
      // You can add more general styles for the checkbox root here
    }
  }
})

const LTOTimeline = () => {
  const dispatch = useDispatch()
  const authData = useSelector(state => state.auth)
  const [auth, setAuth] = useState(false)
  const [cardListing, setCardListing] = useState([])
  const [ltoDetailsModal, setLTODetailsDetailsModal] = useState(false)
  const [imagePreview, setImagePreview] = useState(false)
  const [defaultCardData, setDefaultCardData] = useState({})
  console.log('defaultCardData==>>>', defaultCardData)
  const [geoJson, setGeoJson] = useState(common_geo_json)
  const [email, setEmail] = useState()
  const [pageSize, setPageSize] = useState(0)
  const [page, setPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState('all')
  const [bidInput, setBidInput] = useState(false)
  const [treatmentFilterStatus, setTreatmentFilterStatus] = useState(
    'estimate_of_biomass_detected_20'
  )
  const [index, setIndex] = useState(0)
  const [openEmailModal, setOpenEmailModal] = useState(false)
  const { user } = useSelector(state => state.auth)

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  // Get the current date
  let currentDate = moment()

  // Format the date as "Wednesday, October 4"
  let formattedDate = currentDate.format('dddd, MMMM D')

  const closeSendEmailModal = () => {
    setOpenEmailModal(false)
    setLTODetailsDetailsModal(false)
  }

  useEffect(() => {
    dispatch(setDisplayLoader(true))
    if (auth == false) {
      dispatch(authenticate())
        .then(response => {
          setAuth(true)
          // loadMapData()
          loadCardData()
        })
        .catch(() => {
          setAuth(false)
          dispatch(setDisplayLoader(false))
        })
    } else {
      // loadMapData()
      loadCardData()
    }
  }, [filterStatus, page])

  const loadCardData = () => {
    dispatch(getLTOListingData({ email: user?.email, page: 1 }))
      .then(response => {
        // setCardListing(response['data']);
        console.log('card data ===>> ', response)
        getDataTreatmentWise(response['data'], treatmentFilterStatus, 'card')
        setPageSize(response['total_page'])
        setPage(response.length > 0 ? response['current_page'] : 1)
        dispatch(setDisplayLoader(false))
      })
      .catch(() => {
        dispatch(setDisplayLoader(false))
      })
  }

  const openSendEmailModal = (email = '') => {
    let temp = []
    if (email !== '') {
      setEmail(email)
    } else {
      if (cardListing.length > 0) {
        cardListing.map(data => {
          temp.push(data['email'])
        })
        setEmail(temp.toString())
      } else {
        setEmail('')
        toast.error('No user found')
      }
    }
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
      dispatch(setDisplayLoader(false))
    }
  }

  const [emailData, setEmailData] = useState()
  const [selectedEmail, setSelectedEmail] = useState()
  const [activeData, setActiveData] = useState([])
  console.log('activeData active===========>>>>>>', activeData[0]?.properties)

  useEffect(() => {
    get_emails()
    getActiveContactData()
  }, [])

  const getActiveContactData = () => {
    dispatch(getActiveContractListing(user?.email)).then(response => {
      console.log('response active===========>>>>>>', response)
      setActiveData(response)
    })
  }

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

  const activeContractsArray = [
    {
      id: 1,
      project: 'Project 39A',
      owner: 'LandOwner 1',
      dateTime: 'Friday, 06 Oct 2023 - 9:00 AM',
      weight: 300,
      city: 'CA',
      county: 'Mendocino County'
    },
    {
      id: 2,
      project: 'Project 42B',
      owner: 'LandOwner 2',
      dateTime: 'Monday, 09 Oct 2023 - 11:00 AM',
      weight: 200,
      city: 'CA',
      county: 'Sonoma County'
    },
    {
      id: 1,
      project: 'Project 43A',
      owner: 'LandOwner 3',
      dateTime: 'Wednesday, 11 Oct 2023 - 2:00 PM',
      weight: 280,
      city: 'CA',
      county: 'San Luis Obispo County'
    }
  ]

  const DashboardData = () => {
    return (
      <Grid container lg={12} md={12} sm={12}>
        <Grid item sm={0.5} md={0.5} lg={0.5}></Grid>
        <Grid
          item
          lg={3}
          md={3}
          sm={12}
          xs={12}
          style={{
            padding: '30px 0px 0px 0px',
            // display: 'flex',
            // justifyContent: 'center',
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
            scrollbarWidth: 'none', // Firefox
            '-ms-overflow-style': 'none', // Internet Explorer and Edge
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              display: 'none' // Hide the scrollbar
            }
          }}
        >
          <div style={{ width: '80%', margin: 'auto' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <span
                style={{
                  color: 'black',
                  fontSize: 22,
                  fontWeight: 'bold'
                }}
              >
                Hello, {user?.name}
              </span>
              <span
                style={{
                  color: BaseColor.lemonGreen,
                  fontSize: 16,
                  fontWeight: 'normal'
                }}
              >
                {formattedDate}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
                flexDirection: 'row'
              }}
            >
              <span
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold'
                }}
              >
                Active Contracts
              </span>
            </div>

            {/* contract data */}
            <div
              style={{
                marginTop: 20
              }}
            >
              {activeData?.map((it, ii) => {
                console.log('it====>>>>>', it)
                return (
                  <div
                    style={{
                      flexDirection: 'column',
                      display: 'flex',
                      marginTop: 20
                    }}
                  >
                    <span
                      style={{
                        color: BaseColor.greyTxt,
                        fontWeight: 'bold',
                        fontSize: 16
                      }}
                    >
                      {it?.properties?.name}
                    </span>
                    <span
                      style={{
                        color: BaseColor.greyTxt,
                        fontWeight: 'normal',
                        fontSize: 12,
                        marginTop: -5
                      }}
                    >
                      {it?.properties?.email}
                    </span>
                    <span
                      style={{
                        color: BaseColor.greyTxt,
                        fontWeight: 'normal',
                        fontSize: 12,
                        marginTop: -8
                      }}
                    >
                      {it?.properties?.phone}
                    </span>
                    <span
                      style={{
                        color: BaseColor.greyTxt,
                        fontWeight: 'normal',
                        fontSize: 14,
                        marginTop: -10
                      }}
                    >
                      {it?.properties?.address}
                    </span>
                    <div
                      style={{
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setDefaultCardData(it)
                        setLTODetailsDetailsModal(true)
                      }}
                    >
                      <span
                        style={{
                          textDecoration: 'underline',
                          color: BaseColor.greyTxt,
                          fontSize: 14
                        }}
                      >
                        + View Details
                      </span>
                    </div>
                    <div
                      style={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'row'
                      }}
                    >
                      <div
                        style={{
                          background: BaseColor.lemonGreen,
                          borderRadius: 13,
                          padding: '0px 10px',
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center'
                          // marginLeft: 20
                        }}
                      >
                        <DirectionsIcon
                          style={{
                            color: 'white'
                          }}
                        />
                        <span
                          style={{
                            color: 'white',
                            fontWeight: 'semi-bold',
                            marginLeft: 5,
                            fontSize: 14
                          }}
                        >
                          Directions
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              style={{
                marginTop: 50,
                display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  background: BaseColor.lemonGreen,
                  borderRadius: 10,
                  width: 30,
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <AddIcon
                  style={{
                    color: 'white'
                  }}
                />
              </div>
              <span
                style={{
                  marginLeft: 10,
                  fontWeight: 'bold'
                }}
              >
                Schedule a New Pickup
              </span>
            </div>
          </div>
        </Grid>
        {/* <Grid item lg={1} md={1} sm={1}></Grid> */}
        <Grid
          item
          lg={8}
          md={8}
          sm={12}
          xs={12}
          style={{
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
            scrollbarWidth: 'none', // Firefox
            '-ms-overflow-style': 'none', // Internet Explorer and Edge
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              display: 'none' // Hide the scrollbar
            }
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '8%',
                flexDirection: 'row'
              }}
            >
              <span
                style={{
                  color: 'black',
                  fontSize: 24,
                  fontWeight: 'bold'
                }}
              >
                Invitations to Bid
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <div>
                <LocationOnIcon
                  style={{
                    fontSize: 18,
                    color: BaseColor.lemonGreen
                  }}
                />
                <span
                  style={{
                    fontSize: 14,
                    color: BaseColor.lemonGreen,
                    marginLeft: 5
                  }}
                >
                  {'Location, CA - 50 miles'}
                </span>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    background: BaseColor.lemonGreen,
                    borderRadius: 60,
                    padding: '0px 20px',
                    // marginRight: 20,
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => {
                    setOpenEmailModal(true)
                    setEmail(user?.email)
                  }}
                >
                  <EmailIcon
                    style={{
                      color: 'white'
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 'semi-bold',
                      color: 'white',
                      marginLeft: 5,
                      fontSize: 14
                    }}
                  >
                    Message
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Grid container spacing={3}>
            {authData.displayLoader ? (
              <div
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  height: 600,
                  width: '100%'
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress
                    style={{
                      color: BaseColor.lemonGreen
                    }}
                  />
                </Box>
              </div>
            ) : cardListing.length === 0 ? (
              <div
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  height: 600,
                  width: '100%'
                }}
              >
                <span>No Properties Assigned</span>
              </div>
            ) : (
              cardListing?.map((data, i) => {
                console.log('ltodata===>>>>', data)
                return (
                  <Grid
                    item
                    lg={4}
                    md={6}
                    sm={12}
                    xs={12}
                    style={{ width: '100%' }}
                  >
                    <UserInfoCard
                      lto_card={user.user_type === 'lto' ? true : false}
                      data={data?.properties}
                      key={i}
                      handleOpen={openSendEmailModal}
                      loadCardData={loadCardData}
                      openModal={() => {
                        setDefaultCardData(data)
                        setLTODetailsDetailsModal(true)
                      }}
                      handleImagePreview={() => {
                        setDefaultCardData(data)
                        setLTODetailsDetailsModal(false)
                        setImagePreview(true)
                      }}
                    />
                  </Grid>
                )
              })
            )}

            {cardListing.length > 12 && (
              <Pagination
                className='justify-content-around d-flex shadow-none w-100 mt-2'
                count={pageSize}
                page={page}
                onChange={handlePageChange}
                variant='outlined'
                color='primary'
                shape='rounded'
              />
            )}
          </Grid>
        </Grid>
        <Grid item sm={0.5} md={0.5} lg={0.5} style={{}}></Grid>
      </Grid>
    )
  }

  return (
    <>
      <Grid
        container
        lg={12}
        md={12}
        sm={12}
        style={{
          flexDirection: 'row',
          display: 'flex'
          //   padding: 30
        }}
      >
        <div style={{ marginTop: 20, width: '100%' }}>
          {/* // Tabs */}
          <LtoTab
            handleChanges={value => {
              setIndex(value)
            }}
          />
        </div>
        {index == 0 ? (
          // dashboard
          DashboardData()
        ) : (
          <Inbox
            email={user?.email}
            emailData={emailData}
            selectedEmail={selectedEmail}
          />
        )}
      </Grid>
      <JPAFooter />

      {/* DETAIL MODAL */}
      {!openEmailModal && !imagePreview && ltoDetailsModal && (
        <LTODetailModal
          ltoDetailsModal={ltoDetailsModal}
          handleCloseModal={() => {
            setLTODetailsDetailsModal(false)
          }}
          defaultCardData={defaultCardData}
          geoJson={geoJson}
        />
      )}

      {imagePreview && (
        <ImagePreview
          open={imagePreview}
          handleClose={() => {
            setImagePreview(false)
            setLTODetailsDetailsModal(false)
          }}
          img_url={defaultCardData?.properties?.img_url}
        />
      )}

      {openEmailModal && (
        <SendEmail
          open={openEmailModal}
          handleClose={closeSendEmailModal}
          email={email}
          userType={'lto'}
        />
      )}
    </>
  )
}

export default LTOTimeline
