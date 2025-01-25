import { z } from "zod";

//SAME SHIT AS EXPRESS VALIDATOR
export const userNameValidation=z
    .string()
    .min(3,"Username must be atleast 3 chracters")
    .max(30,"Username must be atmax 30 chracters")
    .regex(/^[a-zA-Z0-9_]+$/,"username must not contain special chracters")

export const signUpSchemma=z.object({
    username:userNameValidation,
    email:z.string().email({message:"invalid email address"}),
    password:z.string().min(6,{
        message:"password length must be atleast than 6 chracters"
    })
})