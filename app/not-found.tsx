import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <main className='text-center h-screen w-screen flex flex-col justify-center items-center'>
        <Image
          src={'/4043.gif'}
          alt='404 gif'
          width={180}
          height={180}
        />
        <h2 className='text-3xl'> It's not you, it&apos;s me!</h2>
        <p>We could not find the page you are looking for</p>
        <p>Go back to <Link href={'/'} className='font-bold text-rose-400 underline hover:underline-offset-0'>where we used to be.</Link></p>
    </main>
  )
}

export default NotFound