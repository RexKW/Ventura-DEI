import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getItinerary } from '../apis/ItinerariesCRUD';
import ActivitiesItinerary from '../components/ActivitiesItinerary';
import AccomodationItinerary from '../components/AccomodationItinerary';
import BudgetItinerary from '../components/BudgetItinerary';
import TransportItinerary from '../components/TransportItinerary';
import ItineraryBG from '../assets/ItineraryBG.svg'
import { Activity, Bed, DollarSign, Truck } from 'lucide-react'
import actIcon from '../assets/activitiesIcon.svg'
import transportIcon from '../assets/transportIcon.svg'
import SettingsItinerary from '../components/SettingsItinerary';
// import TransportItinerary from '../components/TransportItinerary';

function ItineraryPage() {
  // Base model from backend
  interface Activity {
    id: number;
    name: string;
    description: string;
    start_time: string;
    end_time: string;
    type: string;
    cost: number;
    day_id: number;
    location_address: string;
    location_link?: string;
    location_address2?: string | null;
    location_link2?: string | null;
  }



  const token = localStorage.getItem('token');
  const [itineraryName, setItineraryName] = useState('')
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { id } = useParams();
  useEffect(() => {
    const fetchItinerary = async () => {
      if (token && id) {
        const itinerary = await getItinerary(token, id);
        console.log(itinerary)
        setItineraryName(itinerary.data.name)
        setStartDate(itinerary.data.start_date)
        setEndDate(itinerary.data.end_date)
        console.log(itineraryName)
      }

    };
    fetchItinerary()
  }, [token, id])


    const [selected, setSelected] = useState<
      'activity' | 'accommodation' | 'budget' | 'transportation' | 'settings'
    >('activity')
  





    return (
      <div className='flex relative w-screen h-screen items-center justify-center px-0'>
        <img src={ItineraryBG} className='z-0 bottom-0 left-0 absolute w-screen' alt="" />
        <div className='relative z-2 flex items-center justify-center gap-5'>
          {/* action menu */}
          <div className='bg-[#167DE5] p-5 rounded-lg'>
            <ul className="flex flex-col space-y-4">
              <li>
                <button
                  onClick={() => { setSelected('activity'); /* changeToActivity() */ }}
                  aria-label="Activity"
                  className={
                    `p-3 rounded-full transition-colors ` +
                    (selected === 'activity'
                      ? 'bg-[#EE4266] text-white'
                      : 'text-white hover:bg-[#EE4266]')
                  }
                >
                  <img src={actIcon} className="w-6 h-6" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => { setSelected('accommodation'); /* changeToAccommodation() */ }}
                  aria-label="Accommodation"
                  className={
                    `p-3 rounded-full transition-colors ` +
                    (selected === 'accommodation'
                      ? 'bg-[#EE4266] text-white'
                      : 'text-white hover:bg-[#EE4266]')
                  }
                >
                  <Bed className="w-6 h-6" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => { setSelected('budget'); /* changeToBudget() */ }}
                  aria-label="Budget"
                  className={
                    `p-3 rounded-full transition-colors ` +
                    (selected === 'budget'
                      ? 'bg-[#EE4266] text-white'
                      : 'text-white hover:bg-[#EE4266]')
                  }
                >
                  <DollarSign className="w-6 h-6" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => { setSelected('transportation'); /* changeToTransportation() */ }}
                  aria-label="Transportation"
                  className={
                    `p-3 rounded-full transition-colors ` +
                    (selected === 'transportation'
                      ? 'bg-[#EE4266] text-white'
                      : 'text-white hover:bg-[#EE4266]')
                  }
                >
                  <img src={transportIcon} className="w-6 h-6" />
                </button>
              </li>
              <li>
                <button onClick={()=>{setSelected('settings')}} className={
                    `p-3 rounded-full transition-colors ` +
                    (selected === 'settings'
                      ? 'bg-[#EE4266] text-white'
                      : 'text-white hover:bg-[#EE4266]')
                  }>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='w-6 h-6' fill='white' viewBox="0 0 50 50">
                      <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
                  </svg>
                </button>
              </li>
              
            </ul>
          </div>

          {/* main canvas */}
          <div className='flex flex-col w-[85vw]'>
            <div className='justify-between flex mb-2'>
              <p className='text-[#167DE5] font-medium'><span className='font-bold'>Itinerary name:</span> {itineraryName}</p>
              <p className='text-[#167DE5] font-medium'><span className='font-bold'>Date: </span>
                {new Date(startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
                -
                {new Date(endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}</p>
            </div>
            <div className='w-full h-[85vh] bg-white/90 flex flex-col border-2 border-[#167DE5] rounded-xl overflow-y-auto p-10'>
              {selected === 'activity' && (
                <ActivitiesItinerary />
              )
              }

              {selected === 'accommodation' && (
                <AccomodationItinerary />
              )}

              {selected === 'budget' && (
                <BudgetItinerary />
              )}

              {selected === 'transportation' && (
                <TransportItinerary />
              )}
              {selected === 'settings' && (
                <SettingsItinerary/>
              )

              }

            </div>
          </div>
        </div>
      </div>
    )
  }

  export default ItineraryPage
