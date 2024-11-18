import z from "zod";

export const userSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long").optional().nullable(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

