import Link from 'next/link'
import React from 'react'

function contact() {
  return (
    <div>
        <h1 className='text-center text-[2.2rem] font-bold'>Contact Us</h1>
        <div className=' container px-10 grid gap-y-2'>
          <div>
            <p>
              <strong>Raushan Singh</strong>
            </p>
            <p>
              <strong>CSE</strong> Undergrad student at <strong>Indian Institute of Information Technology, Bhagalpur</strong>
            </p>
            <p>Call me At : +91 <strong>8809569611</strong></p>
            <p>Mail me At : <strong>devraushansingh@gmail.com</strong></p>
            <Link href={"https://github.com/devraushan"} target='_blank'><div className='bg-[#24292e] w-fit text-white p-2 rounded'>GitHub</div></Link> 
          </div>
        </div>
    </div>
  )
}

export default contact