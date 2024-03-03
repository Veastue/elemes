import React from 'react'
import SiteNavbar from './_components/site-navbar'
import Hero from './_components/hero'
import Footer from './_components/footer'
// /Burning the midnight oil, pull an all-nighter
const page = () => {
  return (
    <div className='w-screen h-full backdrop-blur-sm'>
      <div className='fixed w-screen'>
        <SiteNavbar />
      </div>
      <Hero/>
      <Footer />
    </div>
  )
}

export default page