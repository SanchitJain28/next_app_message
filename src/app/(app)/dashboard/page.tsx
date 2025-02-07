"use client"
import MessageCard from '@/components/appComponents/MessageCard'
import { authContext } from '@/context/Authentication'
import { acceptMessageSchemma } from '@/Schemmas/acceptMessageSchemma'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Switch } from "@/components/ui/switch"
import ApiResponse from '@/types/apiResponse'
import { useToast } from '@/hooks/use-toast'

//MAN THERE IS FUCKING DIFFERENCE BETWEENN || and ?? || this will always assign true to a value ,?? this only gives true when the other one is false
export default function Dashboard() {
  type Message = {
    content: string,
    createdAt: Date
  }
  const form = useForm({
    resolver: zodResolver(acceptMessageSchemma),
  })
  const { toast } = useToast()
  const { register, watch, setValue } = form

  const { loginDetails, checkDetials } = useContext<any>(authContext)
  const [messages, setMessages] = useState<[Message] | []>([])
  const acceptMessages = watch("acceptMessages")

  useEffect(() => { checkDetials(localStorage.getItem("loginToken")) }, [])
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
  const refreshMessages = () => {
    setTimeout(() => {
      fetchMessages()
    }, 1500);
  }
  const profileURL="https://websitename.pending/u/username"
  const fetchAcceptMessageStatus = useCallback(async () => {
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages", {
        headers: {
          "Authorization": localStorage.getItem("loginToken")
        }
      })
      console.log(response.data.isAcceptingMessage)
      setValue("acceptMessages", response.data.isAcceptingMessage ?? true)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "error",
        description: "error getting the status"
      })
    }
    finally {

    }

  }, [setValue])
  const handleAcceptMessageStatus = async () => {
    console.log(acceptMessages)
    console.log(form)
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptingMessage: !acceptMessages
      }, {
        headers: {
          "Authorization": localStorage.getItem("loginToken"),
          "Content-Type": "application/json"

        },
      })
      console.log(response)
      setValue("acceptMessages", response.data.isAcceptingMessage ?? true)
      toast({
        title: "success",
        description: "accepting message status changed",
        variant: "destructive",
        className: "bg-yellow-400 text-black font-sans text-lg"
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "error",
        description: "error getting the status"
      })
    }
  }
  useEffect(() => { fetchMessages(), fetchAcceptMessageStatus() }, [])

  return (
    <>
      {loginDetails ? <div className="">
        {/* use items center to center elements in flex */}
        <div className=" rounded flex flex-row justify-between mx-8 my-4 items-center " id='isAcceptingMessage'>
          <div className=" lg:p-4 py-4 flex w-full border border-zinc-700 justify-between">
            <p className='text-white lg:text-lg font-sans mx-4  text-xs'>Block messages from anonymous users?</p>
            {/* <button onClick={() => {
            isAcceptingMessage ? setisAcceptingMessage(false) : setisAcceptingMessage(true)
          }} className={`px-12 py-4 ${isAcceptingMessage ? "bg-green-600" : "bg-red-600"} text-white border-x border-zinc-700`}>{isAcceptingMessage ? "yes" : "no"}</button> */}
            <Switch  {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleAcceptMessageStatus}
              className='bg-white mx-4' />
          </div>
          <button onClick={()=>{
            refreshMessages()
            toast({
              title: "Refreshed",
              description: "Messages refreshed",
              className: "bg-pink-600 text-black font-sans text-lg border-none"
            })
          }} className={`bg-black ml-4 lg:px-16 h-[67px] px-4 lg:w-40 lg:text-lg text-sm  text-white border rounded border-zinc-700`}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></button>
        </div>
        <div className="flex justify-between items-center  border border-zinc-700 mx-8 my-4">
          <p className='text-zinc-300 px-4 lg:text-lg text-sm font-sans'>{profileURL}</p>
          <button className={`bg-black ml-4 lg:px-16 py-4 lg:w-40 px-4 lg:text-lg text-sm  text-white border rounded border-zinc-700`} onClick={()=>{
            navigator.clipboard.writeText(profileURL)
            toast({
              title: "COPIED",
              description: "Copied to clipboard",
              className: "bg-blue-600 text-black font-sans text-lg border-none"
            })
          }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></button>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-2 mx-4 ">
          {messages.map((e, index) => {
            return <div className="mx-4 my-2">
              <MessageCard data={e} />
            </div>
          })}
        </div>
      </div> : <h1 className='text-white'>Please log in</h1>}
    </>
  )
}
