import dbConnect from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react"
import Navbar from "@/components/ui/navbar";

export default function Home() {

  return (
    <div>
      {/* <h1 className="text-center lg:text-3xl text-zinc-400 m-auto font-sans lg:my-20 my-4 text-lg">Welcome</h1> */}
      <h2 className="border border-zinc-800 p-4 rounded lg:text-xl text-lg lg:mx-8  mx-8 text-zinc-400 m-auto font-sans lg:my-4 my-4">"AnonyReply – Connect Without Boundaries!"
        AnonyReply is an anonymous messaging app that allows users to send and receive replies without revealing their identity. Simply search for a username and start a conversation—no sign-ups, no names, just pure interaction. Built with Next.js, this project is designed to explore and enhance my skills in modern web development while providing a unique and fun way to communicate.
        Let me know if you want any refinements! 🚀</h2>
      <div className="flex mx-8 rounded ">
        <Link href="/sign-up" className="bg-blue-700 w-1/2 p-4 rounded text-lg mx-1 font-sans  my-4 text-white"> New user</Link>
        <Link href="/sign-in" className="bg-blue-700 w-1/2 p-4 rounded text-lg mx-1 font-sans  my-4 text-white"> Login</Link>

      </div>

    </div>
  );
}
