import React, { useState,useEffect } from 'react'
import SearchComponent from '../../components/NewChat';
import Chat from './chathome';
import { useSelector,useDispatch } from 'react-redux';
import Chatcard from '../../components/Chatcard';
import { populateChat } from '../../Store/slices/chatSlice';
import BackIcon from '../../components/BackIcon';
import { useRouter } from 'next/router';

const PORT = process.env.NEXT_PUBLIC_BACKEND_PORT
const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN
const backendProtocol = process.env.NEXT_PUBLIC_PROTOCOL
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

function Chatlist() {
  const router =  useRouter()
  const [backButton, setbackButton] = useState(false)
  const [error, seterror] = useState(null)
  const [focusChat, setfocusChat] = useState(null)
  const [chatObj, setchatObj] = useState(null)
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.authToken)
  if(userStatus.data=="") router.push("/Pages/login")
  const chatList = useSelector((state)=>state.chatlist)

  //Fetch Chat Function
  async function fetchChat(url,authToken){
    try {
      let data = await fetch(url,{
        headers: {
          "auth-token":authToken
        },
        method:"POST"
      })
      data = await data.json()
      if(data) dispatch(populateChat(data))
      
    } catch (err) {
      seterror(err)
    }
  }

  const revertState = ()=>{
    setbackButton(false)
  }
  const authToken = userStatus.data.authToken
  useEffect(() => {
    fetchChat(`${backendUrl}/chat/fetchall`,authToken)
    
  }, [])
  

  const handleChatEntry = (chat) => {
    setchatObj(chat)
  }

  if (error) {
    return (<div>Some Error Occured</div>)
  }
  if (!chatList) {
    return (<div>Loading</div>)
  }
  return (
    <div className='xl:mx-40 mx-2  grid gap-x-2 sm:grid-cols-[auto,1fr] '>
      <div className={`${backButton?"max-sm:absolute":""}`}>
      <div className={`${backButton?"sm:hidden":"hidden"} flex justify-center mt-1`} onClick={revertState}><BackIcon height={48} width={48}/></div>
      <div className={`${backButton?"max-sm:hidden":""}`}>

          {chatList.chats.map(chat => {
            return <div key={chat.id} className={"rounded "+(chat.id == focusChat?"bg-orange-900":"bg-slate-500")} onClick={() => {
              setfocusChat(chat.id)
              handleChatEntry(chat)
              setbackButton(true)
            }}><Chatcard props={chat} /></div>
          })}
      </div>
      </div>
      
      <div className={`${backButton?"":"max-sm:hidden"} `}>
        {chatObj && <Chat props={chatObj} />}
      </div>
      
      <div className={`fixed ${backButton?"max-sm:hidden":""} bottom-5 right-5`}>
        <SearchComponent/>
      </div>
    </div>
  )
}

export default Chatlist