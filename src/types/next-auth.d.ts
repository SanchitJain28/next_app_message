import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface User {
        _id?: string
        isAcceptingMessages?: boolean
        isVerfied?: boolean
        username?: string
    }
    //YOU CAN SEE THIS NEXTAUTH DOCUMENTATION
    interface Session {
        user: {
            _id?: string
            isAcceptingMessages?: boolean
            isVerified?: boolean
            username?: string
        } & DefaultSession["user"]
    }
}

//ALTERNATIVE,//THIS IS NEW TO ME,//JUST SEE DOCUMENTATION
declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string
        isAcceptingMessages?: boolean
        isVerfied?: boolean
        username?: string
    }
}