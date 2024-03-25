import React from 'react'
import useSWR from "swr"
import Image from 'next/image';
import { useSelector } from 'react-redux';

// const DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN
// const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT
// const backendProtocol = process.env.NEXT_PUBLIC_PROTOCOL
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const fetchUser = (authToken) => fetch(`${backendUrl}/auth/getprofile`, { headers: { "auth-token": authToken } }).then((res) => res.json());
function Profile() {
  const userStatus = useSelector((state) => state.authToken)
  const authToken = userStatus.data.authToken
  //ENV Variables

  const { data, error } = useSWR(authToken, fetchUser);
  if (error) return <div>Failed To Load</div>;
  if (!data) return <div>Loading...</div>;

  const buff = data.profilePic?Buffer.from(data.profilePic.data):null
  const file = new File([buff], "img.jpg", { type: "image/jpeg" })
  return (
    <div className='max-w-xl bg-gray-600 mx-auto my-24 p-5 px-10 rounded'>
      <Image height={150} width={150} className='h-[150px] w-[150px] rounded-[50%] mx-auto overflow-hidden' src={URL.createObjectURL(file)} alt="Profile pic" />
      <div className='my-5 text-gray-100'>
        
        <p>Username : {data.userName}</p>
        <p>Name: {data.fName + " " + data.lName}</p>
        <p>Email : {data.email}</p>
        <p>Phone No : {data.phNo}</p>
        <p>Country : {data.country}</p>
      </div>

    </div>
  )
}

export default Profile