import React, { useContext } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { authContext } from '@/context/Authentication'
import axios, { AxiosError } from 'axios'
import ApiResponse from '@/types/apiResponse'
import { useToast } from '@/hooks/use-toast'
interface MessageCardProps {
    data: {
        content: string,
        createdAt: Date,
        _id: string
    }
}
//what this shit do it it takes a object as an argiment and extract content,createdAt and _id from the object
export default function MessageCard({data:{ content, createdAt, _id }}: MessageCardProps) {
    const { toast } = useToast()
    const authContextValue = useContext(authContext)
    if (!authContextValue) {
        return null
    }
    const { loginDetails, setMessages, messages } = authContextValue
    const deleteMessage = async (messageId: string) => {
        try {
            const response = await axios.delete("/api/delete-message", {
                data: {
                    username: loginDetails?.username,
                    id: messageId
                }
            })
            toast({
                title: "delete",
                description: "MEssage deleted",
                variant: "destructive"
            })
            console.log(response)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            console.log(axiosError)
            toast({
                title: "error",
                description: "error deleting the message"
            })
        }
    }
    return (
        <Card className='bg-black text-white  border border-zinc-700 flex flex-col justify-between '>
            <CardContent className='p-4 lg:pb-8'>
                <p className='text-zinc-400'>{content}</p>
            </CardContent>
            <CardFooter className='p-4 lg:p-4'>
                <p className='text-zinc-700 text-sm'>{new Date(createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
            </CardFooter>
            <div className=" px-4 py-4">
                <AlertDialog >
                    <AlertDialogTrigger><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f00000" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></AlertDialogTrigger>
                    <AlertDialogContent className='bg-white'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This message will be deleted and will not comeback
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                                deleteMessage(_id as string)
                                const filteredMessages = messages?.filter((e) => {
                                    return e._id !== _id
                                })
                                if (setMessages && filteredMessages) {
                                    setMessages(filteredMessages)
                                }
                            }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </Card>
    )
}
