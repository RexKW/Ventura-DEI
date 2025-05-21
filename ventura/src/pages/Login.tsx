
import React, { useEffect, useState } from 'react'
import { login } from '../apis/UserCRUD'
import { useNavigate } from 'react-router-dom'
import FrontCity from "../assets/FrontLogin.svg"
import BackCity from "../assets/BackLogin.svg"
import AirportCut from "../assets/AirportCut.svg"
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //   const fetchProfile = async () => {
    //     const token = localStorage.getItem('token');
    //     if (!token) return;
    //     try {
    //       navigate("/Ventura/itineraries");
          
    //     } catch (error) {
    //       console.error('Failed to load user data', error);
    //     }
    //   }
    //   fetchProfile();
      
    // }, []);
        
    const fetchAUser = async () =>{
        try{
            const response = await login(username, password)
            console.log('API Response:', response);
              if(!response.data.token){
                alert("User not found")
              }else{
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('subscription', "free");
                navigate("/Ventura/itineraries");
                
              }
          
        }catch(error){
            console.log(error)
        }
        
    
    }
    
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault(); 
      fetchAUser();
    };

    useGSAP(() => {
      gsap.to(".box-1", { y:-20, opacity:1, scale:1});
    });

    useGSAP(() => {
      gsap.from(".city", { y:400, opacity:1, duration:1.5});
    });

    useGSAP(() => {
      gsap.from(".citySlow", { y:270, opacity:1, duration:1.7});
    });

  return (
    <div className='flex flex-col w-full h-[100vh] bg-[#F9F9F9] overflow-y-hidden justify-center items-center content-center relative'>
        <img src={BackCity} alt="leftBack" className='absolute city bottom-0  opacity-[97.5%] left-[-20%] w-screen md:left-0' draggable="false" />
        <img src={FrontCity}  alt="leftFront" className='absolute citySlow bottom-0  opacity-[97.5%] left-[-20%] w-screen md:left-0 scale-x-[-1]' draggable="false" />
        <img src={AirportCut} alt="" className='absolute citySlow bottom-[-45%] w-[25%]'/>
      <div className='bg-[#F9F9F9] shadow-md scale-[97.5%] box-1 w-[90vw] z-3 p-5 px-7 md:w-[25vw] rounded-[20px]'>
        <p className='w-full text-center text-2xl mb-5 batman text-black font-bold'>Login</p>
        <form onSubmit={handleLogin}>
            <div className='flex flex-col'>
            <label className='text-black'>Username</label>
            <input name="email" className=' rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5] p-2 focus:bg-pink-200 transition duration-200' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div className='flex flex-col mt-5'>
            <label className='text-black'>Password</label>
            <input name="password" type='password' className=' rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5] p-2 focus:bg-pink-200 transition duration-200'value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className='flex mt-4 flex-col'>
            <button type="submit" className='bg-[#167DE5] p-2 justify-center text-white text-center mt-5 rounded-[10px] bg-pink-400 hover:bg-pink-600 transition duration-200 batman'>Login</button>
            
            <p className='text-xs text-center mt-5'>Don't have an account? <a href="/Ventura/register" className='font-bold text-[#167DE5] hover:text-pink-400 transition duration-200'>Register Now</a></p>
            </div>
            </form>
        
      </div>
      
    </div>
  )
}

export default Login
