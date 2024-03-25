import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'

// const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN
// const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT
// const backendProtocol = process.env.NEXT_PUBLIC_PROTOCOL
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

function Signup() {
  const [signupSuccess, setsignupSuccess] = useState(false)
  const imageInput = useRef()
  const router = useRouter()
  const [userName, setuserName] = useState("")
  const [fName, setfName] = useState("")
  const [lName, setlName] = useState("")
  const [email, setemail] = useState("")
  const [phNo, setphNo] = useState("")
  const [password, setpassword] = useState("")
  const [country, setcountry] = useState("")

  const handleSignUp = ()=>{
    const signupData = new FormData()
    const profilePic = imageInput.current.files[0]
    signupData.append("userName",userName)
    signupData.append("fName",fName)
    signupData.append("lName",lName)
    signupData.append("email",email)
    signupData.append("password",password)
    signupData.append("phNo",phNo)
    signupData.append("country",country)
    signupData.append("profilePic",profilePic)
    fetch(`${backendUrl}/auth/signup`,{
      method: "POST",
      body: signupData,
    }).then(data => data.json().then(data=>{
      setsignupSuccess(true)
    })).catch(data=>router.push("/Pages/error"))
  }


  if(signupSuccess){
    return(
      <>
      <div className="my-96 text-center text-[#FF9494] bold text-4xl">
        Signed Up Successfully
      </div>
      </>
    )
  }


  return (

    

    <div className='grid container md:w-2/3 bg-slate-700 mx-auto h-[600px] mt-12 rounded p-10 overflow-auto mb-24'>
        <div className='justify-self-center'>
        <p className='bg-orange-300 px-5 py-2 rounded font-bold text-xl'>Sign Up</p>
        </div>
        
        <label htmlFor="fname">Enter First Name : - </label>
        <input type="text" id="fname" value={fName} onChange={(e)=>setfName(e.target.value) } />
        <label htmlFor="lname">Enter Last Name : -</label>
        <input type="text" id='lname' value={lName} onChange={e=> setlName(e.target.value)} />
        <label htmlFor="userName">Enter Username : -</label>
        <input type="text" id='userName' value={userName} onChange={e=>setuserName(e.target.value)} />
        <label htmlFor="email">Enter Email : -</label>
        <input type="email" id='email' value={email} onChange={e=>setemail(e.target.value)} />
        <label htmlFor="phNo">Enter Mobile Number : - </label>
        <input type="text" id='phNo' value={phNo} onChange={e=>setphNo(e.target.value)} />
        <label htmlFor="country">Select Country : - </label>
        <select name="country" id="country" value={country} onChange={e=>setcountry(e.target.value)} >
            <option value="">-choose country-</option>
            <option value="IN">India</option>
            <option value="CH">China</option>
            <option value="PAK">Pakistan</option>
            <option value="BAN">Bangladesh</option>
            <option value="OMAN">Oman</option>
            <option value="IT">Italy</option>
            <option value="UKR">Ukraine</option>
            <option value="RUS">Russia</option>
        </select>
        <label htmlFor="profilePic">Choose a Profile Pic</label>
        <input type="file" ref={imageInput} name="profilePic" id="profilePic"  />
        <label htmlFor="password">Create new Password : - </label>
        <input type="password" id='password' value={password} onChange={e=>setpassword(e.target.value)} />
        <button className='bg-red-300 self-center justify-self-center px-10 py-1 rounded mt-5' onClick={handleSignUp} >Create Your Account</button>
    </div>
  )
}

export default Signup