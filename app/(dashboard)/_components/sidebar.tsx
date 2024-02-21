import React from 'react'
import Logo from './logo'
import SidebarRoutes from './sidebar-routes'

const SideBar = () => {
  return (
    <div className=" md:fixed md:w-[224px] h-full border-r flex flex-col overflow-y-auto  shadow-sm">
        <div className="p-6 mx-auto w-full">
            {/* <Logo /> */}
            <div className='py-4'>
              <h1 className='text-4xl text-center font-naturebeauty dark:text-rose-500'>StudyNest</h1>
            </div>
        </div>
        <div className='flex flex-col w-full '>
            <SidebarRoutes />
        </div>
    </div>
  )
}

export default SideBar