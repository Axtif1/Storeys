import React from 'react'
import burjAlArab from '../assets/burj-al-arab.png'

const DubaiRealEstate = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative pt-4 pb-12">
          
          {/* Dark Container */}
          <div 
            className="relative bg-[#212121] text-white p-8 md:p-12 lg:pl-16 lg:py-16 lg:w-[1120.57px] max-w-full lg:h-[644.74px] shadow-2xl relative z-0 flex flex-col justify-center"
            style={{ borderRadius: '10.64px' }}
          >
            <div className="w-full lg:w-[500px] lg:max-w-full absolute left-10 ">
              <h2 
                className="text-white mb-6"
                style={{
                  fontFamily: "'Atyp Display TRIAL', sans-serif",
                  fontWeight: 500,
                  fontStyle: 'normal',
                  fontSize: '36px',
                  lineHeight: '120%',
                  letterSpacing: '0%'
                }}
              >
                Buy Real Estate in Dubai With<br />the Fastest growing Firm
              </h2>
              
              <div className="space-y-5 text-[#CCCCCC]">
                <p 
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: '15px',
                    lineHeight: '23px',
                    letterSpacing: '0%'
                  }}
                >
                  At the core of Storeys’ ethos lies a profound understanding of market trends, coupled with an acute awareness of the evolving needs of its clientele. Leveraging this insight, the company meticulously curates investment options that promise not just financial returns but also an unparalleled lifestyle experience.
                </p>
                <p 
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: '15px',
                    lineHeight: '23px',
                    letterSpacing: '0%'
                  }}
                >
                  Moreover, Storeys holistic approach to real estate investment extends beyond mere property acquisition. Recognizing the importance of comprehensive asset management, the company offers a suite of value-added services aimed at optimizing the performance and maximizing the returns on investment properties.
                </p>
                <p 
                  className="text-white pt-1 font-medium"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '15px',
                    lineHeight: '23px',
                    letterSpacing: '0%'
                  }}
                >
                  Your ideal property journey starts here!
                </p>
              </div>
            </div>
          </div>

          {/* Overlapping Image */}
          <div 
            className="lg:absolute lg:right-0 lg:top-[80px] lg:w-[585.59px] lg:h-[604.62px] mt-8 lg:mt-0 z-10 w-full px-0"
            style={{ opacity: 1 }}
          >
            <div 
              className="w-full h-[450px] lg:h-full overflow-hidden shadow-2xl"
              style={{ borderRadius: '10px' }}
            >
              <img
                src={burjAlArab}
                alt="Burj Al Arab"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default DubaiRealEstate
