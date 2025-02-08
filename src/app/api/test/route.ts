import { NextRequest, NextResponse } from "next/server";

import * as jose from 'jose'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
  )
  if (!authHeader) {
    return Response.json({
      success:false,
      message:"Please provide a token"
    },{status:401})// No token
  }
  try {
    const decoded =await jose.jwtVerify(authHeader, secret)
        // console.log(decoded.payload)
        // Add the decoded user information to the request object so your routes can access it
    
        return Response.json({
          success:false,
          message:decoded.payload
        },{status:200}); // Token is valid, continue to the route
  } catch (error) {
    console.log(error)
    return Response.json({
      success:false,
      message:error
    },{status:401})
  }
  // Get user data from headers
  return Response.json({
    user_details:"hello"
  })

}
