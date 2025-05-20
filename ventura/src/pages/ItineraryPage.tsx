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

  // Extended with parsed Date objects
  interface ScheduledActivity extends Activity {
    start: Date;
    end: Date;
  }

  // Schedule_Per_Day model from backend
  interface SchedulePerDay {
    id: number;
    itinerary_id: number;
    date: string;
  }



  const token = localStorage.getItem('token');
  const [itineraryName, setItineraryName] = useState('')
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [schedules, setSchedules] = useState<SchedulePerDay[]>([]);
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
  const [activities, setActivities] = useState<ScheduledActivity[]>([]);
  const [actionBar, setActionBar] = useState(0)
  const [selectedActivity, setSelectedActivity] = useState<ScheduledActivity | null>(null);
  const [isActivities, setIsActivities] = useState(true)
  const [isBudget, setIsBudget] = useState(false)
  const [isAccommodation, setIsAccommodation] = useState(false)
  const [isTransportation, setIsTransportation] = useState(false)
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

  const changeToActivity = () => {
    setIsActivities(true)
    setIsBudget(false)
    setIsAccommodation(false)
    setIsTransportation(false)
  }

  const changeToBudget = () => {
    setIsActivities(false)
    setIsBudget(true)
    setIsAccommodation(false)
    setIsTransportation(false)
  }

  const changeToAcommodation = () => {
    setIsActivities(false)
    setIsBudget(false)
    setIsAccommodation(true)
    setIsTransportation(false)
  }

  const changeToTransportation = () => {
    setIsActivities(false)
    setIsBudget(false)
    setIsAccommodation(false)
    setIsTransportation(true)
  }


    const [selected, setSelected] = useState<
      'activity' | 'accommodation' | 'budget' | 'transportation'
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

            </div>
          </div>
        </div>
      </div>
    )
  }

  export default ItineraryPage
