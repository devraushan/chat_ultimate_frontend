import React from 'react'

function signup() {
  return (
    <div className='grid container md:w-2/3 bg-slate-700 mx-auto h-[600px] mt-12 rounded p-10 overflow-auto mb-24'>
        <div className='justify-self-center'>
        <p className='bg-orange-300 px-5 py-2 rounded font-bold text-xl'>Sign Up</p>
        </div>
        <label htmlFor="fname">Enter First Name : - </label>
        <input type="text" id="fname" />
        <label htmlFor="lname">Enter Last Name : -</label>
        <input type="text" id='lname' />
        <label htmlFor="email">Enter Email : -</label>
        <input type="email" id='email' />
        <label htmlFor="phNo">Enter Mobile Number : - </label>
        <input type="text" id='phNo'/>
        <label htmlFor="country">Select Country : - </label>
        <select name="country" id="country">
            <option value="india">India</option>
            <option value="china">China</option>
            <option value="pakistan">Pakistan</option>
            <option value="bangladesh">Bangladesh</option>
            <option value="oman">Oman</option>
            <option value="italy">Italy</option>
            <option value="ukraine">Ukraine</option>
            <option value="russia">Russia</option>
        </select>
        <label htmlFor="password">Create new Password : - </label>
        <input type="password" id='password' />
        <button className='bg-red-300 self-center justify-self-center px-10 py-1 rounded mt-5'>Create Your Account</button>
    </div>
  )
}

export default signup