import React from 'react'
import { useState,useEffect } from 'react'
import { io } from "socket.io-client"

const socket = io("https://chat-ultimate-backend-git-main-devraushan.vercel.app")


function Chat() {

  //state declarations
  const [image, setimage] = useState(null)
  const [imageUrl, setimageUrl] = useState(null)
  const [roomId, setroomId] = useState("room1")
  const [userName, setUserName] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)
  const [messageArr, setmessageArr] = useState([])
  const [message, setmessage] = useState("")

  //functions

  const handleImage = (event)=>{
    setimage(event.target.files[0])
  }
  const handleChange = (event)=>{
    setmessage(event.target.value)
  } 
  const handleName=(event)=>setUserName(event.target.value)
  const handleRoom=(event)=> setroomId(event.target.value)
  const nameSetter = ()=>{
    socket.emit("joiningReq",{roomId,userName})
    setIsRegistered(true);
  }
  function sendMessage() {
    socket.emit("message", {message,sender:userName,roomId})
    setmessageArr(messageArr.concat({message,sender:userName}))
    setmessage("") 
  }
  socket.on("newMessage",data=>{
      setmessageArr(messageArr.concat(data))
  })
 
  useEffect(() => {
    let fileReader;
    if(image){
      fileReader = new FileReader()
      fileReader.onload = e =>{
          const { result } = e.target
          setimageUrl(result)
      }
      fileReader.readAsDataURL(image)
    }
  
    return () => {
      
    }
  }, [image])
  

  //display chat interface

  if(isRegistered){

    return (
      <div>
        <div className='grid justify-items-center align-items-center'>
          <h1 className='bold text-4xl my-2'>ChatBox</h1>
          <div className='w-1/2 bg-slate-400	h-[600px]'>
            {messageArr.map(msg=><div>{msg.sender}:{msg.message}</div>)}
          </div>
          <div className='flex justify-around h-[30px] my-2 bg-red-400	w-1/2 p-[3px] '>
            <input type="text" className='w-2/3' placeholder='Enter Message Here' onChange={handleChange} value={message} id='message' />
            <label htmlFor="attatchment"  >+</label>
            <input type="file" onChange={handleImage} id="attatchment" hidden />
            <button className=' w-[30%] bg-amber-300' onClick={sendMessage}>Send</button>
          </div>
          { imageUrl && 
            <div className="h-[150px] w-[200px] bg-slate-300 display-flex relative bottom-[200px] ">
              <img src={imageUrl} alt="" className='h-[150px] w-[200px]' srcset="" />
            </div>
          }
          
        </div>
      </div>
    )
  }

  //display registration page

  return (
    <div className='grid align-items-center'>
      <div className='grid justify-items-center items-center h-[200px] bg-blue-400 py-[40px] mx-[30%] my-[20%]'>
        <input type="text" onChange={handleRoom} value={roomId} />
        <input type="text" onChange={handleName} value={userName} />
        <button className='w-[30%] bg-amber-300' onClick={nameSetter} >Register</button>
      </div>
    </div> 
  )
}


export default Chat