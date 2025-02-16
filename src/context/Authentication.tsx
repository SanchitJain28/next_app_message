"use client"
import React, { createContext, useEffect, useState } from 'react'
import { Message } from '@/model/User'
export type loginDetails = {
  email:string
  isAccepting:boolean
  username:string
  checkDetails: (token: string) => Promise<void>; // Add this line to the interface
}
export interface AuthContextType  {
  loginDetails?: loginDetails | null; // Adjust based on your data
  setMessages: React.Dispatch<React.SetStateAction<Message[]|[]>> // Adjust based on your function
  messages?: Message[] |[]; // Adjust based on your data
  setLoginDetails?: React.Dispatch<React.SetStateAction<loginDetails | null>>
}
export const authContext = createContext<AuthContextType|null>(null)

export function Authentication({ children }: { children: React.ReactNode }) {
  const [loginDetails, setLoginDetails] = useState<loginDetails|null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  useEffect(() => {
    // const loginDetails = JSON.parse(localStorage.getItem("loginDetails") ?? "")
   const loginDetailsinLocalStorage = JSON.parse(localStorage.getItem("loginDetails")??"")
   if(loginDetailsinLocalStorage!==""){
     setLoginDetails(loginDetailsinLocalStorage)
   }
   else{
    setLoginDetails(null)
   }
  }, [])

  // const checkDetails = async (token: string) => {
  //   const secret = new TextEncoder().encode(
  //     'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
  //   )
  //   if (!token) {
  //     setLoginDetails(null)
  //     return false
  //   }
  //   try {
  //     const { payload } = await jose.jwtVerify(token, secret)
  //     return payload
  //   } catch (error) {
  //     if (error instanceof jose.errors.JWTExpired) { // Check for JWT expiration specifically
  //       console.log(error)
  //       alert(error)
  //       localStorage.removeItem("loginDetails")
  //       setLoginDetails(null)
  //       return {
  //         success: false,
  //         data: []
  //       }
  //     }
  //     console.log(error)
  //   }
  // }
  return (
    <authContext.Provider value={{ loginDetails, setLoginDetails, messages, setMessages }}>
      {children}
    </authContext.Provider>
  )
}
