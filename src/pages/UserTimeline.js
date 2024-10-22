import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Inbox from '../components/timeline/Inbox'
import Progress from '../components/timeline/Progress'
import Document from '../components/timeline/Document'
import Neighbor from '../components/timeline/Neighbor'
import { getEmailListing } from '../redux/actions/other'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function TabPanel (props) {
  const { children, value, index, email, ...other } = props

  return (
    <div
      role='tabpanel'
      className={value === index ? '' : 'hide-user-tab'}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  )
}

const Index = ({ email = '', property_id = '' }) => {
  const [value, setValue] = useState(0)
  const [hideTab, setHideTab] = useState(true)
  const [propertyId, setPropertyId] = useState(null)
  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [emailData, setEmailData] = useState()
  const [selectedEmail, setSelectedEmail] = useState()
  const { user } = useSelector(state => state.auth)

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
    <div className={'user_dashboard'}>
      {/* {email === '' && <div style={{padding: '1% 5%'}}>
                <h4 className={'p-0 m-0'}>Dashboard</h4>
            </div>} */}
      <div class='spacer'></div>
      <Box className='w-100'>
        {!hideTab && (
          <Box
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            style={{ paddingLeft: '5%' }}
            className='bg-white h-100'
          >
            <Tabs value={value} onChange={handleChange}>
              <Tab label='Dashboard' />
              <Tab label='Pictures' />
              <Tab label='Inbox' />
              <Tab label='Neighbors' />
            </Tabs>
          </Box>
        )}
        <TabPanel value={value} index={0}>
          <Progress
            email={email}
            setHideTab={setHideTab}
            setPropertyId={setPropertyId}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Document email={email} property_id={propertyId} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Inbox
            email={email}
            emailData={emailData}
            selectedEmail={selectedEmail}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Neighbor property_id={propertyId} />
        </TabPanel>
      </Box>
    </div>
  )
}

export default Index
