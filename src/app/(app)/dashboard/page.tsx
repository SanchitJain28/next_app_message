"use client"
import MessageCard from '@/components/appComponents/MessageCard'
import { Input } from '@/components/ui/input'
import { authContext } from '@/context/Authentication'
import { Button } from '@react-email/components'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

export default function page() {
  type Message = {
    content: string,
    createdAt: Date
  }
  const { checkDetials } = useContext<any>(authContext)
  const [messages, setMessages] = useState<[Message] | []>([])
  const [isAcceptingMessage,setisAcceptingMessage]=useState<boolean>(true)
  useEffect(() => { checkDetials() }, [])
  const fetchMessages = async () => {
    try {
      const response = await axios.get("/api/get-messages", {
        headers: {
          "Authorization": localStorage.getItem("loginToken")
        }
      })
      console.log(response)
      setMessages(response.data.message)
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }
  useEffect(() => { fetchMessages() }, [])
  const consoleLogPlease = () => {
    console.log(messages)
  }
  return (
    <div className="">
      {/* use items center to center elements in flex */}
      <div className=" border border-zinc-700 rounded flex flex-row justify-between mx-8 my-4 items-center " id='isAcceptingMessage'>
        <p className='text-white lg:text-lg font-sans mx-4  '>Are you accepting messages from anoynomous users</p>
        <button onClick={()=>{
          isAcceptingMessage?setisAcceptingMessage(false):setisAcceptingMessage(true)
        }} className={`px-12 py-4 ${isAcceptingMessage?"bg-green-600":"bg-red-600"} text-white border-x border-zinc-700`}>{isAcceptingMessage?"yes":"no"}</button>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2 mx-8">
        {messages.map((e, index) => {
          return <div className="mx-2 my-2">
            <MessageCard data={e} />
            </div>
        })}
      </div>
    </div>

  )
}
