import z from "zod";

export const updateBodySchema = 
z.object(
    {
        questionnaireId: z.string(),
        questTitle: z.string(),
        slidesData: z.array
        (z.object
            (
                {
                    id: z.string().optional(),
                    ask: z.string(),
                    answer: z.string(),
                    position: z.number()
                }
            )
        )
    }
)
    
