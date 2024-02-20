import React from 'react'
import Logo from './logo'
import SidebarRoutes from './sidebar-routes'

const SideBar = () => {
  return (
    <div className=" md:fixed h-full border-r flex flex-col overflow-y-auto  shadow-sm">
        <div className="p-6 md:w-[224px]">
            <Logo />
        </div>
        <div className='flex flex-col w-full '>
            <SidebarRoutes />
        </div>
    </div>
  )
}

export default SideBar