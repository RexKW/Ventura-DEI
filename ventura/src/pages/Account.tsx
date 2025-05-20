import React from 'react'
import { useState, useEffect } from 'react'
import SideNavbar from '../components/SideNavbar';
import { getAllOwnedItineraries } from '../apis/ItinerariesCRUD';
import { Link } from 'react-router-dom'
import CityBG from "../assets/CityBG.svg"
import gsap from 'gsap';
import Credit from '../assets/Credit.svg'
import { useGSAP } from '@gsap/react';
import { getUser } from '../apis/UserCRUD';

function Account() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [itineraryCount, setItineraryCount] = useState(0);
  const token = localStorage.getItem('token');
  const [current, setCurrent] = useState('')
  const [nextPwd, setNextPwd] = useState('')
  const [viewSub, setViewSub] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

  }

  const toggleSub = () => {
    if(viewSub){
      alert("Subscription Updated")
    }
    setViewSub(!viewSub)
  }


  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const response = await getUser(token);
        await setIsPremium(response.data.premium);
        await setUsername(response.data.username);
        await setEmail(response.data.email);
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
    gsap.from(".slideIn", { x: 1920, opacity: 1, duration: 0.75 });
  });

  return (
    <div className='flex  bg-[#167DE5]'>
      <SideNavbar />
      <div className='slideIn relative w-screen h-screen bg-white rounded-tl-[50px]'>
        <div className='bg absolute z-0 flex w-screen bottom-0'>
          <img src={CityBG} alt="cityBack" className='absolute bottom-0 left-0  opacity-[25%]' draggable="false" />
        </div>
        <div className=' relative z-2 p-10  w-screen h-screen  '>
          {
            viewSub ? (
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
                            onClick={toggleSub}
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
            ) : (
              <div className='w-full h-full flex'>
                <div className='px-10 bg-white border-2 border-[#167DE5] justify-start items-center flex flex-col rounded-xl'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 45 45"
                    preserveAspectRatio="xMidYMid meet"
                    className="block w-[55%] -mt-[5%] h-[55%]"
                    fill="none"
                  >
                    <g transform="translate(-11.3828 -11)">
                      <path
                        d="M33.8719 56C46.204 56 56.3828 45.8162 56.3828 33.5C56.3828 21.1838 46.1822 11 33.8502 11C21.5399 11 11.3828 21.1838 11.3828 33.5C11.3828 45.8162 21.5616 56 33.8719 56ZM33.8719 41.029C27.7385 41.029 22.9754 43.2268 20.6699 45.751C17.712 42.5522 15.9067 38.2437 15.9067 33.5C15.9067 23.5121 23.8889 15.5044 33.8502 15.5044C43.8333 15.5044 51.8589 23.5121 51.8806 33.5C51.8806 38.2437 50.0754 42.5522 47.0957 45.7727C44.7903 43.2268 40.0271 41.029 33.8719 41.029ZM33.8719 37.4603C38.0914 37.5039 41.3756 33.8917 41.3756 29.235C41.3756 24.8395 38.0696 21.162 33.8719 21.162C29.696 21.162 26.3683 24.8395 26.3901 29.235C26.4118 33.8917 29.6743 37.4386 33.8719 37.4603Z"
                        fill="#167DE5"
                      />
                    </g>
                  </svg>
                  <p className='text-3xl text-[#EE4266] font-bold mt-[-15%]'>{username}</p>
                  {
                    isPremium ? (
                      <div className='px-10 mt-2 py-2 bg-[#167DE5] rounded-[30px] text-white'>
                        <p>Premium</p>
                      </div>
                    ) : (
                      <div className='px-10 mt-2 py-2 bg-[#167DE5] rounded-[30px] text-white'>
                        <p>Standard</p>
                      </div>
                    )
                  }
                  <div className='flex flex-col w-full mt-10'>
                    <p>Bio</p>
                    <div className='border-2 border-[#167DE5] p-2 w-full flex h-[100px] rounded-lg'>
                      <p>Hello, I am student who like to travel abroad</p>
                    </div>
                  </div>
                  <div className='flex flex-col mt-10'>
                    <p className='text-gray-400 font-medium'>Joined Since</p>
                    <p className='font-bold -mt-[5%]'>DD/MM/YYY</p>
                  </div>
                </div>


                <div className='flex flex-col justify-between  items-center  mx-10'>
                  <div className="max-w-md w-full bg-white basis-[60%] border-2 border-blue-400 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold">Personal Information</h2>

                    </div>

                    <div className="grid grid-cols-2 flex gap-y-4 gap-x-8">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase">
                          First Name
                        </label>
                        <p className="mt-1 text-sm font-medium text-gray-800">-</p>
                      </div>

                      <div className="">
                        <label className="block text-xs font-medium text-gray-500 uppercase">
                          Last Name
                        </label>
                        <p className="mt-1 text-sm font-medium text-gray-800">-</p>
                      </div>

                      <div className="mt-5">
                        <label className="block text-xs font-medium text-gray-500 uppercase">
                          Email Address
                        </label>
                        <p className="mt-1 text-sm font-medium text-gray-800">{email}</p>
                      </div>

                      <div className="mt-5">
                        <label className="block text-xs font-medium text-gray-500 uppercase">
                          Phone
                        </label>
                        <p className="mt-1 text-sm font-medium text-gray-800">+62 ....</p>
                      </div>
                    </div>


                    <div className="mt-10">
                      <label className="block text-xs font-medium text-gray-500 uppercase">
                        Membership Level
                      </label>
                      <p className="mt-1 text-sm font-medium text-gray-800">
                        'Showed'
                      </p>
                    </div>
                  </div>
                  <div className="max-w-md basis-[35%] flex flex-col w-full bg-white border-2 border-blue-400 rounded-2xl p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Itinerary Information</h2>

                    </div>

                    {/* Data grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6">
                      {/* Saved itineraries */}
                      <div>
                        <label className="block text-xs text-gray-500 uppercase">
                          Saved itineraries
                        </label>
                        <p className="mt-1 text-sm text-gray-800">XX</p>
                      </div>

                      {/* Collaborators */}
                      <div>
                        <label className="block text-xs text-gray-500 uppercase">
                          Collaborators
                        </label>
                        <p className="mt-1 text-sm text-gray-800">XX</p>
                      </div>

                      {/* Trips taken / planned */}
                      <div>
                        <label className="block text-xs text-gray-500 uppercase">
                          Trips taken / planned
                        </label>
                        <p className="mt-1 text-sm text-gray-800">XX</p>
                      </div>
                    </div>
                  </div>
                </div>


                <div className='flex flex-col justify-between items-center'>
                  <div className="max-w-md basis-[45%] w-full bg-white border-2 border-blue-400 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Settings &amp; Preferences</h2>

                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6">
                      <div>
                        <label className="block text-xs text-gray-500 uppercase">
                          Preferred language
                        </label>
                        <p className="mt-1 text-sm text-gray-800">English</p>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-500 uppercase">
                          Notification settings
                        </label>
                        <p className="mt-1 text-sm text-gray-800">
                        </p>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-xs text-gray-500 uppercase">
                          My Plan
                        </label>
                        <p className="mt-1 text-sm font-semibold text-pink-500">
                          <button onClick={toggleSub}><p>Subsciption</p></button>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="max-w-md w-full bg-white border-2 border-blue-400 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Account &amp; Password</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs text-gray-500 uppercase">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={current}
                          onChange={e => setCurrent(e.target.value)}
                          placeholder="type here"
                          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-500 uppercase">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={nextPwd}
                          onChange={e => setNextPwd(e.target.value)}
                          placeholder="type here"
                          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full mt-2 bg-pink-500 text-white rounded-full py-2 text-center font-medium hover:bg-pink-600 transition"
                      >
                        Update Password
                      </button>
                    </form>

                    <div className="text-center mt-2 flex justify-between">
                      <button className="text-xs text-gray-500 hover:underline">
                        forgot password?
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )
          }





        </div>

      </div>

    </div>
  )
}

export default Account
