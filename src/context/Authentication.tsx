"use client"

import { useIsValidLogin } from '@/hooks/useIsLogin'
import React, { createContext, useState } from 'react'
import * as jose from 'jose'

export const authContext = createContext({})

export function Authentication({ children }: { children: React.ReactNode }) {
  const [loginDetails, setLoginDetails] = useState<any>({
    success: false,
    data: []
  })
  const checkDetials = async (token: string) => {
    const secret = new TextEncoder().encode(
      'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    if (!token) {
      setLoginDetails(null)
      return false
    }
    try {
      const { payload } = await jose.jwtVerify(token, secret)
      return
    } catch (error) {
      if (error instanceof jose.errors.JWTExpired) { // Check for JWT expiration specifically
        console.log(error)
        alert(error)
        localStorage.removeItem("loginDetails")
        setLoginDetails(null)
        return {
          success: false,
          data: []
        }
      }
      console.log(error)
    }
  }
  return (
    <authContext.Provider value={{ loginDetails, setLoginDetails, checkDetials }}>
      {children}
    </authContext.Provider>
  )
}
