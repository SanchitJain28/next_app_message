import { z } from "zod";

export const verifySchemma=z.object({
    code:z.string().length(6,{
        message:"Invalid verification code,should be of 6 characters"
    })
})