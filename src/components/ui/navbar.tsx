"use client"

import React, { useContext, useEffect, useState } from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useIsValidLogin } from '@/hooks/useIsLogin';
import Link from 'next/link';
import { authContext } from '@/context/Authentication';
export default function navbar() {
    const[loginDetails,setLoginDetails]=useState<any>(null)
    useEffect(() => { 
        const storedData=localStorage.getItem("loginDetails")
        setLoginDetails(storedData?JSON.parse(storedData):null)
      }, [])
    return (
        <>
            {loginDetails ? <>
                <div className="bg-black p-4 mx-8 my-2 rounded flex justify-between border border-zinc-600">
                    <p className='text-white lg:text-lg'>Welcome {loginDetails.username}</p>
                    <Link href="/dashboard" className='text-white lg:text-lg'>Dashboard</Link>
                </div>
            </> : <>
                <div className="bg-black p-4 m-2 mx-8 my-2 rounded flex justify-between border border-zinc-600">
                    <Link href="/sign-up" className='text-white lg:text-lg'>SIGN IN</Link>
                    {/* <Link href="/sign-up" className='text-white lg:text-lg'>Dashboard</Link> */}
                </div>
            </>}

        </>
    )
}
