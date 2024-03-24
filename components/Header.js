import React from 'react'
import Image from 'next/image'
import icon from "../icons/chat-bubble.svg"
import NavPanel from './NavPanel'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Navbar from './NavbarMenu'

function Header() {
  const router = useRouter()
  const loginStatus = useSelector(state=>state.authToken)
  const landToChatBox = ()=>{
    if(loginStatus.data){
      router.push("/Pages/chatlist")
    }
  }
 
  return (
    <div className='flex py-10 align-middle justify-between'>
        <Image src={icon} alt="Chat Icon" className='ml-4 mt-2 h-10 w-10' onClick={landToChatBox} />
        <h2 className="text-4xl font-bold self-center justify-self-center max-sm:hidden">Chat Ultimate</h2>
        <div className='flex'>
          <NavPanel/> 
          <Navbar/>
        </div>
    </div>
  )
}

export default Header