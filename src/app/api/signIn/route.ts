import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import * as jose from 'jose'

export async function POST(request: Request) {
    const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
      )
      const alg = 'HS256'
    const { user_identifier, password } = await request.json()
    await dbConnect()
    console.log(user_identifier,password)
    try {
        const user = await UserModel.findOne({
            $or: [
                { email: user_identifier },
                { username: user_identifier }
            ]
        })
        if (!user) {
            return Response.json({
                success: "false",
                message: "User not found,Please register on this app"
            }, { status: 404 })
        }
        if (!user.isVerified) {
            return Response.json({
                success: "false",
                message: "You are not verfied ,first verify yourself"
            }, { status: 404 })
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) {
            return Response.json({
                success: "false",
                message: "Invalid login credentials"
            }, { status: 404 })
        }
        // let Usertoken = jwt.sign({
        //     user_id: user._id,
        //     username: user.username
        // }, 'SECRET');
        let userToken=await new jose.SignJWT({
                 user_id: user._id,
                 username: user.username
             }).setProtectedHeader({alg}).setExpirationTime("24hr").sign(secret)
        return Response.json({
            success: "true",
            message: "Login Successful",
            token: userToken
        }, { status: 201 })
    } catch (error: any) {
        console.log("Unexpected error occured", error)
        return Response.json({
            success: "false",
            message: "Unexpected Error occured"
        }, { status: 404 })
    }
}