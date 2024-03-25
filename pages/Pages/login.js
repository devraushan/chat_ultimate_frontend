import React,{useState} from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { fetchUser } from './../../Store/slices/userSlice'



function Login() {



  const dispatch = useDispatch()
  const router = useRouter()
  const [userName, setuserName] = useState("")
  const [password, setpassword] = useState("")
  const handlePass = (event)=>{
    setpassword(event.target.value)
  }
  const handleUserName = (event)=>{
    setuserName(event.target.value)
  }
  const getUser = async (e)=>{
    
    try {
      dispatch(fetchUser({userName,password}))
      router.push("/Pages/profile")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='grid container md:w-2/5 rounded mx-auto bg-slate-600 p-5 mt-24'>
        <div className='justify-self-center text-2xl mb-10'><p>Login Here To Continue Using Our Services</p></div>
        <div className='grid'>
            <label htmlFor="userName">Enter UserName : - </label>
            <input type="text" id='userName' onChange={handleUserName} />
        </div>
        <div className='grid'>
            <label htmlFor="password">Enter Password : -</label>
            <input type="text" id='password' onChange={handlePass} />
        </div>
        <button className='bg-red-300 self-center justify-self-center px-10 py-1 rounded my-10 ' onClick={getUser} >Login</button>

    </div>
  )
}

export default Login