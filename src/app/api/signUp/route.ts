import sendVerificationEmail from "@/helpers/verificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import ApiResponse from "@/types/apiResponse";
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    await dbConnect()
    try {
        //takes paramters from the request
        const { username, email, password } = await request.json()
        //find the user by username
        const existingUserwithUsername = await UserModel.findOne({
            username: username
        })
        //if username exists it will function will take EXIT
        if (existingUserwithUsername) {
            return Response.json({
                success: false,
                message: "User with this username already exists"
            })
        }
        //if not it will RUN
        const existingUserwithemail = await UserModel.findOne({
            email: email
        })
        const verifyCode=Math.floor(100000 +Math.random()*900000).toString()
        //if user with email and is verified is found ,it will check the verify status of the user, RUN
        if (existingUserwithemail) {
            //if email is verfied the function will take EXIT
            if(existingUserwithemail.isVerified){
                return Response.json({
                    success: false,
                    message: "User already exists"
                },{status:400})
            }
            //if email is not verfied,it will update the user with new credentials RUN
           const hashedNewPassword=await bcrypt.hash(password,10)
            existingUserwithemail.password=hashedNewPassword
            existingUserwithemail.verifyCode=verifyCode
            existingUserwithemail.verifyCodeExpiry=new Date(Date.now() +3600000)
            await existingUserwithemail.save()
        }
        //if user is not found,IT WILL CREATE A NEW USER
        else {
            const hashedPassword=bcrypt.hash(password,10)
            const expiryDate =new Date()
            expiryDate.setHours(expiryDate.getHours()+1)
            const userData = new UserModel({
                username: username,
                email: email,
                password: hashedPassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isAcceptingMessage: true,
                isVerified:false,
                messages: []
            })
            await userData.save()
        }
        //after saving the user,it will send verification email
        //send verification email
        const SendEmail=await sendVerificationEmail(
            username,
            email,
            verifyCode
        )
        //if email was not send succesfully,program will exit after giving a message
        if(!SendEmail.success){
            return Response.json({
                success:false,
                message:"Verification email failed"
            },{status:500})
        }
        //FINALLY email verification is sent .PROGRAM WILL FINALLY TAKE EXIT
        return Response.json({
            success:true,
            message:"Registered Succesfully.Please verify your email"
        },{status:201})
    } catch (error) {
        console.error("Error signing up the user", error)
        return Response.json({
            success: false,
            message: "error signing up the user"
        },
            {
                status: 500
            }
        )
    }
}