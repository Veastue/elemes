'use client'

import React, { useEffect, useState } from 'react'
import SiteLogo from './site-logo'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SiteNavbarRoutes from './site-navbar-routes'
import { Menu } from 'lucide-react'
import { DarkModeToggle } from '@/components/dark-mode-toggle'

const SiteNavbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        function handleResize() {
          if (window.innerWidth < 768) {
            setIsOpen(false);
          }
        }
    
        window.addEventListener('resize', handleResize);
    
        // Call handleResize once on initial render
        handleResize();
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
  return (
    <div className=' mx-auto max-w-7xl h-20 backdrop-blur flex items-center justify-between px-3'>
        <SiteLogo />
        <div className='hidden md:flex items-center'>
            <SiteNavbarRoutes />
            <Link href='/'>
                <Button >
                    Login
                </Button>
            </Link>
            <div className='mx-2'>
                <DarkModeToggle />
            </div>
        </div>
        <div className='md:hidden transition ml-auto'>
            <DarkModeToggle/>
        </div>
        <div 
            onClick={() => setIsOpen((prev) => !prev)}
        className='md:hidden transition ml-2'>
            <Menu size={32}/>
        </div>
        
        {isOpen && (
            <div className='absolute right-2 top-16 w-28 flex flex-col items-center border pb-4 rounded-xl gap-3 bg-white'>
                <div className='w-full'>
                    <ul className='flex flex-col items-center justify-center '>
                        <li className='m-1 p-2 rounded-lg hover:underline dark:text-black'>Home</li>
                        <li className='m-1 p-2 rounded-lg hover:underline dark:text-black'>About</li>
                        <li className='m-1 p-2 rounded-lg hover:underline dark:text-black'>Pricing</li>
                    </ul>
                </div>
                
                <Link href='/'>
                    <Button>
                        Login
                    </Button>
                </Link>
            </div>
        )}
        
    </div>
  )
}

export default SiteNavbar