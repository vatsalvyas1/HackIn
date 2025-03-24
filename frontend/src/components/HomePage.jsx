import React from 'react'
import StatusBar from './StatusBar'
import Featured from './Featured'
import HeroSection from './HeroSection'
import DashboardPlaceholder from './DashboardPlaceholder'

function HomePage() {
  return (
    <>
      <HeroSection />
      <StatusBar />
      <Featured />
      <DashboardPlaceholder />
    </>
  )
}

export default HomePage
