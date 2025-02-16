"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React, { useCallback, useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchemma } from "@/Schemmas/signUpSchemma"
import axios, { AxiosError } from 'axios'
import ApiResponse from "@/types/apiResponse"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const SignUp = () => {
  const { toast } = useToast()
  const [username, setUsername] = useState("")
  const [usernameMessage, setUserNameMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const debouncedUsername = useDebounceCallback(setUsername, 500)
  const router = useRouter()
  const checkUsernameUnique=useCallback(async () => {
    try {
      setIsCheckingUsername(true)
      setUserNameMessage("")
      const response = await axios.get(`/api/check-username-unique?username=${username}`)
      setUserNameMessage(response.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      setUserNameMessage(axiosError.response?.data.message ?? "Error checking username")
      console.log(error)
    }
    finally {
      setIsCheckingUsername(false)
    }
  },[username])


  const handleSubmit = async (data: z.infer<typeof signUpSchemma>) => {
    setIsSubmitting(true)
    
    try {
      const response = await axios.post<ApiResponse>("http://localhost:3000/api/signUp", data)
      toast({
        title: "success",
        description: response.data.message
      })
      console.log(response)
      
      //to capture data we have to make the folder in []  
      router.replace(`/sign-in`)
      setIsSubmitting(false)
    } catch (error) {
      console.log("error signing up the user")
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message ?? "Error signing up the user"
      toast({
        title: "false",
        description: errorMessage,
        variant: 'destructive'
      })
    }
    finally {
      setIsSubmitting(false)
    }
  }

  //ZOD IMPLEMENTATION,new thing
  //to use zod implementaion ,we have to use useForm
  const form = useForm<z.infer<typeof signUpSchemma>>({
    resolver: zodResolver(signUpSchemma),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })
  useEffect(() => {
    console.log(username)
    checkUsernameUnique()
  }, [username,checkUsernameUnique])

  return (
    <div className="flex">
      <div className="w-1/2 hidden lg:block border-r min-h-screen border-zinc-800 ">
        <p className="text-3xl mt-40 font-sans text-zinc-500 mx-28 p-4">Please sign up to get started</p>
        <p className=" p-4 rounded lg:text-xl text-lg lg:mx-28  mx-8 text-zinc-400 m-auto font-sans lg:my-4 my-4">"AnonyReply – Connect Without Boundaries!"
        AnonyReply is an anonymous messaging app that allows users to send and receive replies without revealing their identity. Simply search for a username and start a conversation—no sign-ups, no names, just pure interaction. Built with Next.js, this project is designed to explore and enhance my skills in modern web development while providing a unique and fun way to communicate.
        Let me know if you want any refinements! 🚀</p>
      </div>
      <div className="lg:mx-20 mx-8 my-20 lg:p-20 p-8 lg:w-1/2 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-zinc-600 font-sans">Username</FormLabel>
                  <FormControl>
                    <Input className="p-4 bg-black border border-zinc-700 text-white" {...field} onChange={(e) => {
                      field.onChange(e.target.value);
                      debouncedUsername(e.target.value)
                    }} />
                  </FormControl>
                  <p className="text-white">{isCheckingUsername?"loading":usernameMessage}</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* //email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-600 font-sans">Email</FormLabel>
                  <FormControl>
                    <Input className="shadow-lg shadow-zinc-600/50 p-4 bg-black border border-zinc-700 text-white" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* //password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-600 font-sans">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" className="p-4 bg-black border border-zinc-700 text-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>Submit</Button>
          </form>
        </Form>
      </div>
    </div>

  )
}

export default SignUp
