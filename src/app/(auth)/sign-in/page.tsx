"use client";

import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="shadow-lg shadow-cyan-500/50 text-lg font-sans px-8 py-2 border border-zinc-500 rounded-lg mx-4 my-2" onClick={() => signIn()}>Sign in</button>
    </>
  )
}