import React from 'react'
import { useState } from 'react'
import Testimonial from '../components/Testimonial'
import Services from '../components/Services'
import Analysis from '../components/Analysis'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Banner from '../components/Banner'
import Steps from '../components/Steps'
import FindProperty from '../components/FindProperty'
import MapEnrolDetails from '../components/MapEnrolDetails'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Home = props => {
  const [mapFlag, setMapFlag] = useState('map')
  const [data, setData] = useState('')
  const { user } = useSelector(state => state.auth)

  if (user) {
    if (user.user_type === 'user') {
      return <Redirect to='/user-timeline' />
    }

    if (user.user_type === 'jpa' || user.user_type === 'rpf') {
      return <Redirect to='/admin-timeline' />
    }

    if (user.user_type === 'lto') {
      return <Redirect to='/lto-timeline' />
    }
  }

  function navigateToFindProperty () {
    setMapFlag('MapFindProperty')
  }

  function navigateToEnrolDetails (data) {
    setMapFlag('MapEnrol')
    setData(data['response'])
  }

  return (
    <>
      <Banner />
      <Steps />
      <Testimonial />
      <Services />
      {mapFlag === 'map' && (
        <Analysis navigateFindProperty={() => navigateToFindProperty()} />
      )}
      {mapFlag === 'MapFindProperty' && (
        <FindProperty
          navigateEnrolDetails={data => navigateToEnrolDetails(data)}
        />
      )}
      {mapFlag === 'MapEnrol' && <MapEnrolDetails data={data} />}
      <FAQ />
      <Contact />
    </>
  )
}

export default Home
