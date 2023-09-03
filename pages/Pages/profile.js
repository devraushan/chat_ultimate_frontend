import React from 'react'
import useSWR from "swr"
import { useSelector } from 'react-redux';

const IP = process.env.NEXT_PUBLIC_IP
const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT

const fetchUser = (authToken) => fetch(`http://${IP}:${backendPort}/auth/getprofile`, { headers: { "auth-token": authToken } }).then((res) => res.json());
function Profile() {
  const userStatus = useSelector((state) => state)
  const authToken = userStatus.data.authToken
  //ENV Variables

  const { data, error } = useSWR(authToken, fetchUser);
  if (error) return <div>Failed To Load</div>;
  if (!data) return <div>Loading...</div>;

  const buff = data.profilePic?Buffer.from(data.profilePic.data):null
  const file = new File([buff], "img.jpg", { type: "image/jpeg" })
  return (
    <div className='w-2/5 bg-gray-600 mx-auto my-24 p-3 rounded'>
      <img className='h-[150px] w-[150px] rounded-[50%] mx-auto overflow-hidden' src={URL.createObjectURL(file)} alt="Profile pic" />
      <p>Username : {data.userName}</p>
      <p>Name: {data.fName + " " + data.lName}</p>
      <p>Email : {data.email}</p>
      <p>Phone No : {data.phNo}</p>
      <p>Country : {data.country}</p>

    </div>
  )
}

export default Profile