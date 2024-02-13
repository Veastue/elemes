import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <main className='text-center h-screen w-screen flex flex-col justify-center items-center'>
        <h1 className='text-7xl p-5'>404</h1>
        <h2 className='text-3xl'> It's not you, it's me!</h2>
        <p>We could not found the page you are looking for</p>
        <p>Go back to <Link href={'/'} className='font-bold'>where we used to be.</Link></p>
    </main>
  )
}

export default NotFound