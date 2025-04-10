import { useState, useRef,useEffect} from 'react'
import { io } from "socket.io-client"
import userData from "../../UserData/tempState"
import Image from 'next/image'
import { useSelector } from 'react-redux'
import ChatBubble from '../../components/ChatBubble'

const DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN 
const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT
const backendProtocol = process.env.NEXT_PUBLIC_PROTOCOL
const backendUrl  = process.env.NEXT_PUBLIC_BACKEND_URL

const socket = io(backendUrl)


function Chat(props) {

  const userName = userData.userName
  const chatPerson = props.props
  const fileRef = useRef()
  const chatBoxRef = useRef()
  const authToken = useSelector(state=>state.authToken.data.authToken)

  //state declarations
  const [image, setimage] = useState(null)
  const [imageUrl, setimageUrl] = useState(null)
  const [roomId, setroomId] = useState(null)
  const [messageArr, setmessageArr] = useState([])
  const [message, setmessage] = useState("")

  async function getMessage(chatId,authToken){
    let chatList = await fetch(`${backendUrl}/chat/getMessages`,{
      method:"POST",
      headers:{
        "auth-token":authToken,
        "content-type":"application/json"
      },
      body:JSON.stringify({chatId})
    })
    chatList = await chatList.json()
    if(chatList) setmessageArr(chatList)
  }
  useEffect(()=>{
    getMessage(chatPerson.id,authToken)
  },[chatPerson.id])

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
    socket.emit("message", {message,sender:userName,roomId,file:image,sendingTime:new Date()})
    setmessageArr(messageArr.concat({message,sender:userName,image:imageUrl,sendingTime:new Date()}))
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
      <div >
        <div className='grid justify-items-center align-items-center'>
          <h1 className='bold text-4xl my-2'>{chatPerson.fName+" "+chatPerson.lName}</h1>
          <div ref={chatBoxRef} className='w-full px-2 py-2 bg-slate-400 overflow-y-auto customScroll h-[68vh] flex flex-col'>
            {messageArr.map(msg=>(
              <div key={msgkey++}>
                <ChatBubble isSelf={msg.sender===userName} chatPerson={chatPerson} messageData={msg}/>
              </div>))}
          </div>
          <div className='flex justify-around h-[30px] my-2 bg-red-400	w-full p-[3px] '>
            <input type="text" className='w-2/3' placeholder='Enter Message Here' onChange={handleChange} value={message} id='message' />
            <label htmlFor="attatchment"  > + </label>
            <input type="file" ref={fileRef} onChange={handleImage} id="attatchment" hidden />
            <button className=' w-[25%] bg-amber-300'  onClick={sendMessage}>Send</button>
          </div>
          { imageUrl && 
            <div className="h-[150px] w-[200px] bg-slate-300 display-flex relative bottom-[200px] ">
              <Image src={imageUrl} alt="" height={150} width={200} className='h-[150px] w-[200px]' srcSet="" />
            </div>
          }
          
        </div>
      </div>
    )
  }
  
export default Chat