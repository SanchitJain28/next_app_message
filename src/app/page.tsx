import dbConnect from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react"

export default function Home() {
  
  return (
    <div>
      <h1 className="text-center text-3xl text-zinc-400 m-auto font-sans my-20">Welcome</h1>
      <h2 className="text-center text-3xl mx-20 text-zinc-400 m-auto font-sans my-20">"AnonyReply – Connect Without Boundaries!"
        AnonyReply is an anonymous messaging app that allows users to send and receive replies without revealing their identity. Simply search for a username and start a conversation—no sign-ups, no names, just pure interaction. Built with Next.js, this project is designed to explore and enhance my skills in modern web development while providing a unique and fun way to communicate.
        Let me know if you want any refinements! 🚀</h2>
        <Link href="/sign-up" className="bg-black p-4 rounded text-lg font-sans mx-20 my-4 text-white"> Signup</Link>
    </div>
  );
}
