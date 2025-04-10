import React,{useState} from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { fetchUser } from './../Store/slices/userSlice'



export default function Home() {

  
  const dispatch = useDispatch()
  const router = useRouter()
  
  
  const getUser = async ()=>{
    
    try {
      dispatch(fetchUser({userName:"guest",password:"guest123"}))
      setTimeout(() => {
        router.push("/Pages/chatlist")
      }, 1000);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section className='bg-gradient-to-r from-purple-500 to-pink-500 text-center h-[750px] w-screen'>
        <p className='text-xl pt-24'>Always Connected</p>
        <span>WITH</span>
        <p className='font-bold text-[5rem] text-red-300 pt-10'>Chat Ultimate</p>
        <p className='font-semibold text-4xl text-lime-300 pt-28 '>Connecting Hearts</p>
        <button onClick={getUser} className="relative inline-flex items-center justify-center p-0.5 my-24 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Explore Using Guest Account
          </span>
        </button>
      </section>
    </>
  )
}
