import PlusIcon from "./PlusIcon"
import SeacrhIcon from "./icons/SeacrhIcon"
import { useState,useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { appendChat } from "../Store/slices/chatSlice"

const IP = process.env.NEXT_PUBLIC_IP
const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT


function SearchComponent() {
  const [searchParams, setsearchParams] = useState("")
  const [buttonActive, setbuttonActive] = useState(false)
  const [searchResults, setsearchResults] = useState([])

  const authToken = useSelector((state) => state.authToken.data.authToken)
  const dispatch = useDispatch()
  

  async function fetchUserSearch(params,authToken){
    let results = await fetch(`http://${IP}:${backendPort}/search/users?params=${params}`,{
      headers:{
        "auth-token":authToken
      }
    })
    results = await results.json()
    setsearchResults(results.results)
  }
  async function createOrFetchNewChat(url,authToken,targetUserId){
    try {
      let data = await fetch(url,{
        method:"POST",
        body:JSON.stringify({targetUserId}),
        headers:{
          "auth-token":authToken,
          "content-type":"application/json"
        }
      })
      data = await data.json()
      if(data.isNew){
        dispatch(appendChat(data))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const createChatUrl = `http://${IP}:${backendPort}/chat/create/`

  useEffect(() => {
    fetchUserSearch(searchParams,authToken)
  }, [searchParams])

  function rotatePlus(){
    if(buttonActive) setbuttonActive(false)
    else setbuttonActive(true)
  }
  const handleUserSearch=(e)=>{
    setsearchParams(e.target.value)
  }

  return (
    <div className={`${buttonActive?"rounded p-1.5 h-80 w-80 bg-gray-400":"h-20 w-20"}`} >
      {
        buttonActive&& <div>
          <div className="grid grid-cols-[auto,auto] justify-items-center"> 
            <input type="text" value={searchParams} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-900" onChange={handleUserSearch} />
            <SeacrhIcon/>
          </div>
          <div>
            {searchParams&&searchResults.map(user=><div onClick={()=>createOrFetchNewChat(createChatUrl,authToken,user.id)} key={user.id} >{user.userName}</div>)}
          </div>
        </div>
      }


      <div onClick={rotatePlus} className={` absolute bottom-0 right-0 rounded ${buttonActive?"rotate-45":"rotate-0"}`}>
        <PlusIcon />
      </div>
    </div>

  )
}

export default SearchComponent