"use client"
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {
    const {username}=useParams()
  return (
    <div>Can i ge ta hooyeah {username} ?</div>
  )
}
