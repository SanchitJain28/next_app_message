"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn, useSession } from "next-auth/react"
import { signInSchemma } from "@/Schemmas/signInSchemma"
import { useToast } from "@/hooks/use-toast"
import axios, { AxiosError } from "axios"
import ApiResponse from "@/types/apiResponse"

const SignIn = () => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: z.infer<typeof signInSchemma>) => {
    console.log(data)
    try {
      //the problem was of id ,you have to add 'sign-In' as same id in the server side credentials provider 
      const response = await axios.post('/api/signIn', data)
      console.log(response.data)
      localStorage.setItem("loginToken", response.data.token)
      localStorage.setItem("loginDetails", JSON.stringify(response.data.user))
      router.replace(`/dashboard`)
      toast({
        title: "Login",
        description: "Login successfully",
      });

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.log(axiosError)
      let errorMessage = axiosError.response?.data.message ?? "Unexpected error occured"
      toast({
        title: "An error occurred",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  //ZOD IMPLEMENTATION,new thing
  //to use zod implementaion ,we have to use useForm
  const form = useForm<z.infer<typeof signInSchemma>>({
    resolver: zodResolver(signInSchemma),
    defaultValues: {
      user_identifier: "",
      password: ""
    }
  })


  return (
    <div className="flex">
      <div className="w-1/2 hidden lg:block border-r min-h-screen border-zinc-800 ">
        <p className="text-3xl mt-40 font-sans text-zinc-500 mx-28 p-4">Please sign In to get started</p>
        <p className=" p-4 rounded lg:text-xl text-lg lg:mx-28  mx-8 text-zinc-400 m-auto font-sans lg:my-4 my-4">"AnonyReply – Connect Without Boundaries!"
          AnonyReply is an anonymous messaging app that allows users to send and receive replies without revealing their identity. Simply search for a username and start a conversation—no sign-ups, no names, just pure interaction. Built with Next.js, this project is designed to explore and enhance my skills in modern web development while providing a unique and fun way to communicate.
          Let me know if you want any refinements! 🚀</p>
      </div>
      <div className="lg:mx-20 mx-4 my-20 lg:p-20 p-4 lg:w-1/2 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="user_identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-zinc-600 font-sans">Email</FormLabel>
                  <FormControl>
                    <Input className="w-full p-4 bg-black border border-zinc-700 text-white" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-zinc-600 font-sans">password</FormLabel>
                  <FormControl>
                    <Input className="p-4 bg-black border border-zinc-700 text-white" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button type="submit" onClick={(e) => {

            }}>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
