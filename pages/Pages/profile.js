import React,{useEffect} from 'react'
import path from "path"
import useSWR from "swr"

const fetchUser = (url)=>fetch(url).then((res)=> res.json());

function profile() {
  const {data,error} = useSWR("/api/user",fetchUser);
  if(error) return <div>Failed To Load</div>;
  if(!data) return <div>Loading...</div>;
  return (
    
    <div className='w-2/5 bg-gray-600 mx-auto my-24 p-3 rounded'>
      <img className='h-[150px] w-[150px] rounded-[50%] mx-auto overflow-hidden' src={`http://localhost:3000/api/image`} alt="Profile pic"/>
      <p>Username : {data.userName}</p> 
      <p>Name: {data.Name}</p>
      <p>Email : {data.email}</p>
      <p>Phone No : {data.phone}</p>
      <p>Country : {data.country}</p>

    </div>
  )
}

export default profile