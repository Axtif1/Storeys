import React from 'react'
import burjAlArab from '../assets/burj-al-arab.png'

const DubaiRealEstate = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative">
          
          {/* Dark Container */}
          <div className="bg-[#242424] text-white rounded-xl p-12 md:p-16 lg:w-[85%] shadow-xl relative z-0">
            <div className="lg:w-[62%] lg:pr-8">
              <h2 className="text-3xl md:text-[36px] font-medium mb-6 leading-[1.25]">
                Buy Real Estate in Dubai With<br />
                the Fastest growing Firm
              </h2>
              
              <div className="space-y-5 text-gray-300 text-[14px] md:text-[14px] leading-[1.8] font-normal">
                <p>
                  At the core of Storeys' ethos lies a profound understanding of
                  market trends, coupled with an acute awareness of the evolving
                  needs of its clientele. Leveraging this insight, the company
                  meticulously curates investment options that promise not just
                  financial returns but also an unparalleled lifestyle experience.
                </p>
                <p>
                  Moreover, Storeys holistic approach to real estate investment
                  extends beyond mere property acquisition. Recognizing the
                  importance of comprehensive asset management, the company
                  offers a suite of value-added services aimed at optimizing the
                  performance and maximizing the returns on investment properties.
                </p>
                <p className="font-medium text-white pt-1">
                  Your ideal property journey starts here!
                </p>
              </div>
            </div>
          </div>

          {/* Overlapping Image */}
          <div className="lg:absolute lg:right-0 lg:top-[12%] lg:bottom-[-12%] lg:w-[42%] mt-8 lg:mt-0 z-10 px-4 lg:px-0">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl">
              <img
                src={burjAlArab}
                alt="Burj Al Arab"
                className="w-full h-[400px] lg:h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default DubaiRealEstate
