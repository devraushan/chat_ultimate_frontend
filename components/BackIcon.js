import React from 'react'

function BackIcon({height,width}) {
  return (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-caret-left">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 6l-6 6l6 6v-12" />
        </svg>
    </div>
  )
}

export default BackIcon