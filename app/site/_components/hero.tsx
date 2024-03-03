import { ImageDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='p-5 max-w-7xl mx-auto h-screen flex flex-col md:flex-row-reverse items-center justify-center md:justify-between gap-16 md:gap-2'>
        {/* Burning the midnight oil, pull an all-nighter */}
        <div className='overflow-hidden w-auto  mt-[-100px] flex justify-center items-center border shadow-lg rounded-md md:mt-0'>
            <img src="/Studynest.png" alt="pic" className='w-full h-full object-contain delay-0 duration-300' />
        </div>
        <div className='text-center md:text-start'>
            <h1 className='  text-3xl md:text-5xl font-bold text-center md:text-start'>
                Welcome to <span className='font-naturebeauty'>Study</span><span className='text-rose-700 font-naturebeauty py-4'>Nest</span>, where learning takes flight!
            </h1>
            <p className='text-sm italic text-gray-500 mt-4 px-9 md:p-0'>
            Dive into a world of knowledge, collaboration, and success. Your academic journey begins here!
            </p>
        </div>
    </div>
  )
}

export default Hero