import z from "zod";

export const questionaireSchema = 
    z.array(
        z.object(
            {
                ask: z.string(),
                answer: z.string()
            }
        )
    )
