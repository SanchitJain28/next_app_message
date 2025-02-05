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

const page = () => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const { data: session, status } = useSession()

  const handleSubmit = async (data: z.infer<typeof signInSchemma>) => {
    console.log(data)
    try {
      //the problem was of id ,you have to add 'sign-In' as same id in the server side credentials provider 
      const response = await axios.post('/api/signIn', data)
      console.log(response.data)
    } catch (error) {
      const axiosError=error as AxiosError<ApiResponse>
      let errorMessage=axiosError.response?.data.message ?? "Unexpected error occured"
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
    <div className="lg:mx-20 mx-4 my-20 lg:p-20 p-4 border boder-zinc-400">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="user_identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="shadow-lg shadow-zinc-600/50" placeholder="shadcn" {...field} />
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
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input className="shadow0lg shadow0zinc-600/50" placeholder="shadcn" {...field} />
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
  )
}

export default page
