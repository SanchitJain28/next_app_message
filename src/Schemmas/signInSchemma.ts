import { z } from "zod";

export const signInSchemma=z.object({
    identifier:z.string().email({message:"invalid email address"}),
    password:z.string().min(6,{
        message:"password length must be atleast than 6 chracters"
    })
})