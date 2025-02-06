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
        <Card className='bg-black text-white shadow-lg shadow-cyan-600/50 border border-zinc-600'>
            <CardHeader>
            </CardHeader>
            <CardContent>
                <p>{data.content}</p>
            </CardContent>
            <CardFooter>
                <p>{data.createdAt}</p>
            </CardFooter>
        </Card>
    )
}
