import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { NextAuthOptions } from "next-auth"

//make a object authOptions as type NextauthOptions,you can see in the nextJs Docuumentation
export const authOptions: NextAuthOptions = {
    providers: [
        //You will get the provider in NExtjs documentation
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                user_identifier: { label: "Username", type: "text", placeholder: "enter your username" },
                password: { label: "Password", type: "password" }
            },
            //we have to call in authorize function to make the login happpen
            async authorize(credentials: any, req): Promise<any> {
                console.log("Authorize function called with:", credentials);
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.user_identifier },
                            { username: credentials.user_identifier }
                        ]
                    })
                    if (!user) {
                        throw new Error("User not found,Please register on this app")
                    }
                    if (!user.isVerified) {
                        throw new Error("You are not verfied ,first verify yourself")
                    }
                    const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)
                    if (!isCorrectPassword) {
                        throw new Error("Invalid login credentials")
                    }
                    return user
                } catch (error: any) {
                    throw new Error(error)
                }
            }
        })
    ],
    //This was new to us,they are callback function built in nextJs

    callbacks: {
        //as we send information in token mwe have to do same in session
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerfied
                session.user.isAcceptingMessages = token.isAcceptingMessages
                session.user.username = token.username
            }
            return session
        },
        async jwt({ token, user }) {
            //as we do in jwt token,we have to pass the user data in the token
            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerfied
                token.isAcceptingMessages = user.isAcceptingMessages
                token.username = user.username
            }
            return token
        }
    },
    //pages section in nextjs ,automatically redirect to the page
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: 'jwt'
    },
    secret:process.env.NEXTAUTH_SECRET
}
