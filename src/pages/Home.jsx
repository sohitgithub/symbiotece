import React from 'react'
import HeroSection from '../components/HeroSection'
import GrowthDriversSection from '../components/GrowthDriversSection'
import GraphSection from '../components/GraphSection'
import KeyHighlight from '../components/KeyHighlight'
import Resources from '../components/Resources'

const Home = () => {
  return (
    <>
    <HeroSection/>
    {/* <GrowthDriversSection /> */}
    <GraphSection />
    {/* <KeyHighlight /> */}
    <Resources />
    </>
  )
}

export default Home