import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default function MessageCard({data}:any) {
    return (
        <Card className='bg-black text-white  border border-zinc-700 flex flex-col justify-between '>
            <CardContent className='p-4 lg:pb-8'>
                <p className='text-zinc-400'>{data.content}</p>
            </CardContent>
            <CardFooter className='p-4 lg:p-4'>
                <p className='text-zinc-700 text-sm'>{new Date(data.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
            </CardFooter>
        </Card>
    )
}
