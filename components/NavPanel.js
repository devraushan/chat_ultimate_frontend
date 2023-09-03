import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { useSelector,useDispatch } from 'react-redux'
import { clearToken } from '../Store/slices/userSlice'
import { useRouter } from 'next/router'

const IP = process.env.NEXT_PUBLIC_IP
const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT


function NavPanel() {
  const [userName, setuserName] = useState("")
  const userState = useSelector(state=>state)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    if(userState.data){
      fetch(`http://${IP}:${backendPort}/auth/getprofile`,{headers:{"auth-token": userState.data.authToken}}).then(res=>res.json()).then(res=>setuserName(res.userName))
    }
  }, [userState])
  
    //Logout function
    const handleLogout = (e)=>{
      dispatch(clearToken())
      router.push("/")
    }

  return (<>
    <div className='grid grid-cols-2 px-2 self-center justify-items-center font-bold text-left text-red-300 space-x-4'>
    {!userState.data&&<>
      <div><Link href={`/Pages/signup`}>Sign Up</Link></div>
      <div><Link href={`/Pages/login`}>Login</Link></div>
      </>}
    {userState.data&&<>
      <div><Link href={`/Pages/profile`}>Welcome <br /> @{userName}</Link></div>
      <button onClick={handleLogout}>LogOut</button>
    </>}
    </div>
    </>
  )
}

export default NavPanel