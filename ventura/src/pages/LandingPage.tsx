import React from 'react'
import  {  useRef, useEffect } from 'react';
import { useParallax } from 'react-scroll-parallax';
import { useIntersection } from 'react-use';
import gsap from "gsap"
import Navbar from '../components/Navbar';
import FrontCity from "../assets/FrontCity.svg"
import Airport from "../assets/Airport.svg"
import BackCity from "../assets/BackCity.svg"
import LogoVentura from "../assets/LogoVentura.svg"
import AboutItems from "../assets/AboutItems.svg"
import LampPostBG from "../assets/LampPostBG.svg"
import VehiclesBG from "../assets/VehiclesBG.svg"
import CityFront from "../assets/CityFront.svg"
import CityBack from "../assets/CityBack.svg"
import Card1 from "../assets/Card1.svg"
import Card2 from "../assets/Card2.svg"
import Card3 from "../assets/Card3.svg"
import Credit from "../assets/Credit.svg"
import Boat from "../assets/Boat.svg"
import { ScrollSmoother } from 'gsap/all';


function LandingPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const {ref: leftFrontRef} = useParallax<HTMLImageElement>({
    speed: 5,
    easing: 'easeOut'
  
  });

  const {ref: rightFrontRef} = useParallax<HTMLImageElement>({
    speed: 5,
    easing: 'easeOut'
  
  });
  
  const {ref: leftBackRef} = useParallax<HTMLImageElement>({
    speed: 10,
    easing: 'easeOut'
  
  });

  const {ref: rightBackRef} = useParallax<HTMLImageElement>({
    speed: 10,
    easing: 'easeOut'
  
  });

  const intersection= useIntersection(sectionRef as React.RefObject<HTMLElement>, {
    root: null,
    rootMargin: "0px",
    threshold: 0.25
  });

  const fadeIn = (selector: string | HTMLElement) =>{
    gsap.to(selector,1,{
      opacity: 1,
      y: 0,
      ease: "power4.out",
      stagger: {
        amount: 0.3
      }
    })
  }

  const fadeOut = (selector: string | HTMLElement) =>{
    gsap.to(selector,1,{
      opacity: 0,
      y: 20,
      ease: "power4.out",
      stagger: {
        amount: 0.3
      }
    })
  }

  const slideIn = (selector: string | HTMLElement) =>{
    gsap.to(selector,1,{
      opacity: 1,
      x: 0 ,
      threshold: 0.25,
      ease: "power4.out",
      stagger: {
        amount: 0.3
      }
    })
  }

  const slideOut = (selector: string | HTMLElement) =>{
    gsap.to(selector,1,{
      opacity: 1,
      x: 1000 ,
      threshold: 0.25,
      ease: "power4.out",
      stagger: {
        amount: 0.3
      }
    })
  }


  intersection && intersection.intersectionRatio < 0.25 ? fadeOut('.fadeInG'):fadeIn('.fadeInG');

  const sectionRef2 = useRef<HTMLDivElement>(null);

  const intersection2= useIntersection(sectionRef2 as React.RefObject<HTMLElement>, {
    root: null,
    rootMargin: "0px",
    threshold: 0.25
  });

  intersection2 && intersection2.intersectionRatio < 0.25 ? fadeOut('.fadeInG2'):fadeIn('.fadeInG2');

  intersection2 && intersection2.intersectionRatio < 0.25 ? slideOut('.slideIn'):slideIn('.slideIn');

  const sectionRef3 = useRef<HTMLDivElement>(null);

  const intersection3= useIntersection(sectionRef3 as React.RefObject<HTMLElement>, {
    root: null,
    rootMargin: "0px",
    threshold: 0.25
  });

  

  useEffect(() => {
    if (intersection3 && sectionRef3.current) {
      intersection3.intersectionRatio < 0.25
        ? fadeOut('.slideInG3')
        : fadeIn('.slideInG3');
    }
  }, [intersection3]);

  const sectionRef4 = useRef<HTMLDivElement>(null);
  const intersection4= useIntersection(sectionRef4 as React.RefObject<HTMLElement>, {
    root: null,
    rootMargin: "0px",
    threshold: 0.25
  });

  useEffect(() => {
    if (intersection4 && sectionRef4.current) {
      intersection4.intersectionRatio < 0.25
        ? fadeOut('.flyIn')
        : fadeIn('.flyIn');
    }
  }, [intersection4]);

  return (
    <div id='smooth-wrapper'>
      <Navbar/>
      <div className='w-screen bg-[#F9F9F9] relative' id='smooth-content'>
           <div ref={sectionRef} id="home" className='header flex relative justify-center items-center z-2 h-[80vh] md:h-[95vh]'>
              <img src={BackCity} ref={leftBackRef} alt="leftBack" className='absolute bottom-[-12%] left-[-20%] w-[50%] md:w-[20%] md:left-0' draggable="false" />
              <img src={FrontCity} ref={leftFrontRef} alt="leftFront" className='absolute bottom-[-10%] md:bottom-[-8%] left-[-20%] w-[50%] md:w-[25%] md:left-0 scale-x-[-1]' draggable="false" />
              <img src={BackCity} ref={rightBackRef}  alt="rightBack" className='absolute bottom-[-12%] right-[-20%] w-[50%] md:w-[20%] md:right-0 scale-x-[-1]' draggable="false" />
              <img src={FrontCity} ref={rightFrontRef} alt="rightFront" className='absolute bottom-[-10%] md:bottom-[-8%] right-[-20%] w-[50%] md:w-[25%] md:right-0' draggable="false" />
              <img src={Airport} alt="airport" className='relative z-1 bottom-[-47%] md:bottom-[-38%] md:w-[35%]' draggable="false" />
              <div className='container z-0 top-[20%] absolute flex flex-col justify-center items-center w-screen'>
                <img src={LogoVentura} alt="logo" className='relative fadeInG w-[30vw] md:w-[10vw]' draggable="false" />
                <p className='text-5xl  md:text-7xl fadeInG font-bold text-[#EE4266]'>Begin Your</p>
                <p className='text-6xl  md:text-8xl fadeInG  font-extrabold text-[#EE4266] '>JOURNEY</p>
              </div>
              
           </div>

           <div ref={sectionRef2} id="about" className='about flex relative justify-center bg-[#167DE5] z-1 pt-20 md:pt-10 pb-50 md:pb-50'>
              <div className='relative flex flex-col md:flex-row justify-center items-center  z-1 '>
              <img src={AboutItems} alt="aboutItems" className='w-[50%] fadeInG2 md:hidden' draggable="false" />
                <div className='aboutDesc flex flex-col justify-center items-center md:items-start py-10 md:py-30 px-20'>
                    <p className='text-white text-center fadeInG2 md:text-start text-4xl md:text-8xl font-bold'>What is Ventura?</p>
                    <p className='text-white text-center fadeInG2 md:text-start mt-5 text-2xl md:text-4xl w-[75vw] md:w-[50vw]'>Ventura is a web based website made to help those who want to plan their holidays with ease by reducing the amount of time it takes in planning</p>
                </div>
                <img src={AboutItems} alt="aboutItems" className='hidden fadeInG2 md:block draggable="false" '/>
              </div>
              <div className='flex absolute z-0 bottom-[-1%] w-screen'>
              
                <div className='opacity-[50%]'>
                  <img src={LampPostBG} alt="LampPost" className='absolute bottom-[-2%] draggable="false" '/>
                  <img src={VehiclesBG} alt="Vehicles" className='absolute slideIn bottom-0 min-w-[250vw] md:min-w-[100vw] md:w-full draggable="false" '/>
                </div>
                <div className='h-[30vh] w-full bg-linear-to-b from-[#F9F9F9]/0 to-[#F9F9F9] absolute bottom-0'></div>
                
              </div>
           </div>

           <div ref={sectionRef4} id="features" className='features relative h-full'>
              <div className='bg absolute z-0 flex w-screen bottom-0 opacity-[40%]'>
                  <img src={CityBack} alt="cityBack" className='absolute bottom-0 left-0' draggable="false" />
                  <img src={CityFront} alt="cityFront" className='absolute bottom-0 right-0' draggable="false" />
              </div>
              <div className='featureContent relative z-1 w-full h-full pt-20 pb-20 items-center flex flex-col'>
                  <p className='text-4xl md:text-8xl flyIn font-bold'>Features</p>
                  <div className='flex flex-col gap-5 mt-5 px-2'>
                    <img src={Card1} alt="card1" className='flyIn md:mr-[25vw]' draggable="false" />
                    <img src={Card2} alt="card2" className='flyIn md:ml-[25vw]' draggable="false" />
                    <img src={Card3} alt="card3" className='flyIn md:mr-[25vw]' draggable="false" />
                  </div>
                  
              </div>
           </div>

           <div ref={sectionRef3} id="prices" className='pricing bg-[#EE426A] px-10 py-20 flex flex-col justify-center items-center'>
              <p className='text-7xl text-[#F9F9F9] font-bold'>Pricing</p>
              <ul className='flex flex-col mt-10 md:flex-row gap-10'>
                <li>
                  <div className='slideInG3 rounded-[50px] bg-[#F9F9F9] py-10 px- flex flex-col items-center'>
                    <img src={Credit} alt="" className='w-[85%] md:w-[75%]'/>
                    <p className='text-2xl md:text-3xl font-bold pt-5'>Standard</p>
                    <p className='text-3xl md:text-5xl font-bold'>Rp 250.000</p>
                    <ul className='list-disc pl-5 md:pl-20 pr-0 md:pr-10 pt-10 pb-10'>
                      <li><p className='text-xl md:text-2xl font-medium list-disc'>5 Times Use</p></li>
                      <li className='text-gray-400'><p className='text-xl md:text-2xl  text-gray-400 line-through font-medium list-disc'>AI Generate Holiday</p></li>
                      <li className='text-gray-400'><p className='text-xl md:text-2xl  text-gray-400 line-through font-medium list-disc'>More than 3 People Per Group</p></li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className='slideInG3 rounded-[50px] bg-[#F9F9F9] py-10 px- flex flex-col items-center'>
                    <img src={Credit} alt="" className='w-[85%] md:w-[75%]'/>
                    <p className='text-2xl md:text-3xl font-bold pt-5'>Premium</p>
                    <p className='text-3xl md:text-5xl font-bold'>Rp 500.000</p>
                    <ul className='list-disc pl-5 md:pl-20 pr-0 md:pr-10 pt-10 pb-10'>
                      <li><p className='text-xl md:text-2xl font-medium list-disc'>10 Times Use</p></li>
                      <li className=''><p className='text-xl md:text-2xl  font-medium list-disc'>AI Generate Holiday</p></li>
                      <li className=''><p className='text-xl md:text-2xl   font-medium list-disc'>More than 3 People Per Group</p></li>
                    </ul>
                  </div>
                </li>
              </ul>
              <div className='joinNow  pt-50 w-screen  draggable="false" flex flex-col justify-center items-center relative'>
                <p className='text-white text-4xl md:text-6xl z-1 text-center font-bold'>So What Are You Waiting For?</p>
                <a  href="/Ventura/login" className='bg-[#167DE5] px-10 py-5 rounded-[20px] mt-10 text-3xl font-bold text-white hover:bg-[#F6C93B] transition hover:text-black'><p>Plan Now</p></a>
              </div>
           </div>
           <img src={Boat} alt="" className='absolute z-0 left-0 bottom-0 w-[30%]'/>
           <img src={Boat} alt="" className='absolute z-0 right-0 bottom-0 w-[30%] scale-x-[-1]'/>
           

      </div>
    </div>
  )
}

export default LandingPage
