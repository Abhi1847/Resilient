import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add'
import {
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  Accordion,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardMedia
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Carousel from 'react-material-ui-carousel'
import SearchIcon from '@mui/icons-material/Search'
import RemoveIcon from '@mui/icons-material/Remove'
import MapComponent from '../../components/MapComponent'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import SetMealIcon from '@mui/icons-material/SetMeal'
import CellTowerIcon from '@mui/icons-material/CellTower'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CottageIcon from '@mui/icons-material/Cottage'
import PropaneTankIcon from '@mui/icons-material/PropaneTank'
import WaterIcon from '@mui/icons-material/Water'
import { BaseColor } from '../../styles/Colors'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import { treatment_filter_options } from '../../helpers/common_data'

const LTODetailModal = props => {
  const {
    ltoDetailsModal = false,
    handleCloseModal = () => {},
    defaultCardData = {}
  } = props
  console.log('defaultCardData==>>>>', defaultCardData)
  const [showClearIcon, setShowClearIcon] = useState('none')
  const [expanded, setExpanded] = React.useState(false)
  const [mapListing, setMapListing] = useState([])
  const [treatmentFilterStatus, setTreatmentFilterStatus] = useState(
    'estimate_of_biomass_detected_20'
  )

  const mapData = {
    type: defaultCardData?.type,
    geometry: defaultCardData?.geometry,
    properties: defaultCardData?.properties
  }

  useEffect(() => {
    setMapListing([mapData.geometry])
  }, [])

  const {
    name = '',
    email = '',
    address = '',
    phone,
    img_url = [],
    stem_4_to_6_20,
    stem_4_to_6_40,
    stem_6_to_9_20,
    stem_6_to_9_40,
    stem_9_plus_20,
    stem_9_plus_40,
    branch_20,
    branch_40,
    foliage_20,
    foliage_40,
    property_characteristics = []
  } = defaultCardData.properties
  console.log('defaultCardData.properties ===>> ', defaultCardData.properties)

  let id = 0
  function createData (diameter, estimate, dbh, height, distance, lat, long) {
    id += 1
    return { id, diameter, estimate, dbh, height, distance, lat, long }
  }

  const filteredData =
    treatmentFilterStatus === 'estimate_of_biomass_detected_20'

  const rows = [
    createData(
      '4-6',
      filteredData ? stem_4_to_6_20 : stem_4_to_6_40,
      6.0,
      24,
      4.0,
      6,
      7
    ),
    createData(
      '6-9',
      filteredData ? stem_6_to_9_20 : stem_6_to_9_40,
      9.0,
      37,
      4.3,
      4,
      7
    ),
    createData(
      '9+',
      filteredData ? stem_9_plus_20 : stem_9_plus_40,
      16.0,
      24,
      6.0,
      6,
      3
    ),
    createData(
      'Branch',
      filteredData ? branch_20 : branch_40,
      16.0,
      24,
      6.0,
      6,
      3
    ),
    createData(
      'Foliage',
      filteredData ? foliage_20 : foliage_40,
      16.0,
      24,
      6.0,
      6,
      3
    )
  ]

  const CharacteristicsArray = [
    {
      id: 1,
      title: property_characteristics == 'Limited Access' && 'Limited Access',
      icon: <WarningAmberIcon style={{ fontSize: 50 }} />
    },
    {
      id: 2,
      title:
        property_characteristics == 'Fish Bearing Water Sources' &&
        'Fish Bearing Water Sources',
      icon: <SetMealIcon style={{ fontSize: 50 }} />
    },
    {
      id: 3,
      title:
        property_characteristics == 'Overhead Power Lines' &&
        'Overhead Power Lines',
      icon: <CellTowerIcon style={{ fontSize: 50 }} />
    },
    {
      id: 4,
      title: property_characteristics == 'Paved Driveway' && 'Paved Driveway',
      icon: <CottageIcon style={{ fontSize: 50 }} />
    }
  ]

  const SiteArray = [
    {
      id: 1,
      que: 'Is there a free trial available?',
      ans: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
    },
    {
      id: 2,
      que: 'Is there a free trial available?',
      ans: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
    },
    {
      id: 3,
      que: 'Is there a free trial available?',
      ans: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
    },
    {
      id: 4,
      que: 'Is there a free trial available?',
      ans: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
    },
    {
      id: 5,
      que: 'Is there a free trial available?',
      ans: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
    }
  ]
  const handleSiteChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : '')
  }

  const handleChange = event => {
    setShowClearIcon(event.target.value === '' ? 'none' : 'flex')
  }

  const handleClick = () => {
    // TODO: Clear the search input
    console.log('clicked the clear icon...')
  }

  const handleChangeTreatmentFilter = event => {
    const option = event.target.value
    setTreatmentFilterStatus(option)
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={false}
      id='popupDialog'
      open={ltoDetailsModal}
      onClose={() => {
        handleCloseModal()
      }}
    >
      <DialogContent class='popup'>
        <div class='flex-row exit-button'>
          <IconButton
            className={'float-end p-0'}
            color='inherit'
            onClick={() => {
              handleCloseModal()
            }}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div style={{ padding: '10px 20px 10px 20px' }}>
          <div className='flex-row'>
            <span
              className='mb-3'
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: BaseColor.black
              }}
            >
              {name}
            </span>
            <span
              style={{
                fontSize: 16,
                color: BaseColor.lemonGreen,
                marginLeft: 20
              }}
            >
              {email || 'Kris Kringle - San Luis Obispo County, CA'}
            </span>
          </div>

          <div>
            <p style={{ padding: 0, margin: 0 }}>
              Phone: {phone || '(805)123-4567'}
            </p>
            <p style={{ padding: 0, margin: 0 }}>
              Address:{' '}
              {address || '1600 Pennsylvania Ave., San Luis Obispo, CA 93401'}
            </p>
            <p style={{ padding: 0, margin: 0 }}>APN: 006-0153-011-0000</p>
          </div>

          {/* //project site */}
          <div
            style={{
              border: `1px solid ${BaseColor.black}`,
              borderRadius: 10,
              padding: 20,
              marginTop: 20
            }}
          >
            <span
              className='mb-3'
              style={{
                fontSize: 25,
                fontWeight: '700',
                color: BaseColor.black
              }}
            >
              Project site
            </span>

            <Grid container spacing={4}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                {img_url.length === 0 ? (
                  <CardMedia
                    component='img'
                    image={'/img/no-image.png'}
                    alt={'no-image.png'}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: `1px solid ${BaseColor.greyTxt}`
                    }}
                  />
                ) : (
                  <Carousel>
                    {img_url.map((item, index) => (
                      <>
                        <img
                          src={item}
                          alt={item.alt}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </>
                    ))}
                  </Carousel>
                )}
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <MapComponent
                  className={'find-property-map'}
                  center={[36.646755, -118.705333]}
                  data={mapListing}
                  zoom={7}
                  jpa={false}
                />

                {/* <div className='embed-responsive '>
                  <div className='mapouter'>
                    <div className='gmap_canvas'>
                      <div className='iframe-container'>
                        <MapComponent
                          className={'map-page'}
                          center={[36.646755, -118.705333]}
                          zoom={150}
                          jpa={false}
                          data={mapListing}
                          // changedData={changedData}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
              </Grid>
            </Grid>
          </div>
          {/* Tons per Acre */}
          <div
            style={{
              border: `1px solid ${BaseColor.black}`,
              borderRadius: 10,
              padding: 20,
              marginTop: 20
            }}
          >
            <div
              className='flex-row items-center justify-between'
              style={{ justifyContent: 'space-between' }}
            >
              <span
                className='mb-3'
                style={{
                  fontSize: 25,
                  fontWeight: '700',
                  color: BaseColor.black
                }}
              >
                Tons per Acre*
              </span>

              <div className='col-md-3'>
                <FormControl className='w-100 h-100' size='small'>
                  <InputLabel id='demo-select-small'>Treatment Type</InputLabel>
                  <Select
                    className={'rounded-0 h-100'}
                    labelId='demo-select-small'
                    id='demo-select-small'
                    value={treatmentFilterStatus}
                    label='Treatment Type'
                    onChange={handleChangeTreatmentFilter}
                  >
                    {treatment_filter_options().map((data, index) => (
                      <MenuItem
                        key={index}
                        className={'text-capitalize'}
                        value={data['key']}
                      >
                        <Typography variant='caption' display='block'>
                          {data['value']}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div
                  style={{
                    width: '100%',
                    marginTop: 20,
                    overflowX: 'auto'
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Diameter (in.)</TableCell>
                        <TableCell align='center'>Estimated Tons</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component='th' scope='row'>
                            {row.diameter}
                          </TableCell>
                          <TableCell align='center'>{row.estimate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Grid>
            </Grid>
          </div>
          {/* Project Characteristics */}

          {defaultCardData?.properties?.property_characteristics.length ==
          0 ? null : (
            <div
              style={{
                border: `1px solid ${BaseColor.black}`,
                borderRadius: 10,
                marginTop: 20
              }}
            >
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div
                    style={{
                      width: '100%',
                      marginTop: 20,
                      overflowX: 'auto'
                    }}
                  >
                    <div style={{ margin: '0px 0px 10px 20px' }}>
                      <span
                        className='mb-3'
                        style={{
                          fontSize: 25,
                          fontWeight: '700',
                          color: BaseColor.black
                        }}
                      >
                        Project Characteristics
                      </span>
                    </div>
                    <Divider />
                    <div style={{ padding: 20 }}>
                      {property_characteristics.map((item, index) => {
                        return (
                          <>
                            <div
                              className='flex-row items-center p-3'
                              style={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <div style={{ marginRight: 20 }}>
                                {item === 'Steep Roads' ? (
                                  <WarningAmberIcon style={{ fontSize: 50 }} />
                                ) : item ===
                                  'Domestic Water Source on Property' ? (
                                  <SetMealIcon style={{ fontSize: 50 }} />
                                ) : item === 'Overhead Power Lines' ? (
                                  <CellTowerIcon style={{ fontSize: 50 }} />
                                ) : item === 'Paved Driveways' ||
                                  item === 'Paved Driveway' ? (
                                  <CottageIcon style={{ fontSize: 50 }} />
                                ) : item === 'Residence on Property' ? (
                                  <ApartmentIcon style={{ fontSize: 50 }} />
                                ) : item === 'Propane Tanks on Property' ? (
                                  <PropaneTankIcon style={{ fontSize: 50 }} />
                                ) : item === 'Outbuilding on Property' ? (
                                  <ApartmentIcon style={{ fontSize: 50 }} />
                                ) : item === 'Livestock on Property' ? (
                                  <ShowChartIcon style={{ fontSize: 50 }} />
                                ) : item === 'Overhead Power Lines' ? (
                                  <ElectricalServicesIcon
                                    style={{ fontSize: 50 }}
                                  />
                                ) : item === 'Adjacency to State Land' ? (
                                  <InsertPhotoIcon style={{ fontSize: 50 }} />
                                ) : item === 'Adjacent to Federal Land' ? (
                                  <InsertPhotoIcon style={{ fontSize: 50 }} />
                                ) : (
                                  <InsertPhotoIcon style={{ fontSize: 50 }} />
                                )}
                              </div>
                              <span
                                style={{
                                  fontSize: 20,
                                  color: BaseColor.black,
                                  fontWeight: 'bold'
                                }}
                              >
                                {item}
                              </span>
                            </div>
                            <Divider />
                          </>
                        )
                      })}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
          {/* Site Specific Requirements */}
          {/* <div
            style={{
              border: `1px solid ${BaseColor.black}`,
              borderRadius: 10,
              marginTop: 20
            }}
          >
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div
                  style={{
                    width: '100%',
                    marginTop: 20,
                    overflowX: 'auto'
                  }}
                >
                  <div style={{ margin: '0px 0px 10px 20px' }}>
                    <span
                      className='mb-3'
                      style={{
                        fontSize: 25,
                        fontWeight: '700',
                        color: BaseColor.black
                      }}
                    >
                      Site Specific Requirements
                    </span>
                  </div>
                  <Divider />
                  <div style={{ padding: 20 }}>
                    {SiteArray.map((item, index) => {
                      const panel = `panel${item.id}`
                      return (
                        <Accordion
                          key={item.id}
                          expanded={expanded === panel}
                          onChange={handleSiteChange(panel)}
                          style={{
                            borderBottom: '1px solid #e9e9e9',
                            boxShadow: 'none',
                            background: 'none',
                            padding: '0px',
                            margin: '0px',
                            borderRadius: 0
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              expanded == panel ? (
                                <RemoveIcon size={20} />
                              ) : (
                                <AddIcon size={20} />
                              )
                            }
                            aria-controls={`${panel}-content`}
                            id={`${panel}-header`}
                            style={{ border: 0 }}
                          >
                            <Typography
                              sx={{
                                width: '100%',
                                flexShrink: 0,
                                fontWeight: 'bold'
                              }}
                            >
                              {item?.que}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{item?.ans}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      )
                    })}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div> */}

          {/* Biomass Disposal Sites */}
          {/* <div
            style={{
              border: `1px solid ${BaseColor.black}`,
              borderRadius: 10,
              marginTop: 20
            }}
          >
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div
                  style={{
                    width: '100%',
                    marginTop: 20,
                    overflowX: 'auto'
                  }}
                >
                  <div style={{ margin: '0px 0px 10px 20px' }}>
                    <div
                      className='flex-row items-center justify-between'
                      style={{
                        justifyContent: 'space-between',
                        paddingRight: 20
                      }}
                    >
                      <span
                        className='mb-3'
                        style={{
                          fontSize: 25,
                          fontWeight: '700',
                          color: BaseColor.black
                        }}
                      >
                        Biomass Disposal Sites
                      </span>

                      <div>
                        <TextField
                          size='small'
                          variant='outlined'
                          placeholder='search..'
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <SearchIcon />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment
                                position='end'
                                style={{ display: showClearIcon }}
                                onClick={handleClick}
                              >
                                <CloseIcon />
                              </InputAdornment>
                            )
                          }}
                        />
                        <select
                          name='cars'
                          id='cars'
                          style={{
                            height: 40,
                            width: 250,
                            borderRadius: 5,
                            marginLeft: 10
                          }}
                        >
                          <option value='volvo'>Volvo</option>
                          <option value='saab'>Saab</option>
                          <option value='mercedes'>Mercedes</option>
                          <option value='audi'>Audi</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <Divider />
                </div>
              </Grid>
            </Grid>

            <Grid container style={{ padding: 20 }} spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                {/* <Grid container>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                      <p
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: BaseColor.greyTxt
                        }}
                      >
                        Facilities
                      </p>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                      <p
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: BaseColor.greyTxt
                        }}
                      >
                        Disposal Type
                      </p>
                      <Grid container>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <span
                            style={{
                              fontSize: 16,
                              color: BaseColor.greyTxt
                            }}
                          >
                            Biomass
                          </span>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <span
                            style={{
                              fontSize: 16,
                              color: BaseColor.greyTxt
                            }}
                          >
                            Logs
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                      <span>hjgjh</span>
                      <br />
                      <span>hjgjh</span>
                      <br />
                      <span>hjgjh</span>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                      <Grid container>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <Checkbox className={classes.customCheckbox} />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <Checkbox className={classes.customCheckbox} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider /> */}
          {/* </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <div className='embed-responsive '>
                  <div className='mapouter'>
                    <div className='gmap_canvas'>
                      <div className='iframe-container'>
                        <MapComponent
                          className={'find-property-map'}
                          center={[36.646755, -118.705333]}
                          zoom={150}
                          jpa={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LTODetailModal
