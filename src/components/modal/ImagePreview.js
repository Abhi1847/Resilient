import React from 'react'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Carousel from 'react-material-ui-carousel'

const ImagePreview = ({ open, handleClose, img_url }) => {
  const closeModal = (event, reason) => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return
    handleClose(false)
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
      onClose={closeModal}
      scroll={'body'}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogContent>
        <div className='row'>
          <div className='col-md-12'>
            <h4 className='mb-5'>
              Image Preview
              <IconButton
                className={'float-end p-0'}
                color='inherit'
                onClick={closeModal}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
            </h4>
            <Carousel>
              {img_url?.map((item, index) => (
                <>
                  <img
                    src={item}
                    alt={item.alt}
                    style={{ width: '100%', height: 400 }}
                  />
                </>
              ))}
            </Carousel>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImagePreview
