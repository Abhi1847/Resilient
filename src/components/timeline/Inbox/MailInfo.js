import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import GppGoodIcon from '@mui/icons-material/GppGood'
import moment from 'moment'

const MailInfo = ({ selected }) => {
  const [info, setInfo] = useState({
    sender: '',
    time: '',
    subject: '',
    body: '',
    recipient: ''
  })

  useEffect(() => {
    setInfo(selected)
  }, [selected])
  const removeHtmlTags = html => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent || ''
  }
  const plainText = removeHtmlTags(info['body'])

  return (
    <div className='p-4'>
      <div className='email-header d-flex align-items-center justify-content-between'>
        <div>
          <span className='text-muted m-0 d-flex align-items-center'>
            <Avatar src='/broken-image.jpg' />
            <span
              style={{
                fontSize: 16,
                fontWeight: '900',
                color: 'black',
                marginLeft: 8
              }}
            >
              From :{' '}
            </span>
            &nbsp;&nbsp;{info['sender']}
            <GppGoodIcon />
          </span>

          <span className='text-muted mt-1 d-flex align-items-center'>
            <Avatar src='/broken-image.jpg' />
            <span
              style={{
                fontSize: 16,
                fontWeight: '900',
                color: 'black',
                marginLeft: 8
              }}
            >
              To :{' '}
            </span>
            &nbsp;&nbsp;{info['recipient']}
            <GppGoodIcon />
          </span>
        </div>
        <p className='text-muted m-0'>
          <span className={'text-muted'}>
            {moment(info['time']).format('MMM DD YYYY h:mm A')}
          </span>
        </p>
      </div>
      <div className='email-body'>
        <p>
          <b>{info['subject']}</b>
        </p>
        {/* <p className='text-muted'>{info['body']}</p> */}
        <div dangerouslySetInnerHTML={{ __html: info['body'] }} />
      </div>
    </div>
  )
}

export default MailInfo
