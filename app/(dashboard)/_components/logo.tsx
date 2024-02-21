import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <Image 
        height={130}
        width={130}
        alt='logo'
        src='/stlogo.png'
        priority
        className='object-cover object-center w-full h-full mix-blend-darken'
    />
  )
}

export default Logo