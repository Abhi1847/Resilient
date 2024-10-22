import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import moment from 'moment'

const MailList = ({ data, selected }) => {
  const [emails, setEmails] = useState([])
  const [selectedList, setSelectedList] = useState(0)

  useEffect(() => {
    setEmails(data)
    if (data.length > 0) {
      setSelectedList(0)
    }
  }, [data])

  const select = (data, index) => {
    selected(data)
    setSelectedList(index)
    console.log('data', data)
  }

  return (
    <List className={'mail-list'}>
      {emails.map((info, index) => (
        <div key={index}>
          <ListItem
            className={`${
              selectedList === index ? 'bg-active' : ''
            } cursor-pointer`}
            alignItems='flex-start'
            onClick={() => select(info, index)}
          >
            <ListItemAvatar>
              <Avatar src='/broken-image.jpg' />
            </ListItemAvatar>
            <ListItemText
              primary={
                <span className='d-flex align-items-center justify-content-between'>
                  <Typography
                    className={'text-muted'}
                    component='span'
                    variant='body2'
                    style={{ fontSize: 13 }}
                  >
                    {info['sender']}
                  </Typography>
                  <Typography
                    className={'text-muted'}
                    component='span'
                    variant='body2'
                    style={{ fontSize: 12, marginLeft: 10 }}
                  >
                    {moment(info['time']).format('MMM DD YYYY h:mm A')}
                  </Typography>
                </span>
              }
              secondary={
                <span>
                  <Typography
                    className={'text-capitalize'}
                    style={{ fontSize: 12 }}
                    component='span'
                    variant='body1'
                    color='text.primary'
                  >
                    {info['subject']}
                  </Typography>

                  {/* {info['body'].slice(0, 50) + '.....'} */}
                  <div
                    style={{ overflow: 'hidden', fontSize: 12 }}
                    dangerouslySetInnerHTML={{
                      __html: info['body'].slice(0, 50) + '.....'
                    }}
                  />
                </span>
              }
            />
          </ListItem>
          <Divider variant='inset' component='li' className={'mail-divider'} />
        </div>
      ))}
    </List>
  )
}

export default MailList
