import React, { useState,useEffect } from 'react'
import SearchComponent from '../../components/NewChat';
import Chat from './chathome';
import { useSelector,useDispatch } from 'react-redux';
import Chatcard from '../../components/Chatcard';
import { populateChat } from '../../Store/slices/chatSlice';

const IP = process.env.NEXT_PUBLIC_IP
const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT


function Chatlist() {

  const [error, seterror] = useState(null)
  const [focusChat, setfocusChat] = useState(null)
  const [chatObj, setchatObj] = useState(null)
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.authToken)
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

  const authToken = userStatus.data.authToken
  useEffect(() => {
    fetchChat(`http://${IP}:${backendPort}/chat/fetchall`,authToken)
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
    <div className='mx-40 grid grid-cols-[auto,1fr]'>
      <div className=''>
        {chatList.chats.map(chat => {
          return <div key={chat.id} className={"rounded "+(chat.id == focusChat?"bg-orange-900":"bg-slate-500")} onClick={() => {
            setfocusChat(chat.id)
            handleChatEntry(chat)
          }}><Chatcard props={chat} /></div>
        })}
      </div>
      <div>
        {chatObj && <Chat props={chatObj} />}
      </div>
      <div className='fixed bottom-5 right-5'>
        <SearchComponent/>
      </div>
    </div>
  )
}

export default Chatlist