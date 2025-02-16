import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs'

//in Nextjs rest api works like folders,for ex:- this given file is http://localhost:3000/api/signUp,it is decided by folder name
//THis is how you write a request by putting function name as POST,GET,UPDATE,DELETE
export async function POST(request: Request) {
    //First connect the database,in next js we have to connect database everytime we make a request because it works on edge 
    await dbConnect()
    try {
        //takes paramters from the request
        const { username, email, password } = await request.json()
        //find the user by username
        const existingUserwithUsername = await UserModel.findOne({
            username: username
        })
        //if username exists it will function will take EXIT

        //oh i now got it and gets the value of the status code,status code helps getting errors ,status code is very important
        if (existingUserwithUsername) {
            return Response.json({
                success: false,
                message: "User with this username already exists"
            }, { status: 400 })
        }
        //if not it will RUN
        const existingUserwithemail = await UserModel.findOne({
            email: email
        })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        //if user with email and is verified is found ,it will check the verify status of the user, RUN
        if (existingUserwithemail) {
            //if email is verfied the function will take EXIT
            if (existingUserwithemail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists"
                }, { status: 400 })
            }
            //if email is not verfied,it will update the user with new credentials RUN
            const hashedNewPassword = await bcrypt.hash(password, 10)
            existingUserwithemail.password = hashedNewPassword
            existingUserwithemail.verifyCode = verifyCode
            existingUserwithemail.verifyCodeExpiry = new Date(Date.now() + 3600000)
            await existingUserwithemail.save()
        }
        //if user is not found,IT WILL CREATE A NEW USER
        else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            const userData = new UserModel({
                username: username,
                email: email,
                password: hashedPassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isAcceptingMessage: true,
                isVerified: true,
                messages: []
            })
            await userData.save()
        }
        //after saving the user,it will send verification email
        //send verification email
        // We are currently disabling the email part of this app because we have to verify the domain and it is fucking paid process thus we are disabling,SOrry email better luck next time

        // const SendEmail = await sendVerificationEmail(
        //     email,
        //     username,
        //     verifyCode
        // )
        //if email was not send succesfully,program will exit after giving a message
        // We are currently disabling the email part of this app because we have to verify the domain and it is fucking paid process thus we are disabling,SOrry email better luck next time
        // if (!SendEmail.success) {
        //     return Response.json({
        //         success: false,
        //         message: "Verification email failed"
        //     }, { status: 500 })
        // }
        //FINALLY email verification is sent .PROGRAM WILL FINALLY TAKE EXIT
        return Response.json({
            success: true,
            message: "Registered Succesfully"
        }, { status: 201 })
    } catch (error) {
        console.error("Error signing up the user", error)
        return Response.json({
            success: false,
            message: "error signing up the user",
            error: error
        },
            {
                status: 500
            }
        )
    }
}