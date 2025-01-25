import { z } from "zod";

export const signUpSchemma=z.object({
    email:z.string().email({message:"invalid email address"}),
    password:z.string().min(6,{
        message:"password length must be atleast than 6 chracters"
    })
})