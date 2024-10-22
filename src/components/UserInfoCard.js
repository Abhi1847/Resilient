import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeStatus,
  setLoading,
  setSelectedGeo,
  submitBids
} from '../redux/actions/other'
import CardHeader from '@mui/material/CardHeader'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import EmailIcon from '@mui/icons-material/Email'
import MobileStepper from '@mui/material/MobileStepper'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import CardMedia from '@mui/material/CardMedia'
import { makeStyles } from '@mui/styles'
import ImageViewer from './uploader/ImageViewer'
import { property_status } from '../helpers/common_data'
import OffTaker from './modal/OffTaker'
import UserDashboard from './modal/UserDashboard'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import Comment from './modal/Comment'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import DirectionsIcon from '@mui/icons-material/Directions'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import Carousel from 'react-material-ui-carousel'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { BaseColor } from '../styles/Colors'
import { ListItemIcon, useMediaQuery } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import {
  Input,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
  Select,
  Box,
  Button
} from '@mui/material'
import AcceptBid from './modal/AcceptBid'
import AcceptCharacteristics from './modal/AcceptCharacteristics'

const items = [
  {
    img: 'https://s1.1zoom.me/prev/617/Canada_Parks_Mountains_Lake_Scenery_Moraine_Lake_616925_600x300.jpg',
    alt: 'Image 1'
  },
  {
    img: 'https://images.unsplash.com/photo-1562674111-fa6a64c1b345?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Image 2'
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThDEV-BeeHWLVwEiKlteH03eCb4tBfw7w7SZG3nQN9YZrcsUxX51hTnUCMnu3py6RUqSs&usqp=CAU',
    alt: 'Image 3'
  }
]

const ITEM_HEIGHT = 48

const useStyles = makeStyles(() => ({
  stepper: {
    padding: '0 !important',
    background: 'transparent !important'
  },
  galleryImg: {
    height: '200px',
    width: '100%'
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5
    // padding: 10
  },
  input: {
    height: 40,
    padding: 10,
    fontSize: 14, // Adjust font size as needed
    flex: 1,
    border: '1px solid #ccc', // Add border style
    borderRadius: 25 // Add border radius,
  },
  iconButton: {
    color: BaseColor.lemonGreen
    // marginLeft: 10
  }
}))

const HtmlTooltip = styled(props => (
  <Tooltip {...props} arrow classes={{ popper: props.className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: '#f5f5f9',
    backgroundColor: theme.palette.common.black,
    // color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))

const UserInfoCard = props => {
  const jpaOptions = [
    { name: 'email', icon: <EmailIcon /> },
    { name: 'comment', icon: <NoteAltIcon /> },
    { name: 'account', icon: <AccountBoxIcon /> },
    { name: 'invite ltos', icon: <InsertInvitationIcon /> },
    { name: 'accept bids', icon: <CheckCircleOutlineIcon /> },
    { name: 'add property characteristics', icon: <CheckCircleOutlineIcon /> }
  ]
  const [anchorEl, setAnchorEl] = useState('')
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const {
    data,
    handleOpen,
    loadCardData,
    lto_card = false,
    openModal = () => { },
    handleMessage = () => { },
    handleImagePreview = () => { },
    placeBidFunction = () => { },
    bidBtn = false,
    onSendClick = () => { },
    handleBidBtn = () => { },
    onCloseClick = () => { }
  } = props
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { selectedGeo } = useSelector(state => state.other)
  const {
    property_id = '',
    name = '',
    status = '',
    estimate_of_biomass_detected = '',
    estimate_of_biomass_detected_20 = '',
    estimate_of_biomass_detected_40 = '',
    email,
    img_url = [],
    burn_risk = '',
    address = '',
    comment = '',
    branch = '',
    foliage = '',
    stem_4_to_6 = '',
    stem_6_to_9 = '',
    stem_9_plus = '',
    stem_4_to_6_20 = '',
    foliage_20 = '',
    branch_20 = '',
    stem_6_to_9_20 = '',
    stem_9_plus_20 = '',
    phone,
    distance_from_site,
    bid_accepted
  } = data
  const [dropdown, setDropdown] = useState(status)
  const [activeStep, setActiveStep] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [openOffTakerModal, setOpenOffTakerModal] = useState(false)
  const [openAcceptBidModal, setOpenAcceptBidModal] = useState(false)
  const [openAcceptCharacteristicsModal, setOpenAcceptCharacteristicsModal] =
    useState(false)

  const classes = useStyles()
  const [userDashboard, setOpenUserDashboard] = useState(false)
  const [commentModal, setOpenCommentModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [selectBid, setSelectBid] = useState('')

  const onSelect = property_id => {
    dispatch(setSelectedGeo(property_id))
  }

  const handleJpaChange = value => {
    const option = value.name
    if (option === 'email') {
      handleOpen(email)
    } else if (option === 'comment') {
      openCommentModal()
    } else if (option === 'account') {
      openUserDashboard()
    } else if (option === 'invite ltos') {
      setOpenOffTakerModal(true)
      setAnchorEl(null)
    } else if (option === 'accept bids') {
      setOpenAcceptBidModal(true)
      setAnchorEl(null)
    } else if (option === 'add property characteristics') {
      setOpenAcceptCharacteristicsModal(true)
      setAnchorEl(null)
    }
  }

  const handleChange = event => {
    const option = event.target.value

    // if (option === 'invite ltos') {
    //   setOpenOffTakerModal(true)
    // } else if (option === 'accept bids') {
    //   setOpenAcceptBidModal(true)
    // } else {
    dispatch(setLoading(true))
    dispatch(
      changeStatus({
        email: email,
        status: option,
        jpa_email: user.email,
        property_id: property_id
      })
    )
      .then(() => {
        dispatch(setLoading(false))
        setDropdown(option)
        loadCardData()
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }
  // }

  const sendBid = value => {
    dispatch(setLoading(true))
    dispatch(
      submitBids({
        email: user?.email,
        bid: value,
        property_id: selectedId
      })
    )
      .then(() => {
        dispatch(setLoading(false))
        setSelectBid('')
        setSelectedId('')
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const openImageViewer = index => {
    setIsOpen(true)
    setPhotoIndex(index)
  }

  const closeImageViewer = () => {
    setIsOpen(false)
  }

  const closeOffTakerModal = (updateCard = false) => {
    setOpenOffTakerModal(false)
    if (updateCard) {
      loadCardData()
    }
  }
  const closeAcceptBidModal = (updateCard = false) => {
    setOpenAcceptBidModal(false)
    if (updateCard) {
      loadCardData()
    }
  }

  const openUserDashboard = () => {
    setOpenUserDashboard(true)
  }

  const closeUserDashboard = () => {
    setOpenUserDashboard(false)
  }

  const openCommentModal = () => {
    setOpenCommentModal(true)
  }

  const closeCommentModal = (isRefresh = false) => {
    setOpenCommentModal(false)
    if (isRefresh) {
      loadCardData()
    }
  }

  const openCharacteristicModal = () => {
    setOpenAcceptCharacteristicsModal(true)
  }

  const closeCharacteristicModal = (isRefresh = false) => {
    setOpenAcceptCharacteristicsModal(false)
    if (isRefresh) {
      loadCardData()
    }
  }
  const isSmallScreen = useMediaQuery('(max-width:992px)')

  return (
    <>
      {lto_card ? (
        <div className='col-sm-12 col-md-12 col-lg-12'>
          <div
            className={
              `${selectedGeo === property_id ? 'active_card' : ''}` +
              ' card p-0 '
            }
            // onClick={openModal}
            style={{
              borderRadius: 10,
              background: '#f2f2f3',
              zIndex: 9
            }}
          >
            <CardHeader
              className={'p-2'}
              title={
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#7e7777'
                    }}
                  >
                    {name}
                  </span>
                </div>
              }
              action={
                <>
                  {user && user['user_type'] !== 'lto' && (
                    <>
                      <IconButton
                        className={'p-1'}
                        title={'Send mail'}
                        aria-label='send mail'
                        onClick={() => handleOpen(email)}
                      >
                        <EmailIcon />
                      </IconButton>
                      <IconButton
                        className={'p-1'}
                        title={'Add comment'}
                        aria-label='add comment to property'
                        onClick={() => openCommentModal()}
                      >
                        <NoteAltIcon />
                      </IconButton>
                      <IconButton
                        className={'p-1'}
                        title={'Open user dashboard'}
                        aria-label='open user dashboard'
                        onClick={() => openUserDashboard()}
                      >
                        <AccountBoxIcon />
                      </IconButton>
                    </>
                  )}
                </>
              }
            ></CardHeader>
            <Box>
              {img_url.length === 0 ? (
                <CardMedia
                  component='img'
                  className={classes.galleryImg}
                  image={'/img/no-image.png'}
                  alt={'no-image.png'}
                  style={{
                    height: 240
                  }}
                />
              ) : (
                <>
                  <Carousel>
                    {img_url.map((item, index) => (
                      <div key={index} onClick={handleImagePreview}>
                        <img
                          src={item}
                          alt={item.alt}
                          className={classes.galleryImg}
                        />
                      </div>
                    ))}
                  </Carousel>
                  {/* <ImageViewer
                    data={img_url}
                    activePhoto={photoIndex}
                    setActivePhoto={setPhotoIndex}
                    isOpen={isOpen}
                    onClose={closeImageViewer}
                  />
                  {img_url.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => {
                        openImageViewer(index)
                      }}
                      className={
                        index !== activeStep ? 'd-none w-100 p-0' : 'w-100 p-0'
                      }
                    >
                      <img
                        src={option}
                        align={'profile'}
                        className={classes.galleryImg}
                        alt={option}
                      />
                    </Button>
                  ))}
                  <MobileStepper
                    className={classes.stepper}
                    variant='dots'
                    steps={img_url.length}
                    position='static'
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        className={'stepper-next'}
                        size='small'
                        onClick={handleNext}
                        disabled={activeStep === img_url.length - 1}
                      >
                        <KeyboardArrowRight />
                      </Button>
                    }
                    backButton={
                      <Button
                        className={'stepper-back'}
                        size='small'
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        <KeyboardArrowLeft />
                      </Button>
                    }
                  /> */}
                </>
              )}
            </Box>
            <CardActionArea
              style={{ zIndex: 2 }}
              onClick={() => {
                onSelect(property_id)
              }}
            >
              <div
                // className='p-2'
                onClick={openModal}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0px 10px 10px 10px'
                }}
              >
                <Typography
                  variant='caption'
                  display='block'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 14
                  }}
                >
                  <b style={{ fontSize: 14 }}>Address:</b> {address}
                </Typography>
                <Typography
                  variant='caption'
                  display='block'
                  style={{ fontSize: 14 }}
                >
                  <b style={{ fontSize: 14 }}>Estimate of Biomass: </b>
                  <HtmlTooltip
                    title={
                      <>
                        <Typography variant='caption' display='block'>
                          <b>Branch :</b>{' '}
                          <span className={'text-capitalize'}>
                            {branch_20 || 0}
                          </span>
                        </Typography>
                        <Typography variant='caption' display='block'>
                          <b>Foliage :</b>{' '}
                          <span className={'text-capitalize'}>
                            {foliage_20 || 0}
                          </span>
                        </Typography>
                        <Typography variant='caption' display='block'>
                          <b>Stem 4 to 6 inches :</b>{' '}
                          <span className={'text-capitalize'}>
                            {stem_4_to_6_20 || 0}
                          </span>
                        </Typography>
                        <Typography variant='caption' display='block'>
                          <b>Stem 6 to 9 inches :</b>{' '}
                          <span className={'text-capitalize'}>
                            {stem_6_to_9_20 || 0}
                          </span>
                        </Typography>
                        <Typography variant='caption' display='block'>
                          <b>Stem 9 plus inches :</b>{' '}
                          <span className={'text-capitalize'}>
                            {stem_9_plus_20 || 0}
                          </span>
                        </Typography>
                      </>
                    }
                  >
                    <span style={{ borderBottom: '1px dotted' }}>
                      {estimate_of_biomass_detected_20 || 0} Tonnes
                    </span>
                  </HtmlTooltip>
                </Typography>

                <Typography
                  variant='caption'
                  display='block'
                  className={'show_comment'}
                  style={{ fontSize: 14 }}
                >
                  <b style={{ fontSize: 14 }}>Email:</b> {email || 'No email'}
                </Typography>
                <Typography
                  variant='caption'
                  display='block'
                  className={'show_comment'}
                  style={{ fontSize: 14 }}
                >
                  <b style={{ fontSize: 14 }}>Phone:</b> {phone || 'No phone'}
                </Typography>
                <Typography
                  variant='caption'
                  display='block'
                  className={'show_comment'}
                  style={{ fontSize: 14 }}
                >
                  <b style={{ fontSize: 14 }}>Distance from site:</b>{' '}
                  {distance_from_site || 'Not available'}
                </Typography>
              </div>
            </CardActionArea>
            <div style={{ padding: 10 }}>
              {property_id === selectedId ? (
                // <Paper className={classes.root} elevation={1}>
                <>
                  <div className={classes.root}>
                    <Input
                      placeholder='Type a bid'
                      fullWidth
                      className={classes.input}
                      value={selectBid}
                      onChange={e => {
                        setSelectBid(e.target.value)
                      }}
                      startAdornment={
                        <>
                          <span
                            style={{
                              marginRight: 5,
                              color: BaseColor.lemonGreen,
                              fontSize: 16,
                              fontWeight: '900'
                            }}
                          >
                            $
                          </span>
                          <span
                            style={{
                              marginRight: 5,
                              color: BaseColor.lemonGreen,
                              fontSize: 16,
                              fontWeight: 'bold'
                            }}
                          >
                            |
                          </span>
                        </>
                      }
                      endAdornment={
                        <>
                          <IconButton
                            color='primary'
                            className={classes.iconButton}
                            onClick={() => {
                              sendBid(selectBid)
                            }}
                          >
                            <SendIcon />
                          </IconButton>
                          <IconButton
                            color='primary'
                            className={classes.iconButton}
                            onClick={() => {
                              // onCloseClick()
                              setSelectBid('')
                              setSelectedId('')
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </>
                      }
                    />
                  </div>
                </>
              ) : (
                <button
                  disabled={bid_accepted}
                  style={{
                    // marginTop: 10,
                    background: bid_accepted
                      ? BaseColor.greyTxt
                      : BaseColor.lemonGreen,
                    borderRadius: 13,
                    padding: '0px 20px',
                    flexDirection: 'row',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    zIndex: 10,
                    border: 0
                  }}
                  onClick={() => {
                    setSelectedId(property_id)
                  }}
                >
                  <div
                    style={{
                      background: bid_accepted ? 'black' : 'white',
                      borderRadius: 100,
                      height: 20,
                      width: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex'
                    }}
                  >
                    <AttachMoneyIcon
                      style={{
                        fontSize: 15,
                        color: bid_accepted
                          ? BaseColor.white
                          : BaseColor.lemonGreen
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: 'white',
                      fontWeight: 'semi-bold',
                      marginLeft: 5,
                      fontSize: 14,
                      textAlign: 'center'
                    }}
                  >
                    {bid_accepted ? 'Bid Placed/Accepted' : 'Place Bid'}
                  </span>
                </button>
              )}
            </div>
            {user && user['user_type'] !== 'lto' && (
              <CardActions
                className='p-0 justify-content-between'
                disableSpacing
              >
                <FormControl sx={{ m: 1 }} size='small'>
                  <InputLabel id='demo-select-small'>
                    <b>Status</b>
                  </InputLabel>
                  <Select
                    labelId='demo-select-small'
                    id='demo-select-small'
                    value={dropdown}
                    label='Status'
                    onChange={handleChange}
                  >
                    {property_status().map(
                      (option, index) =>
                        option !== 'all' &&
                        option !== 'sign up' && (
                          <MenuItem
                            key={index}
                            className={'text-capitalize'}
                            value={option}
                          >
                            <Typography variant='caption' display='block'>
                              {option}
                            </Typography>
                          </MenuItem>
                        )
                    )}
                  </Select>
                </FormControl>
              </CardActions>
            )}
          </div>
          {openOffTakerModal && (
            <OffTaker
              openOffTakerModal={openOffTakerModal}
              closeOffTakerModal={closeOffTakerModal}
              email={email}
              property_id={property_id}
            />
          )}
          {openAcceptBidModal && (
            <AcceptBid
              openOffTakerModal={openAcceptBidModal}
              closeOffTakerModal={closeAcceptBidModal}
              email={email}
              property_id={property_id}
            />
          )}

          {userDashboard && (
            <UserDashboard
              open={userDashboard}
              onClose={closeUserDashboard}
              email={email}
              property_id={property_id}
            />
          )}

          {commentModal && (
            <Comment
              open={commentModal}
              onClose={closeCommentModal}
              email={email}
              comment={comment}
              property_id={property_id}
            />
          )}
          {openAcceptCharacteristicsModal && (
            <AcceptCharacteristics
              open={openAcceptCharacteristicsModal}
              onClose={() => {
                setOpenAcceptCharacteristicsModal(false)
              }}
              property_id={property_id}
            />
          )}
        </div>
      ) : (
        <div className='col-sm-12 col-md-12 col-lg-6'>
          <div
            className={
              `${selectedGeo === property_id ? 'active_card' : ''}` +
              ' card p-0 '
            }
            onClick={openModal}
          >
            <CardHeader
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly'
              }}
              className={'p-2'}
              avatar={
                <Avatar
                  sx={{
                    bgcolor: BaseColor.lemonGreen,
                    height: '25px',
                    width: '25px',
                    fontSize: '1rem'
                  }}
                  aria-label='recipe'
                >
                  {' '}
                  {name.charAt(0)}{' '}
                </Avatar>
              }
              title={
                <Tooltip title={isSmallScreen ? '' : name} placement='bottom'>
                  <Typography variant='caption' display='block'>
                    <b>
                      {isSmallScreen ? name : name.slice(0, 9)}
                      {isSmallScreen ? '' : '...'}
                    </b>
                  </Typography>
                </Tooltip>
              }
              action={
                <>
                  {user && user['user_type'] !== 'lto' && (
                    // <>
                    //   <IconButton
                    //     className={'p-1'}
                    //     title={'Send mail'}
                    //     aria-label='send mail'
                    //     onClick={() => handleOpen(email)}
                    //   >
                    //     <EmailIcon />
                    //   </IconButton>
                    //   <IconButton
                    //     className={'p-1'}
                    //     title={'Add comment'}
                    //     aria-label='add comment to property'
                    //     onClick={() => openCommentModal()}
                    //   >
                    //     <NoteAltIcon />
                    //   </IconButton>
                    //   <IconButton
                    //     className={'p-1'}
                    //     title={'Open user dashboard'}
                    //     aria-label='open user dashboard'
                    //     onClick={() => openUserDashboard()}
                    //   >
                    //     <AccountBoxIcon />
                    //   </IconButton>
                    // </>
                    <>
                      <div>
                        <IconButton
                          aria-label='more'
                          id='long-button'
                          aria-controls={open ? 'long-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup='true'
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id='long-menu'
                          MenuListProps={{
                            'aria-labelledby': 'long-button'
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              // minHeight: ITEM_HEIGHT * 4.5,
                              width: '20ch'
                            }
                          }}
                        >
                          {jpaOptions.map(option => (
                            <MenuItem
                              key={option}
                              selected={option === 'Pyxis'}
                              onClick={() => handleJpaChange(option)}
                            >
                              <ListItemIcon
                                className={'p-1'}
                                title={option.name}
                                aria-label={option.name}
                              >
                                {option.icon}
                              </ListItemIcon>
                              <Typography
                                variant='inherit'
                                className={'p-1 text-capitalize'}
                                title={option.name}
                                aria-label={option.name}
                                style={{ whiteSpace: 'initial', fontSize: 13 }}
                              >
                                <>
                                  {option.name === 'invite ltos'
                                    ? 'Invite LTOs'
                                    : option.name}
                                </>
                              </Typography>
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
                    </>
                  )}
                </>
              }
            ></CardHeader>
            {/* <CardHeader
              className={'p-2'}
              avatar={
                <Avatar
                  sx={{
                    bgcolor: BaseColor.lemonGreen,
                    height: '25px',
                    width: '25px',
                    fontSize: '1rem'
                  }}
                  aria-label='recipe'
                >
                  {' '}
                  {name.charAt(0)}{' '}
                </Avatar>
              }
              title={
                <Grid container spacing={1} alignItems='center'>
                  <Grid item>
                    <Typography variant='caption' component='div'>
                      <b>
                        {name.slice(0, 8)}
                        {'...'}
                      </b>
                    </Typography>
                  </Grid>
                  <Grid item>
                    {user && user['user_type'] !== 'lto' && (
                      <>
                        <IconButton
                          className={'p-1'}
                          title={'Send mail'}
                          aria-label='send mail'
                          onClick={() => handleOpen(email)}
                        >
                          <EmailIcon />
                        </IconButton>
                        <IconButton
                          className={'p-1'}
                          title={'Add comment'}
                          aria-label='add comment to property'
                          onClick={() => openCommentModal()}
                        >
                          <NoteAltIcon />
                        </IconButton>
                        <IconButton
                          className={'p-1'}
                          title={'Open user dashboard'}
                          aria-label='open user dashboard'
                          onClick={() => openUserDashboard()}
                        >
                          <AccountBoxIcon />
                        </IconButton>
                      </>
                    )}
                  </Grid>
                </Grid>
              }
            /> */}
            <Box>
              {img_url.length === 0 ? (
                <CardMedia
                  component='img'
                  className={classes.galleryImg}
                  image={'/img/no-image.png'}
                  alt={'no-image.png'}
                />
              ) : (
                <>
                  <ImageViewer
                    data={img_url}
                    activePhoto={photoIndex}
                    setActivePhoto={setPhotoIndex}
                    isOpen={isOpen}
                    onClose={closeImageViewer}
                  />
                  {img_url.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => {
                        openImageViewer(index)
                      }}
                      className={
                        index !== activeStep ? 'd-none w-100 p-0' : 'w-100 p-0'
                      }
                    >
                      <img
                        src={option}
                        align={'profile'}
                        className={classes.galleryImg}
                        alt={option}
                      />
                    </Button>
                  ))}
                  <MobileStepper
                    className={classes.stepper}
                    variant='dots'
                    steps={img_url.length}
                    position='static'
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        className={'stepper-next'}
                        size='small'
                        onClick={handleNext}
                        disabled={activeStep === img_url.length - 1}
                      >
                        <KeyboardArrowRight />
                      </Button>
                    }
                    backButton={
                      <Button
                        className={'stepper-back'}
                        size='small'
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        <KeyboardArrowLeft />
                      </Button>
                    }
                  />
                </>
              )}
            </Box>
            <CardActionArea onClick={() => onSelect(property_id)}>
              <div className='p-2'>
                <Typography
                  variant='caption'
                  display='block'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  <b style={{ fontSize: 14 }}>Address:</b> {address}
                </Typography>
                <Typography variant='caption' display='block'>
                  <b style={{ fontSize: 14 }}>Burn risk:</b>{' '}
                  <span className={'text-capitalize'}>{burn_risk}</span>
                </Typography>
                <Typography variant='caption' display='block'>
                  <b style={{ fontSize: 14 }}>Estimate of Biomass: </b>
                  <HtmlTooltip
                    title={
                      <>
                        <Typography variant='caption' display='block'>
                          <b>Branch :</b>{' '}
                          <span className={'text-capitalize'}>{branch}</span>
                        </Typography>
                        <Typography variant='caption' display='block'>
                          <b>Foliage :</b>{' '}
                          <span className={'text-capitalize'}>{foliage}</span>
                        </Typography>
                        <Typography variant='caption' display='block'>
                          <b>Stem 4 to 6 inches :</b>{' '}
                          <span className={'text-capitalize'}>
                            {stem_4_to_6}
                          </span>
                        </Typography>
                        <Typography variant='caption' display='block'>
                          <b>Stem 6 to 9 inches :</b>{' '}
                          <span className={'text-capitalize'}>
                            {stem_6_to_9}
                          </span>
                        </Typography>
                        <Typography variant='caption' display='block'>
                          <b>Stem 9 plus inches :</b>{' '}
                          <span className={'text-capitalize'}>
                            {stem_9_plus}
                          </span>
                        </Typography>
                      </>
                    }
                  >
                    <span style={{ borderBottom: '1px dotted' }}>
                      {estimate_of_biomass_detected_20} Tonnes
                    </span>
                  </HtmlTooltip>
                </Typography>

                <Typography
                  variant='caption'
                  display='block'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  <b style={{ fontSize: 14 }}>APN :</b> { }
                </Typography>

                <Typography
                  variant='caption'
                  display='block'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  <b style={{ fontSize: 14 }}>County :</b> { }
                </Typography>

                <Typography
                  variant='caption'
                  display='block'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  <b style={{ fontSize: 14 }}>Email :</b> {email}
                </Typography>

                <Typography
                  variant='caption'
                  display='block'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  <b style={{ fontSize: 14 }}>Phone :</b> {phone}
                </Typography>

                {/* <Typography
                  variant='caption'
                  display='block'
                  className={'show_comment'}
                >
                  <b style={{ fontSize: 14 }}>Comment:</b> {comment}
                </Typography> */}
              </div>
            </CardActionArea>
            {user && user['user_type'] !== 'lto' ? (
              <></>
              //   <CardActions
              //   className='p-0 justify-content-between'
              //   disableSpacing
              // >
              //     <FormControl sx={{ m: 1 }} size='small'>
              //       <InputLabel id='demo-select-small'>
              //         <b>Status</b>
              //       </InputLabel>
              //       <Select
              //         placeholder='Select'
              //         labelId='demo-select-small'
              //         id='demo-select-small'
              //         value={dropdown}
              //         label='Status'
              //         onChange={handleChange}
              //       >
              //         {property_status().map(
              //           (option, index) =>
              //             option !== 'all' &&
              //             option !== 'sign up' && (
              //               <MenuItem
              //                 key={index}
              //                 className={
              //                   option !== 'invite ltos' && 'text-capitalize'
              //                 }
              //                 value={option}
              //               >
              //                 <Typography variant='caption' display='block'>
              //                   {option === 'invite ltos'
              //                     ? 'Invite LTOs'
              //                     : option}
              //                 </Typography>
              //               </MenuItem>
              //             )
              //         )}
              //       </Select>
              //     </FormControl>

              //   </CardActions>
            ) : (
              <div
                style={{
                  margin: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <div
                  style={{
                    background: BaseColor.lemonGreen,
                    borderRadius: 13,
                    padding: '0px 20px',
                    marginRight: 20,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    handleMessage()
                  }}
                >
                  <EmailIcon
                    style={{
                      color: 'white'
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 'semi-bold',
                      color: 'white',
                      marginLeft: 5,
                      fontSize: 14
                    }}
                  >
                    Message
                  </span>
                </div>
                <div
                  style={{
                    background: BaseColor.lemonGreen,
                    borderRadius: 13,
                    padding: '0px 20px',
                    flexDirection: 'row',
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <div
                    style={{
                      background: 'white',
                      borderRadius: 100,
                      height: 20,
                      width: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex'
                    }}
                  >
                    <AttachMoneyIcon
                      style={{
                        fontSize: 15,
                        color: BaseColor.lemonGreen
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: 'white',
                      fontWeight: 'semi-bold',
                      marginLeft: 5,
                      fontSize: 14
                    }}
                  >
                    Place Bid
                  </span>
                </div>
              </div>
            )}
          </div>
          {openOffTakerModal && (
            <OffTaker
              openOffTakerModal={openOffTakerModal}
              closeOffTakerModal={closeOffTakerModal}
              email={email}
              property_id={property_id}
            />
          )}
          {openAcceptBidModal && (
            <AcceptBid
              openOffTakerModal={openAcceptBidModal}
              closeOffTakerModal={closeAcceptBidModal}
              email={email}
              property_id={property_id}
            />
          )}
          {openAcceptCharacteristicsModal && (
            <AcceptCharacteristics
              open={openAcceptCharacteristicsModal}
              onClose={() => {
                setOpenAcceptCharacteristicsModal(false)
              }}
              property_id={property_id}
            />
          )}

          {userDashboard && (
            <UserDashboard
              open={userDashboard}
              onClose={closeUserDashboard}
              email={email}
              property_id={property_id}
            />
          )}

          {commentModal && (
            <Comment
              open={commentModal}
              onClose={closeCommentModal}
              email={email}
              comment={comment}
              property_id={property_id}
            />
          )}
        </div>
      )}
    </>
  )
}

export default UserInfoCard
