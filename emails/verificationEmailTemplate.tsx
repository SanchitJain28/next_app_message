import * as React from 'react';
import { Html, Button } from "@react-email/components";

interface verificationEmailProps {
    username: string,
    otp: string
}
export default function VerificationEmail( {username, otp}:verificationEmailProps) {
    return (
        <Html lang="en">
            <h1>Here is your opt {otp} </h1>
        </Html>
    );
}

