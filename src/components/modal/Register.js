import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  openRegisterModal,
  setSelectedProperty
} from '../../redux/actions/other'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import MapComponent from '../MapComponent'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import LandownerRegister from '../LandownerRegister'
import LTORegister from '../LTORegister'
import RPFRegister from '../RPFRegister'
function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}
const Register = () => {
  const dispatch = useDispatch()
  const { isOpenRegisterModal } = useSelector(state => state.other)
  const { selectedProperty } = useSelector(state => state.other)
  const [tabValue, setTabValue] = useState(0)
  const [step, setStep] = useState(0)
  const close = (event, reason) => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return
    dispatch(openRegisterModal(false))
    setTypeBool(0)
    dispatch(setSelectedProperty([]))
  }
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }
  const [typeSelected, setTypeBool] = useState(0)
  const handleTypeClick = typeVal => {
    setTypeBool(1)
    setTabValue(typeVal)
  }
  return (
    <Dialog
      fullWidth={true}
      maxWidth={false}
      id='popupDialog'
      open={isOpenRegisterModal}
      onClose={close}
    // scroll={'body'}
    // aria-labelledby='scroll-dialog-title'
    // aria-describedby='scroll-dialog-description'
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
          {typeSelected ? (
            <>
              {tabValue ? (
                <div className='popup-img' id='LTO' />
              ) : (
                <div className='popup-img' id='Landowner' />
              )}
            </>
          ) : (
            <div className='popup-img'>
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
                // <img
                //   src={"/img/redwoods.jpg"}
                //   alt={"register-bg"}
                //   style={{ width: "100%" }}
                // />
                <div />
              )}
            </div>
          )}
          <div className='popup-content'>
            {typeSelected ? (
              <div id='inner'>
                <h2 className='mb-0'>Create an Account</h2>
                <Box sx={{ width: '100%' }}>
                  {/* <Box
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      className="mb-2"
                    >
                      <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label="Landowner" />
                        <Tab label="LTO" />
                      </Tabs>
                    </Box> */}
                  <TabPanel value={tabValue} index={0}>
                    <p class='text-secondary mt-0'>Wooded Property Owner</p>
                    <LandownerRegister />
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <p class='text-secondary mt-0'>Licensed Timber Operator</p>
                    <LTORegister
                      changeBottomStepper={step => {
                        setStep(step)
                      }}
                      stepper={step}
                    />
                  </TabPanel>
                  <TabPanel value={tabValue} index={2}>
                    <p class='text-secondary mt-0 mb-0'>Registered Professional Foresters</p>
                    <RPFRegister  changeBottomStepper={step => {
                        setStep(step)
                      }}
                      stepper={step} />
                  </TabPanel>
                  <button
                    class='greenLinkBtn'
                    onClick={() => {
                      if (step === 0) {
                        setTypeBool(0)
                      } else if (step === 1) {
                        setStep(0)
                      }
                      // setTypeBool(0)
                    }}
                  >
                    <b>⟨</b> Back to account type selection
                  </button>
                </Box>
              </div>
            ) : (
              <div id='inner'>
                <h2 className='mb-3'>Let's Get You Started</h2>
                <p class='text-secondary mb-3'>
                  {' '}
                  What title best describes you?
                </p>
                <button
                  class='userTypeCard mb-3'
                  onClick={() => handleTypeClick(0)}
                >
                  <div id='typeCard-img'>
                    <img
                      src={'/img/iconLandowner.png'}
                      style={{ width: '100%' }}
                    ></img>
                  </div>
                  <div id='typeCard-content'>
                    <b>Wooded Property Owner</b>
                    <p class='text-secondary'>
                      Land owners looking to <br /> get land fortified
                    </p>
                  </div>
                </button>
                <button class='userTypeCard mb-3' onClick={() => handleTypeClick(1)}>
                  <div id='typeCard-img'>
                    <img
                      src={'/img/iconLTO.png'}
                      style={{ width: '100%' }}
                    ></img>
                  </div>
                  <div id='typeCard-content'>
                    <b>Licensed Timber Operator</b>
                    <p class='text-secondary'>
                      LTOs looking to bid on <br />
                      work contracts
                    </p>
                  </div>
                </button>
                <button class='userTypeCard mb-3' onClick={() => handleTypeClick(2)}>
                  <div id='typeCard-img'>
                    <img
                      src={'/img/iconLTO.png'}
                      style={{ width: '100%' }}
                    ></img>
                  </div>
                  <div id='typeCard-content'>
                    <b>Registered Professional Forester</b>
                    <p class='text-secondary'>
                      RFPs looking to facilitate
                      <br />
                      Landowners
                    </p>
                  </div>
                </button>
              </div>
            )}
            {typeSelected ? (
              <div class='stepTracker'>
                <div id='step' class='completed'>
                  {' '}
                  1{' '}
                </div>
                <div id='connector' class='active'></div>
                <div id='step' class={step === 1 ? 'completed' : 'active'}>
                  {' '}
                  2{' '}
                </div>
                <div id='connector' class='active'></div>
                <div id='step' class={step === 2 ? 'completed' : 'active'}>
                  {' '}
                  3{' '}
                </div>
              </div>
            ) : (
              <div class='stepTracker'>
                <div id='step' class='active'>
                  {' '}
                  1{' '}
                </div>
                <div id='connector'></div>
                <div id='step'> 2 </div>
                {/* <div id='connector'></div>
                <div id='step'> 3 </div> */}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default Register