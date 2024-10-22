import React, { useEffect, useState } from 'react'
import MailList from './Inbox/MailList'
import MailInfo from './Inbox/MailInfo'
import { setLoading, getEmailListing } from '../../redux/actions/other'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton } from '@mui/material'
import { toast } from 'react-toastify'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

const Inbox = ({ email, emailData, selectedEmail }) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.other)
  const { user } = useSelector(state => state.auth)
  const [emails, setEmails] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (emailData || selectedEmail) {
      setEmails(emailData)
      setSelected(selectedEmail)
    }
  }, [emailData, selectedEmail])

  //   const get_emails = () => {
  //     dispatch(setLoading(true))
  //     dispatch(getEmailListing(email !== '' ? email : user.email))
  //       .then(response => {
  //         let valid = true

  //         if (typeof response == 'object') {
  //           for (const email of response) {
  //             if (
  //               !email.hasOwnProperty('sender') ||
  //               !email.hasOwnProperty('recipient') ||
  //               !email.hasOwnProperty('subject') ||
  //               !email.hasOwnProperty('body') ||
  //               !email.hasOwnProperty('time')
  //             ) {
  //               valid = false
  //               break
  //             }
  //           }
  //         } else valid = false

  //         if (valid) {
  //           dispatch(setLoading(false))
  //           setEmails(response)
  //           if (response.length > 0) {
  //             setSelected(response[0])
  //           }
  //         } else toast.error('Oops! Something went wrong. Please try again.')
  //       })
  //       .catch(() => {
  //         dispatch(setLoading(false))
  //       })
  //   }

  return (
    <div className={'bg-white h-100 pl5 pr5'}>
      <div className={'row'}>
        {isLoading ? (
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Skeleton variant='circular' width={40} height={40} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Skeleton
                  className={'mb-2'}
                  variant='rectangular'
                  width={200}
                  height={10}
                />
              }
              secondary={
                <>
                  <Skeleton
                    className={'mb-2'}
                    variant='rectangular'
                    width={200}
                    height={10}
                  />
                  <Skeleton variant='rectangular' height={60} />
                </>
              }
            />
          </ListItem>
        ) : emails?.length > 0 ? (
          <>
            <div className={'col-md-4 col-sm-12'}>
              <MailList data={emails} selected={setSelected} />
            </div>
            <div className={'col-md-8 col-sm-12'}>
              <MailInfo selected={selected} />
            </div>
          </>
        ) : (
          <>
            <div className='row'>
              <div className='p-5'>
                <Typography variant='h5' gutterBottom>
                  Your inbox is empty
                </Typography>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Inbox
