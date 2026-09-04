import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Developers from '../components/Developers'
import AboutStoreys from '../components/AboutStoreys'
import PropertyBanner from '../components/PropertyBanner'
import ExploreDubai from '../components/ExploreDubai'
import DubaiRealEstate from '../components/DubaiRealEstate'
import Testimonials from '../components/Testimonials'
import ListingForm from '../components/ListingForm'
import Footer from '../components/Footer'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Developers />
        <AboutStoreys />
        <PropertyBanner />
        <ExploreDubai />
        <DubaiRealEstate />
        <Testimonials />
        <ListingForm />
      </main>

      <Footer />
    </div>
  )
}

export default PublicLayout
