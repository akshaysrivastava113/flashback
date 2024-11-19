import z from "zod";

export const questionaireSchema = 
z.object(
    {
        questTitle: z.string(),
        slidesData: z.array
        (z.object
            (
                {
                    id: z.number().optional(),
                    ask: z.string(),
                    answer: z.string()
                }
            )
        )
    }
)
    
