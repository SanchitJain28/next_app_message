"use client"

import { useIsValidLogin } from '@/hooks/useIsLogin'
import React, { createContext, useState } from 'react'

export const authContext=createContext({})

export function Authentication({children}:{children:React.ReactNode}) {
     const [loginDetails, setLoginDetails] = useState<any>({
            success: false,
            data: []
        })
        const checkDetials = async () => {
                const checkLogin = await useIsValidLogin(localStorage.getItem("loginToken") || "")
                if (checkLogin) { setLoginDetails(checkLogin) }
                return false
            }
  return (
    <authContext.Provider value={{loginDetails,setLoginDetails,checkDetials}}>
        {children}
    </authContext.Provider>
  )
}
