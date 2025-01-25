import { z } from "zod";

export const acceptMessageSchemma=z.object({
    acceptMessages:z.boolean()
})