import React from 'react'

function contact() {
  return (
    <div>
        <h1 className='text-center text-[2.2rem]'>Contact Us</h1>
        <div className=' container px-10 grid gap-y-2'>
            <label htmlFor="cName">Enter Your Name :- </label>
            <input className='rounded' type="text" id='cName' />
            <label htmlFor="mobNo">Enter Your Mobile Number</label>
            <input className='rounded' type="text" id='mobNo' />
            <label htmlFor="email">Enter Your Email</label>
            <input className='rounded' type="email" name="email" id="email" />
            <label htmlFor="message">Enter Your Message For Us</label>
            <textarea className='rounded' name="message" id="message" cols="30" rows="10"></textarea>
            <button className='bg-red-300 self-center justify-self-center px-10 py-1 rounded'>Submit</button>
        </div>
    </div>
  )
}

export default contact