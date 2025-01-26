import VerificationEmail from "../../emails/verificationEmailTemplate";
import { resend } from "../lib/resendEmail";
import ApiResponse from "../types/apiResponse";


export default async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string):Promise<ApiResponse>{
        try {
           const response= await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Verification code',
                react: VerificationEmail({username,otp:verifyCode}),
              });
              console.log(response)
            return {
                success:true,
                message:"Verification email sent succesfully"
            } 
        } catch (error) {
            console.log("Error sending verification email")
            return {
                success:false,
                message:"failed to send verification email"
            }
        }
    
}