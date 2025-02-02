import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    dbConnect()
    try {
        const { verifyCodeInput, username } = await request.json()
        const existingUserByusername = await UserModel.findOne({
            username
        })
        if (!existingUserByusername) {
            return Response.json({
                success: false,
                message: "User cannot be found,please register on this app"
            }, { status: 400 })
        }
        const isValidcode = existingUserByusername.verifyCode === verifyCodeInput
        const isCodeNotExpired = new Date(existingUserByusername.verifyCodeExpiry) > new Date()
        if (isValidcode && isCodeNotExpired) {
            //you can update the user like this
            existingUserByusername.isVerified = true
            await existingUserByusername.save()
            return Response.json({
                success: true,
                message: "You have been verified! Succesful registred on the app"
            }, { status: 200 })
        }
        else if (!isValidcode) {
            return Response.json({
                success: false,
                message: `InValidCode code = ${verifyCodeInput}`
            }, { status: 500 })
        }
        else {
            return Response.json({
                success: false,
                message: "your code has been expired"
            }, { status: 500 })
        }

    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            message: "Unexpected error occured"
        }, { status: 500 })
    }
}