import axios from 'axios'
import authHeader from './auth-header'

const API_URL = process.env.REACT_APP_API_URL

const getUserDetail = email => {
  return axios.post(
    API_URL + '/get-geojson/user',
    { email },
    { headers: authHeader() }
  )
}

const getUserListing = () => {
  return axios.get(API_URL + '/get-geojson/jpa', { headers: authHeader() })
}

const getLTOListingData = data => {
  return axios.post(API_URL + '/lto/get-data', data, { headers: authHeader() })
}

const getUserListingBasedOnGeo = data => {
  return axios.post(API_URL + '/get-geojson/jpa', data, {
    headers: authHeader()
  })
}

const getFireRisk = data => {
  return axios.post(API_URL + '/fire-risk-data', data)
}

const getGeoJson = data => {
  return axios.post(API_URL + '/search-property', data)
}

const saveGeoJson = data => {
  return axios.post(API_URL + '/save-geojson', data, { headers: authHeader() })
}

const changeStatus = data => {
  return axios.post(API_URL + '/update-status', data, {
    headers: authHeader()
  })
}

const sendEmail = data => {
  return axios.post(API_URL + '/send-email', data, { headers: authHeader() })
}

const sendEmailLTO = data => {
  return axios.post(API_URL + '/lto/email', data, { headers: authHeader() })
}

const getPropertyImages = data => {
  return axios.post(API_URL + '/image/get/get-presigned-url', data, {
    headers: authHeader()
  })
}

const updateProfile = data => {
  return axios.post(API_URL + '/images/upload', data, {
    headers: authHeader()
  })
}

const deletePropertyImage = url => {
  return axios.post(
    API_URL + '/image/delete',
    { url },
    { headers: authHeader() }
  )
}

const getDataForMap = data => {
  return axios.post(API_URL + '/get-geojson/map', data, {
    headers: authHeader()
  })
}

const getDataForCard = data => {
  return axios.post(API_URL + '/get-geojson/cards', data, {
    headers: authHeader()
  })
}

const getLTOsListing = data => {
  return axios.post(API_URL + '/lto/list', data, { headers: authHeader() })
}

const getOffTakerListing = () => {
  return axios.get(API_URL + '/woody-offtaker', { headers: authHeader() })
}

const assignOffTaker = data => {
  return axios.post(API_URL + '/woody-offtaker/assign', data, {
    headers: authHeader()
  })
}

// inviteLTOOperators
const inviteLTOOperators = data => {
  return axios.post(API_URL + '/lto/invite', data, {
    headers: authHeader()
  })
}

const addUpdateOffTaker = (data, type) => {
  return axios.post(API_URL + `/woody-offtaker/${type}`, data, {
    headers: authHeader()
  })
}

const deleteOffTaker = data => {
  return axios.post(API_URL + '/woody-offtaker/delete', data, {
    headers: authHeader()
  })
}

const getEmailListing = email => {
  return axios.post(
    API_URL + '/get-email',
    { email: email },
    { headers: authHeader() }
  )
}

const getActiveContractListing = email => {
  return axios.post(
    API_URL + '/lto/get-active-contracts',
    { email: email },
    { headers: authHeader() }
  )
}

const updateUserData = data => {
  return axios.post(API_URL + `/update-user-data`, data, {
    headers: authHeader()
  })
}

const addUserData = data => {
  return axios.post(API_URL + `/save-geojson`, data, { headers: authHeader() })
}

const addComment = data => {
  return axios.post(API_URL + '/add-comment', data, { headers: authHeader() })
}

const deleteProperty = property_id => {
  return axios.post(
    API_URL + '/delete-property',
    { property_id },
    { headers: authHeader() }
  )
}

const addFeedback = data => {
  return axios.post(API_URL + '/feedback', data, { headers: authHeader() })
}

const sendContactUs = data => {
  return axios.post(API_URL + '/feedback', data, { headers: authHeader() })
}

const getProfileImage = data => {
  return axios.post(API_URL + '/profile/presigned-url/get', data, {
    headers: authHeader()
  })
}

const deleteAccount = data => {
  return axios.post(API_URL + '/delete-account', data, {
    headers: authHeader()
  })
}

const getNeighborListing = property_id => {
  return axios.post(
    API_URL + '/get-neighbors',
    { property_id },
    { headers: authHeader() }
  )
}

const getLTOListing = () => {
  return axios.get(API_URL + '/lto/unverified/list', { headers: authHeader() })
}

const updateLTOStatus = data => {
  return axios.post(API_URL + '/lto/verify', data, { headers: authHeader() })
}

const getAcceptBidList = data => {
  return axios.post(API_URL + '/bid/get', data, { headers: authHeader() })
}
const acceptBid = data => {
  return axios.post(API_URL + '/bid/accept', data, { headers: authHeader() })
}
const submitBid = data => {
  return axios.post(API_URL + '/bid/submit', data, { headers: authHeader() })
}
const submitAddCharacteristics = data => {
  return axios.post(API_URL + '/property-characteristics/add', data, {
    headers: authHeader()
  })
}

export default {
  getUserDetail,
  getUserListing,
  getUserListingBasedOnGeo,
  getFireRisk,
  getGeoJson,
  saveGeoJson,
  changeStatus,
  sendEmail,
  updateProfile,
  getPropertyImages,
  deletePropertyImage,
  getDataForMap,
  getDataForCard,
  getOffTakerListing,
  assignOffTaker,
  addUpdateOffTaker,
  deleteOffTaker,
  getEmailListing,
  getActiveContractListing,
  updateUserData,
  addComment,
  deleteProperty,
  addUserData,
  addFeedback,
  sendContactUs,
  getProfileImage,
  deleteAccount,
  getNeighborListing,
  getLTOListing,
  updateLTOStatus,
  getLTOListingData,
  getLTOsListing,
  inviteLTOOperators,
  sendEmailLTO,
  getAcceptBidList,
  acceptBid,
  submitBid,
  submitAddCharacteristics
}
