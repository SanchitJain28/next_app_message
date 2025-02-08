"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { messageSchemma } from '@/Schemmas/messageSchemma'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios, { AxiosError } from 'axios'
import { useToast } from '@/hooks/use-toast'
import { headers } from 'next/headers'
import CarouselApp from '@/components/appComponents/CarouselApp'


export default function SendMessage() {
  const {toast}=useToast()
    const {username}=useParams()
    const form = useForm<z.infer<typeof messageSchemma>>({
        resolver: zodResolver(messageSchemma),
        defaultValues: {
          content:"default message"
        }
      })
    const handleSubmit=async(data :z.infer<typeof messageSchemma>)=>{
      try {
        const response=await axios.post("/api/send-message",{
          username:username,
          inputMessage:data.content
        })
        console.log(response.data)
        toast({
          title:"Message sent",
          description:`Message sent to ${username}`,
          className:"bg-green-700 text-black"
        })
      } catch (error) {
        const axiosError=error as AxiosError
        console.log(axiosError)
        toast({
          title:"Cant send the message",
          description:(axiosError.response?.data as { message: string }).message,
          variant:"destructive"
        })
      }
    }
  return (
    <div className='lg:p-20 overflow-hidden'>
      <p className='text-white text-lg font-sans px-8 py-4'>Hello Welcome to the anonymous mystery message ,send an mystery message to one of our known fellas and be anoynomous</p>
      <Form {...form} >
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 py-4 px-8">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-zinc-600 font-sans">Message</FormLabel>
                  <FormControl>
                    <Input className="w-full p-4 bg-black border border-zinc-700 text-white" placeholder="message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" onClick={(e) => {
            }} className='bg-white text-black p-4'>Submit</Button>
          </form>
        </Form>
        <div className="">
          <p className='text-white text-lg tezt-zinc-400 px-8 py-4'>Here are some default templates</p>
          <CarouselApp/>
        </div>
    </div>
    
  )
}
