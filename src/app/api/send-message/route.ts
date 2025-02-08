import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

export  async function POST(request:Request){
     await dbConnect()
        try {
            const {inputMessage,username}=await request.json()
            const foundUser=await UserModel.findOne({username})
            if(!foundUser){
                return Response.json({
                    success: false,
                    message: "User does not exist on this app or invalid username"
                }, { status: 404 })
            }
            //is user accepting messages
            if(foundUser.isAcceptingMessage){
                const newMessage={
                    content:inputMessage,
                    createdAt:new Date()
                }
                foundUser.messages.push(newMessage as Message)
                await foundUser.save()
                return Response.json({
                    success:true,
                    message: "Message succesfully sent"
                }, { status: 201 })
            }
            return Response.json({
                success:false,
                message: "Message cannot be sent as user is not accepting messages!!!"
            }, { status: 404 })
            
        } catch (error) {
            console.log("Unexpected error occured",error)
            return Response.json({
                success: false,
                message: "Sorry unexpected error happenened"
            }, { status: 401 })
        }
}
