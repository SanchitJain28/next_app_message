"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React, { useState } from 'react'
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
import { signIn } from "next-auth/react"
import { signInSchemma } from "@/Schemmas/signInSchemma"
import { useToast } from "@/hooks/use-toast"

const page = () => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const [signInResponse, setSignInResponse] = useState("");


  const handleSubmit = async (data: z.infer<typeof signInSchemma>) => {
    console.log("Submitting Data:", data);
    try {
      const response = await signIn("credentials", {
        redirect: false, // Important to prevent automatic redirection
        callbackUrl: "http://localhost:3000",
        user_identifier: data.identifier, // Ensure this field matches what your API expects
        password: data.password,
      });
      
      console.log("SignIn Response:", response);
      // setResponse(response)
  
      // if (response?.error) {
      //   toast({
      //     title: "Login Failed",
      //     description: response.error,
      //     variant: "destructive",
      //   });
      // } else {
      //   toast({
      //     title: "Login Successful",
      //     description: "Redirecting...",
      //   });
      //   router.push(response?.url || "/");
      // }
    } catch (error) {
      console.error("SignIn Error:", error);
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  //ZOD IMPLEMENTATION,new thing
  //to use zod implementaion ,we have to use useForm
  const form = useForm<z.infer<typeof signInSchemma>>({
    resolver: zodResolver(signInSchemma),
    defaultValues: {
      identifier: "",
      password: ""
    }
  })


  return (
    <div className="lg:mx-20 mx-4 my-20 lg:p-20 p-4 border boder-zinc-400">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="identifier"
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
          

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default page
