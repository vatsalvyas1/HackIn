import React from 'react'
import StatusBar from './StatusBar'
import Featured from './Featured'
import HeroSection from './HeroSection'

function HomePage() {
  return (
    <>
      <HeroSection />
      <StatusBar />
      <Featured />
    </>
  )
}

export default HomePage
