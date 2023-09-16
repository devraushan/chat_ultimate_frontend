import React from 'react'
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import Chatcard from '../../components/Chatcard';
const IP = process.env.NEXT_PUBLIC_IP
const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT

const fetchChats = (authToken) => fetch(`http://${IP}:${backendPort}/chat/fetchall`, { headers: { "auth-token": authToken },method:"POST" }).then((res) => res.json());

function Chatlist() {
  const userStatus = useSelector((state) => state)
  const authToken = userStatus.data.authToken
  const {data,error} = useSWR(authToken,fetchChats)

  if(!data){
    return (<div>Loading</div>)
  }
  if(error){
    return(<div>Some Error Occured</div>)
  }
  return (
    <div className='mx-40'>
      {data.map(chat=><Chatcard key = {chat.id} props = {chat} />)}
    </div>
  )
}

export default Chatlist