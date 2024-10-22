import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'font-awesome/css/font-awesome.min.css'
import 'smartwizard/dist/css/smart_wizard_all.min.css'
import './styles/style.css'
import './styles/new_style.css'
import './styles/loader.css'
import { logout } from './redux/actions/auth'
import { clearMessage } from './redux/actions/message'
import { history } from './helpers/history'
import AuthVerify from './common/AuthVerify'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Map from './pages/Map'
import Header from './components/layout/Header'
import Register from './components/modal/Register'
import Login from './components/modal/Login'
import VerifyEmail from './components/modal/VerifyEmail'
import { ToastContainer } from 'react-toastify'
import ForgotPassword from './components/modal/ForgotPassword'
import ResetPassword from './components/modal/ResetPassword'
import 'react-toastify/dist/ReactToastify.css'
import AdminTimeline from './pages/AdminTimeline'
import UserTimeline from './pages/UserTimeline'
import NoPageFound from './pages/NoPageFound'
import Loader from './components/Loader'
import { datadogRum } from '@datadog/browser-rum'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import 'react-image-lightbox/style.css'
import About from './pages/About'
import Feedback from './components/Feedback'
import Account from './pages/Account'
import LTOTimeline from './pages/LTOTimeline'

const App = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { isLoading } = useSelector(state => state.other)
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'))

  useEffect(() => {
    history.listen(location => {
      dispatch(clearMessage())
    })
  }, [dispatch])

  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  datadogRum.init({
    applicationId: '69c8eb97-6ef1-4ce8-93db-8783e4e38cd0',
    clientToken: 'pub7f465354350581f6e06c8aeb2c2b7b60',
    site: 'datadoghq.com',
    service: 'woodbiomass',
    env: 'dev',
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sampleRate: 100,
    sessionReplaySampleRate: 20,
    trackInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input'
  })

  datadogRum.startSessionReplayRecording()

  return (
    <Router history={history}>
      <div className={'main-body'}>
        <Header />
        <div>
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route exact path='/map' component={Map} />
            <Route exact path='/about' component={About} />
            <Route exact path='/lto-timeline' component={LTOTimeline} />
            {user && user.user_type === 'user' && (
              <Route exact path='/user-timeline' component={UserTimeline} />
            )}
            {user ? (
              user.user_type === 'jpa' ? (
                <Route exact path='/admin-timeline' component={AdminTimeline} />
              ) : user.user_type === 'rpf' ? (
                <Route exact path='/admin-timeline' component={AdminTimeline} />
              ) : (
                <Route exact path='/lto-timeline' component={LTOTimeline} />
              )
            ) : null}
            {/* {user && (user.user_type === 'jpa' || user.user_type === 'lto') && (
              <Route exact path='/lto-timeline' component={LTOTimeline} />
            )} */}
            {user && <Route exact path='/account' component={Account} />}
            <Route component={NoPageFound} />
          </Switch>
        </div>
        <Footer />
        <Register />
        <VerifyEmail />
        <Login />
        <ForgotPassword />
        <ResetPassword />
        <ToastContainer />
        {isLoading && <Loader />}
        <AuthVerify logOut={logOut} />
        <Feedback />
      </div>
    </Router>
  )
}

export default App
