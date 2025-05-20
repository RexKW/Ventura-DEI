import React from 'react'
import { useState, useEffect } from 'react'
import SideNavbar from '../components/SideNavbar';
import { getAllOwnedItineraries } from '../apis/ItinerariesCRUD';
import { Link } from 'react-router-dom'
import CityBG from "../assets/CityBG.svg"

function InvitedItinerariesList() {
  
  const [itineraries,setItineraries] = useState<any[]>([]);

    useEffect(() => {
      const token = localStorage.getItem('token');
      const fetchItinerary = async () => {
        if(token){
          // const itineraries = await getAllInvitedItineraries(token)
          // setItineraries(itineraries.data)

        }
        
  
      };
  
  
      fetchItinerary()
    }, [])
  
  
  
    return (
      <div className='flex '>
        <SideNavbar/>
        <div className='relative w-screen h-screen '>
              <div className='bg absolute z-0 flex w-screen bottom-0'>
                  <img src={CityBG} alt="cityBack" className='absolute bottom-0 left-0  opacity-[25%]' draggable="false" />

              </div>
              <div className=' relative z-2 p-10  w-screen h-screen '>
                <p className='text-4xl font-medium'>Your Holidays</p>
                <div>
                  <>
                  {itineraries?.length > 0 ? (
                      <div  className='grid grid-cols-4 mt-10 gap-10 flex items-center'>
                        {itineraries.map((itinerary) => (
                          <Link
                            to={`/itineraries/${itinerary.id}`}
                            key={itinerary.id}
                            className="bg-[#FEFEFE] rounded-lg p-5 rounded-l border-[#167DE5] shadow-md"
                          >
                            <div className=''>
                              <p className='text-2xl font-medium'>{itinerary.name}</p>
                              <p></p>
                            </div>

                            <div className=''>

                            </div>


                          </Link>
                        ))}
                      </div>
                      ) : (
                        <div className='border-white flex-col p-5 rounded-lg flex w-full h-full justify-center items-center'>
                          <p className='text-black text-5xl font-bold '>You have not been Invited yet</p>
                        </div>
                      )}
                  </>
                </div>
              </div>
          
        </div>
        
      </div>
    )
}

export default InvitedItinerariesList
