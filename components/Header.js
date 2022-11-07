import React from 'react'
import Image from 'next/image'
import icon from "../icons/chat-bubble.svg"
import NavPanel from './NavPanel'


function Header() {
 
  return (
    <div className='grid grid-cols-[auto,1fr,auto] py-4 bg-lime-300 align-middle justify-middle'>
        <Image src={icon} alt="Chat Icon" className='ml-4 mt-2 h-10 w-10' />
        <h2 className="text-4xl font-bold self-center justify-self-center">Chat Ultimate</h2>
        <NavPanel/>
    </div>
  )
}

export default Header