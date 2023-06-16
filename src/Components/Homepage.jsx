import React from 'react'
import Carousel from './Carousel'
import HomepageText from './HomepageText'
import PropertiesList from './PropertiesList'
import Footer from './Footer'

function Homepage() {
  return (
    <div>
      <Carousel/>
      <HomepageText/>
      <PropertiesList/>
     <Footer/>

    </div>
  )
}

export default Homepage