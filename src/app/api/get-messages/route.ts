import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import * as jose from 'jose'

export async function GET(request: Request) {
    await dbConnect()
    const authHeader = request.headers.get('Authorization');
    const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    if (!authHeader) {
        return Response.json({
            success: false,
            message: "Please provide a token"
        }, { status: 401 })// No token
    }

    //converts string to mongodb ObjectId
    try {
        const { payload } = await jose.jwtVerify(authHeader, secret)
        if (!payload) {
            throw new Error("error")
        }
        const userIdUnfiltered = payload.user_id
        const userId = new mongoose.Types.ObjectId(userIdUnfiltered as string)
        console.log(userId)
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ])
        console.log(user)
        if (!user || user.length === 0) {
            return Response.json({
                success: false,
                message: "User not found,Please log in"
            }, { status: 401 })
        }
        return Response.json({
            success: true,
            message: user[0].messages
        }, { status: 200 })
    } catch (error) {
        console.log("ERROR", error)
        return Response.json({
            success: false,
            message: "User not found,Please log in"
        }, { status: 401 })
    }
}