
import React from 'react'
import SideNavbar from '../components/SideNavbar';
import CityBG from "../assets/CityBG.svg"

function Subscription() {
    localStorage.setItem('subsription', "true");

  return (
    <div className='flex  bg-[#167DE5]'>
      <SideNavbar />
      <div className='slideIn relative w-screen h-screen bg-white rounded-tl-[50px]'>
        <div className='bg absolute z-0 flex w-screen bottom-0'>
          <img src={CityBG} alt="cityBack" className='absolute bottom-0 left-0  opacity-[25%]' draggable="false" />
        </div>
        <div className=' relative z-2 p-10  w-screen h-screen  '>
            <div className='w-[90%] h-full flex justify-center'>
                <div className='px-30 bg-white border-2 w-full  border-[#167DE5] justify-center items-center flex flex-col rounded-xl'>
                
                  <div className="flex flex-col items-center justify-between w-full md:flex-row">
                    {/* ── Left info column ── */}
                    
                    <div className="border-b md:border-b-0  mb-6 md:mb-0">
                      <div className="flex items-center mb-6">
                      <h2 className="text-4xl text-pink-500 font-bold">Subscription</h2>
                      </div>
                      <div className="space-y-4 text-sm">
                        <div>
                          <p className="text-gray-500 text-xl font-medium uppercase">Current Plan</p>
                          <p className="mt-1 font-medium">Free</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xl font-medium uppercase">Renewal date / Expiry</p>
                          <p className="mt-1 font-medium">DD/MM/2028</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xl font-medium uppercase">Payment methods</p>
                          <p className="mt-1 font-medium">Credit</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xl font-medium uppercase">Billing history</p>
                          <a
                            href=""
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center text-pink-500 hover:underline"
                          >
                            {/* <Download className="w-4 h-4 mr-1" /> */}
                            Download billing history
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* ── Right plan cards ── */}
                    <div className="w-[40%] grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { name: 'Standard', color: 'bg-blue-500' },
                        { name: 'Premium', color: 'bg-yellow-500' },
                      ].map(plan => (
                        <div
                          key={plan.name}
                          className="bg-gray-100 rounded-2xl p-6 flex flex-col items-center"
                        >
                          {/* Placeholder “card” graphic */}
                          <div
                            className={`${plan.color} w-32 h-20 rounded-lg `}
                          />

                          <h3 className="mt-4 text-xl font-bold">{plan.name}</h3>
                          <p className="mt-1 text-3xl font-bold">$</p>

                          <button
                        
                            className="mt-5 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition"
                          >
                            Change Plan
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  )
}

export default Subscription
