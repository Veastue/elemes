import React from 'react'
import { FaGithub } from "react-icons/fa";

const Footer = () => {

    const currentYear = new Date().getFullYear();
    return (
        <div className='fixed bottom-0 w-screen flex items-center justify-center h-20'>
            <div className='flex items-center gap-4'>
                Allrights reserved &copy;{currentYear} 
                <a href='https://github.com/Veastue/studynest' target='_blank'>
                    <FaGithub size={24}/>
                </a>
            </div>
        </div>
    )
}

export default Footer