import React from 'react'
import Link from "next/link"

function Navbar() {
  return (
    <div >
        <div className='w-100  flex flex-row justify-around bg-lime-500 font-semibold' >
            <button>
                <Link href={`/`}>Home</Link>
            </button>
            <button className='py-1'>
                <Link href="/Pages/about">About</Link>
            </button>
            <button>
                <Link href={`/Pages/contact`}>Contact</Link>
            </button>
        </div>
    </div>
  )
}

export default Navbar