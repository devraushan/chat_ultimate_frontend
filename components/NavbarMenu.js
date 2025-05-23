import React, { useEffect, useRef, useState } from 'react'
import Hamburger from './Hamburger'
import Link from 'next/link'

function NavbarMenu() {
  const menuArea = useRef()
  const [menuActive, setmenuActive] = useState(false)
  const toggleMenu = ()=>{
    setmenuActive(!menuActive)
  }
  useEffect(()=>{
    const handleOutsideClick = (event)=>{
      if(!menuArea.current?.contains(event.target)){
        setmenuActive(false)
        console.log("abc")
      }
    }
    window.addEventListener("mousedown",handleOutsideClick)
    return ()=>{
      window.removeEventListener("mousedown",handleOutsideClick)
    }
  },[menuArea])
  return (
    <div ref={menuArea} className='relative z-10 mx-4 cursor-pointer'>
      <div onClick={toggleMenu}><Hamburger height={48} width={48}/></div>
      
      <div className={` ${menuActive?"":"hidden"} z-30 absolute bg-gray-300  -left-20 rounded p-4`}>
        <Link href={"/Pages/chatlist"}>
          <div>
            Let's Chat
          </div>
        </Link>
        <Link href={"/"}>
          <div>
            Home
          </div>
        </Link>
        <Link href="/Pages/about">
          <div>
            About
          </div>
        </Link>
        <Link href={"/Pages/contact"}>
        <div>
          Contact
        </div>
        </Link>
      </div>
    </div>
  )
}

export default NavbarMenu
