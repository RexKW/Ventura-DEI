import React from 'react'
import { useState, useEffect } from 'react'
import SideNavbar from '../components/SideNavbar';
import { createItinerary, getAllOwnedItineraries } from '../apis/ItinerariesCRUD';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CityBG from "../assets/CityBG.svg"
import { getUser } from '../apis/UserCRUD';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function CreateItinerary() {
  
  const [name,setName] = useState('');
  const [accomodationBudget,setAccomodationBudget] = useState(0)
  const [transportationBudget,setTransportationBudget] = useState(0)
  const [culinaryBudget,setCulinaryBudget] = useState(0)
  const [entertainmentBudget,setEntertainmentBudget] = useState(0)
  const [miscBudget,setMiscBudget] = useState(0)
  const [section, setSection] = useState(1)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [request, setRequest] = useState('');
  const [itineraries,setItineraries] = useState<any[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [itineraryCount, setItineraryCount] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const sub = localStorage.getItem('subscription');
  const [itineraryLeft, setitineraryLeft] = useState(3)
    const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const response = await getUser(token);
        await setIsPremium(response.data.premium);
        const itineraries = await getAllOwnedItineraries(token)
        await setItineraryCount(itineraries.data.length);
        console.log(itineraries.data.length)
        
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    }
    fetchProfile();
    
  }, [token]);

  useGSAP(() => {
    gsap.from(".slideIn", { x:1920, opacity:1, duration:0.75});
  });
  const buySub = () => {
    navigate("/Ventura/Subscription")
  }


  

    
      const makeItinerary = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    setIsLoading(true)
    try {
      await createItinerary(
        token,
        name,
        startDate,
        endDate,
        request,
        accomodationBudget,
        transportationBudget,
        culinaryBudget,
        entertainmentBudget,
        miscBudget
      )
      navigate("/Ventura/itineraries")
    } catch (err) {
      console.error("Error creating itinerary", err)
    } finally {
      setIsLoading(false)
    }
  }

      const validateSection1 = () => {
        if (!name.trim()) return false;

        if(sub === 'free' && token){
          if(itineraryCount>3){
            return false
          }
          
            
        }
          
          

        if (!startDate || !endDate) return false;

        if (new Date(endDate) < new Date(startDate)) return false;

        return true;
      };


      const validateSection2 = () => {
        if (!accomodationBudget) return false;
        if (!transportationBudget) return false;
        if (!culinaryBudget) return false;
        if (!entertainmentBudget) return false;
        if (!miscBudget) return false;
        return true;
      };

      const validateSection3 = () => {
        if (!request) return false;

        return true;
      };


      const nextSection = () =>{
        setSection(section + 1)
      }

      const prevSection = () =>{
        setSection(section - 1)
      }


  
  
  
  
    return (
      <div className='flex bg-[#167DE5]'>
        {isLoading && (
        <div className="fixed inset-0 bg-black/25 flex justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
        <SideNavbar/>
        <div className='slideIn relative w-screen bg-white rounded-tl-[50px]'>
              <div className='bg absolute z-0 flex w-screen bottom-0'>
                  <img src={CityBG} alt="cityBack" className='absolute bottom-0 left-0  opacity-[25%]' draggable="false" />

              </div>
              <div className=' relative z-2 p-10 justify-center items-center  w-full h-screen'>
                
                <div className='w-full h-full flex flex-col mt-10 gap-10 flex justify-center items-center'>
                    <form onSubmit={CreateItinerary} className='w-[40vw] bg-[#F9F9F9] p-5 rounded-[10px] border-2 border-[#167DE5]'>
                      {section == 1 &&(
                      <div id='section1'>
                        <p className='text-3xl font-bold text-[#EE4266] mb-5'>Initialize Itinerary</p>
                        <div className='flex flex-col'>
                            <label className='text-[#EE4266]'>Itinerary Name</label>
                            <input name="email" className=' rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5] p-2 focus:bg-pink-200 transition duration-200' value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className='flex w-full justify-between gap-10 mt-5'>
                          <div className="flex w-full flex-col basis-[50%]">
                            <label className="text-[#EE4266] mb-1">Start Date</label>
                            <input
                              type="date"                            
                              name="date"
                              className="rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5] p-2 focus:bg-pink-200 transition duration-200"
                              value={startDate}
                              onChange={e => setStartDate(e.target.value)}
                              required
                            />
                          </div>
                          <div className="flex w-full flex-col basis-[50%]">
                            <label className="text-[#EE4266] mb-1">End Date</label>
                            <input
                              type="date"                            
                              name="date"
                              className="rounded-[10px] bg-[#F9F9F9] border-2 p-2 border-[#167DE5] focus:bg-pink-200 transition duration-200"
                              value={endDate}
                              onChange={e => setEndDate(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        

                            

                        <div className='flex mt-4 flex-col'>
                            <button onClick={() => {
                              if (validateSection1()) {
                                nextSection();
                              } else {
                                alert(
                                  "Please enter an itinerary name,\n" +
                                  "pick both start & end dates,\n" +
                                  "and ensure end ≥ start."
                                );
                              }
                            }}
                            disabled={!validateSection1()}
                            className={`bg-[#EE4266] border-2 border-[#EE4266] p-2 justify-center text-white text-center mt-5 rounded-[10px] hover:bg-white hover:text-[#EE4266] transition duration-200 batman  ${!validateSection1() ? "opacity-50 cursor-not-allowed" : ""}`}>
                              Next
                            </button>
                            
                        </div>
                      </div>
                      )}
                      {section == 2 && (
                      <div id='section2'>
                          <p className='text-3xl font-bold mb-5'>Budget</p>
                          <div className='flex w-full justify-between gap-10'>
                              <div className='flex flex-col basis-[50%]'>
                                <label className='text-black'>Accomodation Budget</label>
                                <input name="number" className='w-full rounded-[10px] bg-[#F9F9F9] border-2  p-2 focus:bg-pink-200 transition duration-200' value={accomodationBudget} onChange={(e) => setAccomodationBudget(parseFloat(e.target.value) || 0)}/>
                              </div>
                              <div className='flex flex-col basis-[50%]'>
                                <label className='text-black'>Transportation Budget</label>
                                <input name="number" className='w-full rounded-[10px] bg-[#F9F9F9] border-2  p-2 focus:bg-pink-200 transition duration-200' value={transportationBudget} onChange={(e) => setTransportationBudget(parseFloat(e.target.value) || 0)}/>
                              </div>
                          </div>
                          <div className='flex w-full justify-between gap-10'>
                              <div className='flex flex-col basis-[50%]'>
                                <label className='text-black'>Culinary Budget</label>
                                <input name="number" className='w-full rounded-[10px] bg-[#F9F9F9] border-2  p-2 focus:bg-pink-200 transition duration-200' value={culinaryBudget} onChange={(e) => setCulinaryBudget(parseFloat(e.target.value) || 0)}/>
                              </div>
                              <div className='flex flex-col basis-[50%]'>
                                <label className='text-black'>Entertainment Budget</label>
                                <input name="number" className='w-full rounded-[10px] bg-[#F9F9F9] border-2  p-2 focus:bg-pink-200 transition duration-200' value={entertainmentBudget} onChange={(e) => setEntertainmentBudget(parseFloat(e.target.value) || 0)}/>
                              </div>
                          </div>
                          <div className='flex flex-col basis-[50%]'>
                                <label className='text-black'>Miscellannious Budget</label>
                                <input name="number" className='w-full rounded-[10px] bg-[#F9F9F9] border-2  p-2 focus:bg-pink-200 transition duration-200' value={miscBudget} onChange={(e) => setMiscBudget(parseFloat(e.target.value) || 0)}/>
                          </div>

                        <div className='flex mt-4 w-full justify-between'>
                            <button onClick={prevSection}
                            className={`bg-[#167DE5] px-10 p-2 justify-center text-white text-center mt-5 rounded-[10px] hover:bg-pink-400 transition duration-200 batman`}>
                              Back
                            </button>
                            <button onClick={() => {
                              if (validateSection2()) {
                                nextSection();
                              } else {
                                alert('Please Input all the budgets')
                              }
                            }}
                            disabled={!validateSection2()}
                            className={`bg-[#167DE5] px-10 p-2 justify-center text-white text-center mt-5 rounded-[10px] hover:bg-pink-400 transition duration-200 batman  ${!validateSection2() ? "opacity-50 cursor-not-allowed" : ""}`}>
                              Next
                            </button>
                            
                        </div>
                      </div>
                      )}
                      {section ==3 && (
                        <div>
                          <p className='text-3xl font-bold mb-5 text-[#EE4266]'>What do You Want to do?</p>
                          <textarea name="" id="" value={request} onChange={(e) => setRequest(e.target.value)} className='p-2 w-full min-h-[70px] max-h-[70px] mt-5 rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5]' placeholder='Type what do you want to do during the holidays, where do you want to have your holiday. Be as Specific as possible'></textarea>
                          <button type='submit'
                          onClick={makeItinerary}
                          className={`bg-[#167DE5] w-full px-10 p-2 justify-center text-white text-center mt-5 rounded-[10px] hover:bg-pink-400 transition duration-200 batman  ${!validateSection3() ? "opacity-50 cursor-not-allowed" : ""}`}>
                             "Plan Your Itinerary"
                            
                           </button>
                        </div>
                      )}
                    </form>
                </div>
              </div>

              {
            (sub === 'free' || sub === 'standard') && (
              <div className='bg-white justify-between flex absolute items-center z-5 bottom-[5%] w-[75%] left-[15%] rounded-2xl border-2 border-[#167DE5]  p-5'>
                <p className='text-xl'>{itineraryLeft - itineraryCount} free plan Left</p>
                <button onClick={buySub} className='bg-pink-500 px-20 py-2 text-white rounded-3xl hover:bg-pink-600 transition duration-300'>Buy Now</button>
              </div>
            )
          }
          
        </div>
        
      </div>
    )
}

export default CreateItinerary
