import {
  OPEN_REGISTER_MODAL,
  OPEN_LOGIN_MODAL,
  OPEN_VERIFY_EMAIL_MODAL,
  OPEN_FORGOT_PASSWORD_MODAL,
  OPEN_RESET_PASSWORD_MODAL,
  SELECTED_GEO,
  SELECTED_PROPERTY,
  LOADING,
  PROPERTY_LOADING,
  SELECTED_USER_PROPERTY
} from './types'
import { toast } from 'react-toastify'
import UserService from '../../services/user.service'
import { logout } from './auth'

export const openRegisterModal = data => ({
  type: OPEN_REGISTER_MODAL,
  payload: data
})

export const openLoginModal = data => ({
  type: OPEN_LOGIN_MODAL,
  payload: data
})

export const openVerifyEmailModal = data => ({
  type: OPEN_VERIFY_EMAIL_MODAL,
  payload: data
})

export const openForgotPasswordModal = data => ({
  type: OPEN_FORGOT_PASSWORD_MODAL,
  payload: data
})

export const openResetPasswordModal = data => ({
  type: OPEN_RESET_PASSWORD_MODAL,
  payload: data
})

export const setLoading = data => ({
  type: LOADING,
  payload: data
})

export const setPropertyLoading = data => ({
  type: PROPERTY_LOADING,
  payload: data
})

export const setSelectedGeo = data => ({
  type: SELECTED_GEO,
  payload: data
})

export const setSelectedProperty = data => ({
  type: SELECTED_PROPERTY,
  payload: data
})

export const setSelectedUserProperty = data => ({
  type: SELECTED_USER_PROPERTY,
  payload: data
})

export const getUserListing = () => dispatch => {
  return UserService.getUserListing().then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const getUserListingBasedOnGeo = data => dispatch => {
  return UserService.getUserListingBasedOnGeo(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const getFireRisk = data => dispatch => {
  return UserService.getFireRisk(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const getGeoJson = data => dispatch => {
  return UserService.getGeoJson(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const saveGeoJson = data => dispatch => {
  return UserService.saveGeoJson(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const changeStatus = data => dispatch => {
  return UserService.changeStatus(data).then(
    response => {
      toast.success('Status updated successfully!')
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const sendEmail = data => dispatch => {
  return UserService.sendEmail(data).then(
    response => {
      toast.success('Email sent successfully!')
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

// lto send email
export const sendEmailLTO = data => dispatch => {
  return UserService.sendEmailLTO(data).then(
    response => {
      toast.success('Email sent successfully!')
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const getUserDetail = data => dispatch => {
  return UserService.getUserDetail(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const getPropertyImages = data => dispatch => {
  return UserService.getPropertyImages(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const deletePropertyImage = url => dispatch => {
  return UserService.deletePropertyImage(url).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const getDataForMap = data => dispatch => {
  return UserService.getDataForMap(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const getDataForCard = data => dispatch => {
  return UserService.getDataForCard(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}
export const getLTOsListing = data => dispatch => {
  return UserService.getLTOsListing(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}
export const getAcceptBidListing = data => dispatch => {
  return UserService.getAcceptBidList(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const acceptBidList = data => dispatch => {
  return UserService.acceptBid(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const getOffTakerListing = () => dispatch => {
  return UserService.getOffTakerListing().then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const assignOffTaker = data => dispatch => {
  return UserService.assignOffTaker(data).then(
    response => {
      toast.success('Offtaker assigned successfully!')
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const inviteLTOOperators = data => dispatch => {
  return UserService.inviteLTOOperators(data).then(
    response => {
      toast.success('Operators invited successfully!')
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const addUpdateOffTaker = (data, type) => dispatch => {
  return UserService.addUpdateOffTaker(data, type).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const deleteOffTaker = data => dispatch => {
  return UserService.deleteOffTaker(data).then(
    response => {
      toast.success('Offtaker deleted successfully!')
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const getEmailListing = email => dispatch => {
  return UserService.getEmailListing(email).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}
export const getActiveContractListing = email => dispatch => {
  return UserService.getActiveContractListing(email).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const updateUserData = data => dispatch => {
  return UserService.updateUserData(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const addUserData = data => dispatch => {
  return UserService.addUserData(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const addComment = data => dispatch => {
  return UserService.addComment(data).then(
    response => {
      toast.success('Comment added successfully!')
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const deleteProperty = property_id => dispatch => {
  return UserService.deleteProperty(property_id).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const addFeedback = data => dispatch => {
  return UserService.addFeedback(data).then(
    response => {
      toast.success(response.data)
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const sendContactUs = data => dispatch => {
  return UserService.sendContactUs(data).then(
    response => {
      toast.success(response.data)
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const errorHandling = (error, dispatch) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()

  if (error.response.status === 401 || error.response.status === 0) {
    dispatch(logout())
  }
  toast.error(
    error?.response?.data
      ? error?.response?.data
      : 'Oops! Something went wrong. Please try again.'
  )
}

export const getProfileImage = data => dispatch => {
  return UserService.getProfileImage(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const deleteAccount = data => dispatch => {
  return UserService.deleteAccount(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const getNeighborListing = property_id => dispatch => {
  return UserService.getNeighborListing(property_id).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const getLTOListing = () => dispatch => {
  return UserService.getLTOListing().then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const getLTOListingData = data => dispatch => {
  return UserService.getLTOListingData(data).then(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}

export const updateLTOStatus = data => dispatch => {
  return UserService.updateLTOStatus(data).then(
    response => {
      toast.success(response.data)
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}
export const submitBids = data => dispatch => {
  return UserService.submitBid(data).then(
    response => {
      console.log('response==>>', response)
      toast.success('Status updated successfully!')
      return Promise.resolve(response.data)
    },
    error => {
      console.log('error==>>', error)
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}
export const addPropertyCharacteristics = data => dispatch => {
  return UserService.submitAddCharacteristics(data).then(
    response => {
      toast.success('Status updated successfully!')
      return Promise.resolve(response.data)
    },
    error => {
      errorHandling(error, dispatch)
      return Promise.reject()
    }
  )
}
