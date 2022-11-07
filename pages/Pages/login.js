import React from 'react'

function login() {
  return (
    <div className='grid container md:w-2/5 rounded mx-auto bg-slate-600 p-5 mt-24'>
        <div className='justify-self-center text-2xl mb-10'><p>Login Here To Continue Using Our Services</p></div>
        <div className='grid'>
            <label htmlFor="userName">Enter UserName : - </label>
            <input type="text" id='userName' />
        </div>
        <div className='grid'>
            <label htmlFor="password">Enter Password : -</label>
            <input type="text" id='password' />
        </div>
        <button className='bg-red-300 self-center justify-self-center px-10 py-1 rounded my-10 '>Login</button>

    </div>
  )
}

export default login