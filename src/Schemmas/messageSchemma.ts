import { z } from "zod";

export const messageSchemma=z.object({
    content:z.string()
    .min(10,{
        message:"message should atleast be 10 chracters"
    })
    .max(400,{
        message:"message should not be greater than 400 chracters"
    })
})