import React from 'react'
import Image from 'next/image'
import {format} from 'date-fns'
import Link from 'next/link'
function ChatBubble({messageData,isSelf,chatPerson  }) {
    console.log(messageData)
    const sendingTime = new Date(messageData.sendingTime)
    const timestring = sendingTime.getDate()===(new Date()).getDate()?format(sendingTime,'p'):format(sendingTime,'Pp')
    return (

        <div className={`my-2 flex items-start gap-2.5 ${isSelf?"justify-end":""}`}>

            <div className={`flex flex-col w-full max-w-[320px]  p-4 border-gray-200 bg-gray-100  ${isSelf?"rounded-tl-xl rounded-bl-xl dark:bg-green-800":"rounded-tr-xl rounded-br-xl dark:bg-gray-700"} `}>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {`${isSelf?"You":messageData.sender}`}
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {timestring}
                    </span>
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {messageData.message}
                </p>
                {   
                    messageData.image&&
                    <Link href={messageData.image} download={"image"} >
                        <div className="group relative my-2.5">
                        <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                            <button
                            data-tooltip-target="download-image"
                            className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
                            >
                            <svg
                                className="w-5 h-5 text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 18"
                            >
                                <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                                />
                            </svg>
                            </button>
                            <div
                            id="download-image"
                            role="tooltip"
                            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
                            >
                            Download image
                            <div className="tooltip-arrow" data-popper-arrow="" />
                            </div>
                        </div>
                            <Image width={500} height={200} src={messageData.image} className="rounded-lg" />
                        </div>
                    </Link>
                }

            </div>
        </div>
    )
}

export default ChatBubble