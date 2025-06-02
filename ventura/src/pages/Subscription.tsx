
import  { useState } from 'react'
import SideNavbar from '../components/SideNavbar';
import CityBG from "../assets/CityBG.svg"
import freeCard from '../assets/freeCard.svg';
import blueCard from '../assets/blueCard.svg';
import yellowCard from '../assets/yellowCard.svg'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


function Subscription() {

  const [payment, setPayment] = useState(false);
  const [currPay, setCurrPay] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const subs = localStorage.getItem('subscription')

  const handleFree = () =>{
    localStorage.setItem('subscription', 'free')
    setCurrPay("free")
  }

  const togglePayment = () => {
    setPayment(!payment)
    setCurrPay("standard")

  }

  const togglePaymentPrem = () => {
    setPayment(!payment)
    setCurrPay("premium")
  }

  const handlePay = () =>{
    localStorage.setItem('subscription', currPay)
    setPayment(!payment);
  }

  useGSAP(() => {
    gsap.from(".slideIn", { x: 1920, opacity: 1, duration: 0.75 });
  });

  return (
    <div className='flex  bg-[#167DE5]'>
      <div className='relative z-2'>
        <SideNavbar/>
      </div>
      
      <div className='slideIn relative w-screen h-screen bg-white rounded-tl-[50px]'>
        <div className='bg absolute z-0 flex w-screen bottom-0'>
          <img src={CityBG} alt="cityBack" className='absolute bottom-0 left-0  opacity-[25%]' draggable="false" />
        </div>
        <div className=' relative z-2 p-10  w-screen h-screen  '>
          <div className='w-[95%] h-full flex justify-center'>
            <div className='px-30  w-full   justify-center items-center flex flex-col rounded-xl'>

              <div className="flex flex-col items-center justify-between w-full md:flex-row">
                {/* ── Left info column ── */}

                <div className=" border-[#167DE5] bg-white border-2 p-10 rounded-xl mr-5 mb-6 md:mb-0">
                  <div className="flex items-center mb-6">
                    <h2 className="text-4xl text-pink-500 font-bold">Subscription</h2>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xl font-medium uppercase">Current Plan</p>
                      <p className="mt-1 font-medium">
                        {subs}
                      </p>
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
                <div className="w-[80%] grid grid-cols-1 ml-10 sm:grid-cols-3 gap-3">
                  {[
                    {name: 'Free', color: 'bg-gray-400', img: freeCard, money: 'Free', function: handleFree , not: 'line-through text-gray-400', uses: '2', people: '1'},
                    { name: 'Standard', color: 'bg-blue-500', img: blueCard, money: 'Rp 100.000', function: togglePayment, uses: '5', people: '1 - 3' },
                    { name: 'Premium', color: 'bg-yellow-500', img: yellowCard, money: 'Rp 300.000', function: togglePaymentPrem, uses: '10' , people: 'More than 3' },
                  ].map(plan => (
                    <div
                      key={plan.name}
                      className="border-[#167DE5] bg-white border-2 rounded-2xl p-6 px-10 flex flex-col items-center"
                    >
                      <img src={plan.img} alt="" />

                      <h3 className="mt-4 text-xl font-bold">{plan.name}</h3>
                      <p className="mt-1 text-3xl font-bold">{plan.money}</p>
                      <ul className='list-disc'>
                        <li><p className='text-xl font-medium list-disc'>{plan.uses} Times Use</p></li>
                        <li ><p className={`text-xl  font-medium list-disc`}>{plan.people} People Per Group</p></li>
                      </ul>
                      <button
                        onClick={plan.function}
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

          {payment && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-100"
              aria-modal="true"
              role="dialog"
            >
              
              <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 mx-4">
                <button
                  className="mt-2 px-4 py-2 text-gray-700 w-full justify-end flex hover:text-gray-900 transition"
                  onClick={togglePayment}
                >
                  X
                </button>
                <h2 className="text-xl font-semibold mb-4">Payment</h2>

                {/* PAYMENT FORM */}
                <form onSubmit={handlePay} className="space-y-4 mb-6">
                  {/* Name on card */}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="cardName">
                      Name on card
                    </label>
                    <input
                      id="cardName"
                      type="text"
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Card number */}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">
                      Card number
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="expiry">
                        Expiry date <span className="text-xs text-gray-500">(MM/YY)</span>
                      </label>
                      <input
                        id="expiry"
                        type="text"
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="08/24"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="cvv">
                        Security code (CVV)
                      </label>
                      <input
                        id="cvv"
                        type="text"
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  {/* Pay button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition"
                  >
                    Pay
                  </button>
                </form>

                
              </div>
            </div>

          )
          }
        </div>
      </div>
    </div>
  )
}

export default Subscription
