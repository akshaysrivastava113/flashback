import z from "zod";

export const deleteBodySchema = 
z.object({
    questionnaireId: z.string()
})