import React from 'react'
import { useState, useRef,useEffect} from 'react'
import { io } from "socket.io-client"
import userData from "../../UserData/tempState"

const IP = process.env.NEXT_PUBLIC_IP
const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT


const socket = io(`http://${IP}:${backendPort}`)


function Chat(props) {

  const userName = userData.userName
  const chatPerson = props.props
  const fileRef = useRef()
  //state declarations
  const [image, setimage] = useState(null)
  const [imageUrl, setimageUrl] = useState(null)
  const [roomId, setroomId] = useState(null)
  const [messageArr, setmessageArr] = useState([])
  const [message, setmessage] = useState("")

  socket.emit("joiningReq",{roomId:chatPerson.id,userName})

  useEffect(() => {
  socket.disconnect()
  socket.connect()
  setroomId(chatPerson.id)
  socket.emit("joiningReq",{roomId:chatPerson.id,userName})
  setmessageArr([])
  }, [props])


  //functions

  const handleImage = (event)=>{

    if(event.target.files && event.target.files[0]){
      const i = event.target.files[0]
      setimage(i)
      setimageUrl(URL.createObjectURL(i))
    }
  }
  const handleChange = (event)=>{
    setmessage(event.target.value)
  } 

  
  
  function sendMessage() {
    socket.emit("message", {message,sender:userName,roomId,file:image})
    setmessageArr(messageArr.concat({message,sender:userName,image:imageUrl}))
    setmessage("")
    setimage(null)
    setimageUrl(null)
    fileRef.current.value = null
  }
  socket.on("newMessage",data=>{
      setmessageArr(messageArr.concat(data))
  })
  
  //display chat interface
  let msgkey = 0

    return (
      <div>
        <div className='grid justify-items-center align-items-center'>
          <h1 className='bold text-4xl my-2'>{chatPerson.fName+" "+chatPerson.lName}</h1>
          <div className='w-1/2 max-sm:w-[95vw] bg-slate-400 overflow-scroll	h-[600px]'>
            {messageArr.map(msg=><div key={msgkey++}>{msg.sender}:{msg.message}{( msg.image && <img src={msg.image} height={100} width = {100} />)}</div>)}
          </div>
          <div className='flex max-sm:w-[95vw] justify-around h-[30px] my-2 bg-red-400	w-1/2 p-[3px] '>
            <input type="text" className='w-2/3' placeholder='Enter Message Here' onChange={handleChange} value={message} id='message' />
            <label htmlFor="attatchment"  > + </label>
            <input type="file" ref={fileRef} onChange={handleImage} id="attatchment" hidden />
            <button className=' w-[25%] bg-amber-300' onClick={sendMessage}>Send</button>
          </div>
          { imageUrl && 
            <div className="h-[150px] w-[200px] bg-slate-300 display-flex relative bottom-[200px] ">
              <img src={imageUrl} alt="" className='h-[150px] w-[200px]' srcSet="" />
            </div>
          }
          
        </div>
      </div>
    )
  }

  //display registration page



export default Chat