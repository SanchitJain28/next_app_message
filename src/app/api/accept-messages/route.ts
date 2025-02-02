import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";

export async function POST(request: Request) {
    //connecting the Database
    await dbConnect()
    //getting the saved session from the ui.I think
    const session = await getServerSession(authOptions)
    //gets the user from the session
    const user = session?.user
    //if session is not found or user is not found from the session give Response:FALSE
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "User not found,Please log in"
        }, { status: 401 })
    }
    //gets the user Id from the user
    const userId = user?._id
    //gets the acceptingMessage from the body of the request
    const { acceptingMessage } = await request.json()
    try {
        //find user by id and updates the isAcceptingMessage status
        const findUserByID = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptingMessage },
            { new: true }
        )
        //OR 
        // const findUserById=await UserModel.findOne({_id:userId});
        // findUserById.isAcceptingMessage=acceptingMessage;
        // await findUserById.save()
        //if user is not found in the database give Response:False
        if (!findUserByID) {
            return Response.json({
                success: false,
                message: "Error updating status"
            }, { status: 401 })
        }
        //else give Response:true
        return Response.json({
            success: true,
            message: "Status updated",
            findUserByID
        }, { status: 201 })
    } catch (error) {
        console.log("Error updating status of accepting message because ", error)
        Response.json({
            success: true,
            message: "Error updating status of accepting messages"
        }, { status: 500 })
    }
}

export async function GET(request: Request) {
    await dbConnect()
    try {
        //will get the current session
        const session = await getServerSession(authOptions)

        //will get the user from the session
        const user = session?.user
        //if not found return error,AUTH ERROR LOG IN
        if (!session || !session.user) {
            return Response.json({
                success: false,
                message: "User not found,Please log in"
            }, { status: 401 })
        }
        //get the user id from the fetched user
        const userId = user?._id

        //find in database
        const foundUser = await UserModel.findOne({ _id: userId })
        if (!foundUser) {
            return Response.json({
                success: false,
                message: "Error getting Accept message status"
            }, { status: 401 })
        }
        ///return the is Accepting status
        return Response.json({
            success: true,
            message: "Status fetched",
            isAcceptingMessage: foundUser.isAcceptingMessage
        }, { status: 201 })
    } catch (error) {
        console.log("Error getting accept message status ", error)
        Response.json({
            success: true,
            message: "Error getting accept message status"
        }, { status: 500 })
    }
}