import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET(request:Request){
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "User not found,Please log in"
        }, { status: 401 })
    }
    //converts string to mongodb ObjectId
    const userId = new mongoose.Types.ObjectId(user?._id) 
    try {
        const user=await UserModel.aggregate([
            {$match:{id:userId}},
            {$unwind:'$messages'},
            {$sort:{'messages.createdAt':-1}},
            {$group:{_id:'$_id',messages:{$push:'$messages'}}}
        ])
        if(!user || user.length===0){
            return  Response.json({
                success: false,
                message: "User not found,Please log in"
            }, { status: 401 })
        }
        return  Response.json({
            success: true,
            message: user[0].messages
        }, { status: 401 })
    } catch (error) {
        console.log("ERROR",error)
        return Response.json({
            success: false,
            message: "User not found,Please log in"
        }, { status: 401 })
    }
}