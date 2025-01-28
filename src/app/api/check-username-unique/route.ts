import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { userNameValidation } from "@/Schemmas/signUpSchemma";
import { z } from "zod";

const usernameQuerySchema = z.object({
    username: userNameValidation
})

//THIS NAME SHOULD BE IN CAPITAL like GET not get
export async function GET(request: Request) {
    await dbConnect()
    try {
        //NEW THINGS FOR ME IN NEXTJS
        const url = new URL(request.url)
        const { searchParams } = url
        const queryParams = {
            username: searchParams.get("username")
        }
        //Validate with ZOD
        //THis is also a new thing for me
        //this statement is required for using ZOD validation
        const result=usernameQuerySchema.safeParse(queryParams)
        console.log(result)
        if(!result.success){
            const usernameErrors=result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message:usernameErrors?.length >0 ?usernameErrors.join(", "):"Invalid query parmater"
            },{status:400})
        }
        const {username}=result.data
        const existingUser=await UserModel.findOne({
            username:username,isVerified:true
        })
        if(existingUser){
            return Response.json({
                success:false,
                message:"user already there and exists"
            },{status:400})
        }
        return Response.json({
            success:true,
            message:"user name available"
        },{status:200})
    } catch (error) {
        console.log("Error checking username ", error)
        return Response.json({
            success: false,
            message: "Error checking the username"
        },{status:500})
    }
}
