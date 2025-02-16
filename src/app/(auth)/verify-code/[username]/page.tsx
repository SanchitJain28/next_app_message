"use client"
import { useToast } from "@/hooks/use-toast"
import { verifySchemma } from '@/Schemmas/verifySchemma';
import ApiResponse from '@/types/apiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod";
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

export default function VerifyCode() {
    // const [isSubmitting, setIsSubmitting] = useState(false)  
    // const [code,setCode]=useState("")
    const {toast}=useToast()
    const router=useRouter()
    const { username } = useParams()
    const form=useForm<z.infer<typeof verifySchemma>>({
        resolver:zodResolver(verifySchemma)
    })
    const onSubmit=async(data: z.infer<typeof verifySchemma>)=>{
        console.log(username)
        // setIsSubmitting(true)
        console.log(data.code)
        try {
            const response=await axios.post("/api/verify-code",{
                username:username,
                verifyCodeInput:data.code
            })
            toast({
                title:"sucess",
                description:"success"
            })
            console.log(response)
            //you have to use abosluter path by adding / before the page name like her /sign-in is right but sign-in was wrong
            router.push("/sign-in")
        } catch (error) {
            console.log("error getting verification code")
            console.log(error)
                  const axiosError = error as AxiosError<ApiResponse>
                  const errorMessage = axiosError.response?.data.message ?? "Error getting verification the user"
                  toast({
                    title: "false",
                    description: errorMessage,
                    variant: 'destructive'
                  })
        }
        finally{
            // setIsSubmitting(false)
        }
    }
    return (
        <div className="lg:mx-20 mx-4 my-20 lg:p-20 p-4 border boder-zinc-400">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-zinc-600 font-mono">verification Code</FormLabel>
                  <FormControl>
                    <Input className="p-4" {...field} />
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
