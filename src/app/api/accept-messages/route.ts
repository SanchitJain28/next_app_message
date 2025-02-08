import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import * as jose from 'jose'

export async function POST(request: Request) {
    //connecting the Database
    await dbConnect()
    //getting the saved session from the ui.I think
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

    //gets the acceptingMessage from the body of the request
    const { acceptingMessage } = await request.json()
    console.log(acceptingMessage)
    try {
        const { payload } = await jose.jwtVerify(authHeader, secret)
        if(!payload){
            throw new Error("error")
        }
        //gets the user Id from the user
        const userId = payload.user_id
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
            isAcceptingMessage:acceptingMessage,
            findUserByID
        }, { status: 201 })
    } catch (error) {
        console.log("Error updating status of accepting message because ", error)
        if (error instanceof jose.errors.JWTExpired) { // Check for JWT expiration specifically
            return Response.json({
                success: false,
                message: "Token expired"
            }, { status: 401 });
        }
        Response.json({
            success: false,
            message: "Error updating status of accepting messages"
        }, { status: 500 })
    }
}

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
    try {
        //will get the current session
        const { payload } = await jose.jwtVerify(authHeader, secret)
        if(!payload){
            throw new Error("error")
        }
        //get the user id from the fetched user
        const userId = payload.user_id

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
        if (error instanceof jose.errors.JWTExpired) { // Check for JWT expiration specifically
            return Response.json({
                success: false,
                message: "Token expired",
                name:"tokenExpired"
            }, { status: 401 });
        }
        Response.json({
            success: true,
            message: "Error getting accept message status"
        }, { status: 500 })
    }
}