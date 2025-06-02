import React from 'react'
import { useState, useEffect } from 'react'
import SideNavbar from '../components/SideNavbar';
import { getAllOwnedItineraries } from '../apis/ItinerariesCRUD';
import { Link, useNavigate } from 'react-router-dom'
import CityBG from "../assets/CityBG.svg"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function ItinerariesList() {

  const [itineraries, setItineraries] = useState<any[]>([]);
  const [itineraryLeft, setitineraryLeft] = useState(3)
  const subs = localStorage.getItem('subscription')
  const navigate = useNavigate();

  const buySub = () => {
    navigate("/Ventura/Subscription")
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchItinerary = async () => {
      if (token) {
        const itineraries = await getAllOwnedItineraries(token)
        setItineraries(itineraries.data)

      }


    };


    fetchItinerary()
  }, [])

  useGSAP(() => {
    gsap.from(".slideIn", { x: 1920, opacity: 1, duration: 0.75 });
  });




  return (
    <div className='flex  bg-[#167DE5]'>
      <SideNavbar />
      <div className='slideIn relative w-screen h-screen bg-white rounded-tl-[50px]'>
        <div className='bg absolute z-0 flex w-screen bottom-0'>
          <img src={CityBG} alt="cityBack" className='absolute bottom-0 left-0  opacity-[25%]' draggable="false" />
        </div>
        <div className=' relative z-2 p-10   '>
          <p className='text-4xl font-bold text-[#EE4266]'>Your Itineraries</p>
          <div className='w-full h-full'>
            <>
              {itineraries?.length > 0 ? (
                <div className="grid grid-cols-4 mt-10 gap-10 items-start w-full h-full justify-center">
                  {itineraries.map((itinerary) => {
                    const commonClasses = `
                          bg-[#FEFEFE] rounded-lg p-5 border-2 p-2 border-[#167DE5] shadow-md
                        `;
                    console.log(itinerary.finished)
                    return itinerary.finished ? (
                      <Link
                        to={`/Ventura/itineraries/${itinerary.id}`}
                        key={itinerary.id}
                        className={commonClasses}
                      >
                        <p className="text-2xl font-medium">{itinerary.name}</p>
                        <div className='flex gap-5'>
                          {new Date(itinerary.start_date)
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })}
                          <p>-</p>
                          {new Date(itinerary.end_date)
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })}
                        </div>

                        <p>Finished: ✅ Completed</p>
                      </Link>
                    ) : (
                      <Link
                        to={`/Ventura/itineraries/${itinerary.id}`}
                        key={itinerary.id}
                        className={commonClasses}
                      >
                        <p className="text-2xl font-medium">{itinerary.name}</p>
                        <div className='flex gap-5'>
                          {new Date(itinerary.start_date)
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })}
                          <p>-</p>
                          {new Date(itinerary.end_date)
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })}
                        </div>

                        <p>Finished: ❌ Not finished</p>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className='  border-white flex-col p-5 rounded-lg flex w-full h-full justify-center items-center'>
                  <p className='text-5xl font-bold text-[#EE4266] '>No itineraries yet</p>
                  <Link to="/Ventura/itineraries/create" className='mt-5'>Create Itinerary</Link>
                </div>
              )}
            </>
          </div>
          

        </div>

              {
            (subs === 'free' || subs === 'standard') && (
              <div className='bg-white justify-between flex absolute items-center z-5 bottom-[5%] w-[75%] left-[15%] rounded-2xl border-2 border-[#167DE5]  p-5'>
                <p className='text-xl'>{itineraryLeft - itineraries.length} free plan Left</p>
                <button onClick={buySub} className='bg-pink-500 px-20 py-2 text-white rounded-3xl hover:bg-pink-600 transition duration-300'>Buy Now</button>
              </div>
            )
          }
      </div>

    </div>
  )
}

export default ItinerariesList
