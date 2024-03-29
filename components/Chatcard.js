import React from 'react'
import buffToImg from '../Utility/buffToImg'
import Image from 'next/image'


const Chatcard = ({props}) => {
  const profilePic = buffToImg(props.profilePic.data)
  

  

  return (
    <div className={`my-2 rounded px-3 py-2 grid grid-cols-[auto,1fr] grid-row-2 xl:w-96 `}>
      <Image className='rounded-full h-10 w-10 mx-2 row-span-2' src={URL.createObjectURL(profilePic)} alt = {props.userName} width={30} height={30} />
      <div>{props.fName + " " + props.lName}</div>
      <span className='col-start-2'>@{props.userName}</span>
    </div>
  )
}

Chatcard.propTypes = {}

export default Chatcard