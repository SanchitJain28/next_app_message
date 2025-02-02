"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React, { useEffect, useState } from 'react'
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const page = () => {
  const { toast } = useToast()
  const [username, setUsername] = useState("")
  const [usernameMessage, setUserNameMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const debouncedUsername = useDebounceCallback(setUsername, 500)
  const router = useRouter()

  const checkUsernameUnique = async () => {
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
  }

  const handleSubmit = async (data: z.infer<typeof signUpSchemma>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>("http://localhost:3000/api/signUp", data)
      toast({
        title: "success",
        description: response.data.message
      })
      console.log(response)
      const { success } = response.data
      //to capture data we have to make the folder in []  
      router.replace(`verify-code/${username}`)
      setIsSubmitting(false)
    } catch (error) {
      console.log("error signing up the user")
      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message ?? "Error signing up the user"
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
  }, [username])

  return (
    <div className="lg:mx-20 mx-4 my-20 lg:p-20 p-4 border boder-zinc-400">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-zinc-600 font-mono">Username</FormLabel>
                <FormControl>
                  <Input className="p-4" {...field} onChange={(e) => {
                    field.onChange(e.target.value);
                    debouncedUsername(e.target.value)
                  }} />
                </FormControl>
                 <p>{usernameMessage}</p> 
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="shadow0lg shadow0zinc-600/50" placeholder="shadcn" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button onClick={() => {
            checkUsernameUnique()
          }}>Check username</button>
          <p>message :- {usernameMessage}</p>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default page
