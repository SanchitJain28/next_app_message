"use client"

import React, { useEffect, useState } from 'react'


import Link from 'next/link';
import { loginDetails } from '@/context/Authentication';
export default function Navbar() {
    const[loginDetails,setLoginDetails]=useState<loginDetails|null>(null)
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
