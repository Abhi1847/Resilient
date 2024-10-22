import {
  Dialog,
  DialogContent,
  IconButton,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Box
} from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import {
  addPropertyCharacteristics,
  setLoading
} from '../../redux/actions/other'
import { toast } from 'react-toastify'

const AcceptCharacteristics = ({ open, onClose, property_id = '', data }) => {
  const dispatch = useDispatch()
  const names = [
    'Adjacency to State Land',
    'Adjacent to Federal Land',
    'Domestic Water Source on Property',
    'Livestock on Property',
    'Outbuilding on Property',
    'Overhead Power Lines',
    'Propane Tanks on Property',
    'Paved Driveways',
    'Residence on Property',
    'Steep Roads'
  ]

  const [submitting, setSubmitting] = useState(false)
  const [personName, setPersonName] = useState([])
  const handleChange = event => {
    const {
      target: { value }
    } = event
    setPersonName(typeof value === 'string' ? value.split(',') : value)
  }
  const onAddCharacteristicsClick = () => {
    dispatch(setLoading(true))
    dispatch(
      addPropertyCharacteristics({
        property_id: property_id,
        property_characteristics: personName
      })
    )
      .then(response => {
        toast.success(response)
        dispatch(setLoading(false))
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
      onClose={onClose}
      scroll={'body'}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogContent>
        <div className='row'>
          <div className='col-md-12'>
            <h4 className='mb-4'>
              Add Property Characteristics
              <IconButton
                className={'float-end p-0'}
                color='inherit'
                onClick={onClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
            </h4>
            <div>
              <FormControl className='mb-4' sx={{ width: '100%' }}>
                <InputLabel id='demo-multiple-chip-label'>
                  Property Characteristics
                </InputLabel>
                <Select
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id='select-multiple-chip'
                      label='Property Characteristics'
                    />
                  }
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left'
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left'
                    },
                    getContentAnchorEl: null,
                    PaperProps: {
                      style: {
                        maxHeight: 200 // Set a maximum height for the dropdown
                      }
                    }
                  }}
                  // MenuProps={{
                  //   maxHeight: 40,
                  //   width: 250,
                  //   border: '1px solid pink',
                  //   marginTop: 100
                  // }}
                >
                  {names.map(name => (
                    <MenuItem
                      key={name}
                      value={name}
                      // style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className='col-md-12'>
              {submitting ? (
                <LoadingButton
                  endIcon={<SendIcon />}
                  className='mb-3 w-100'
                  loading
                  loadingPosition='end'
                  variant='contained'
                >
                  SUBMITTING...
                </LoadingButton>
              ) : (
                <button
                  type='submit'
                  className='btn btn-primary mb-3 w-100'
                  onClick={() => {
                    onAddCharacteristicsClick()
                  }}
                >
                  SUBMIT
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AcceptCharacteristics
