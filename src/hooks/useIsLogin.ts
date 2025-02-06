
import * as jose from 'jose'

export async function useIsValidLogin(token: string) {
    const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    if (!token) {
        return false
    }
    try {
        const { payload } = await jose.jwtVerify(token, secret)
        return {
            success:true,
            data:JSON.parse(localStorage.getItem("loginDetails")|| "")
        }
    } catch (error) {
        if (error instanceof jose.errors.JWTExpired) { // Check for JWT expiration specifically
            console.log(error)
            localStorage.removeItem("loginDetails")
            return {
                success:false,
                data:[]
            }
        }
        console.log(error)
    }

}