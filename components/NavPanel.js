import React,{useState} from 'react'
import Link from 'next/link'


function NavPanel() {
    const [isLoggedin, setisLoggedin] = useState(true)
    const userName = "babur"


  return (<>
    <div className='grid grid-cols-2 px-2 self-center justify-items-center font-bold text-left text-red-300 space-x-4'>
    {!isLoggedin&&<>
      <div><Link href={`/Pages/signup`}>Sign Up</Link></div>
      <div><Link href={`/Pages/login`}>Login</Link></div>
      </>}
    {isLoggedin&&<>
      <div><Link href={`/Pages/profile`}>Welcome <br /> @{userName}</Link></div>
      <button>LogOut</button>
    </>}
    </div>
    </>
  )
}

export default NavPanel